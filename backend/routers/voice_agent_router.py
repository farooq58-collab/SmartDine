"""
SmartDine AI - Voice Agent Router (AI Chat)
POST /api/agent/chat – conversational AI agent for menu Q&A, ordering, recommendations
"""

import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User, Restaurant, MenuItem, Order, OrderItem
from schemas import ChatRequest, ChatResponse, MenuItemResponse, OrderResponse, OrderItemResponse
from auth import get_current_user
from agents.menu_agent import get_menu_agent_response

router = APIRouter()

# In-memory session store for conversation continuity
_sessions: dict[str, list[dict]] = {}


@router.post("/chat", response_model=ChatResponse)
async def chat_with_agent(
    body: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Chat with the AI menu agent. Supports menu Q&A, recommendations, and ordering."""

    # Get or create session
    session_id = body.session_id or uuid.uuid4().hex
    if session_id not in _sessions:
        _sessions[session_id] = []

    # Fetch restaurant and menu
    restaurant = db.query(Restaurant).filter(Restaurant.owner_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="No restaurant found")

    menu_items = (
        db.query(MenuItem)
        .filter(MenuItem.restaurant_id == restaurant.id, MenuItem.is_available == True)
        .all()
    )

    # Build menu context for the agent
    menu_context = _build_menu_context(restaurant, menu_items)
    chat_history = _sessions[session_id]

    # Call the LangChain menu agent
    try:
        agent_result = await get_menu_agent_response(
            user_message=body.message,
            menu_context=menu_context,
            chat_history=chat_history,
            restaurant_name=restaurant.name,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI agent error: {exc}",
        )

    # Store conversation history
    chat_history.append({"role": "user", "content": body.message})
    chat_history.append({"role": "assistant", "content": agent_result["reply"]})
    # Trim history to last 20 messages
    _sessions[session_id] = chat_history[-20:]

    # Find mentioned menu items
    mentioned_items = _find_mentioned_items(agent_result["reply"], menu_items)

    # Handle order placement if the agent detected an order intent
    order_response = None
    if agent_result.get("order_items"):
        order_response = _place_order(
            db=db,
            restaurant_id=restaurant.id,
            order_items_data=agent_result["order_items"],
            menu_items=menu_items,
        )

    return ChatResponse(
        reply=agent_result["reply"],
        session_id=session_id,
        items_mentioned=[MenuItemResponse.model_validate(i) for i in mentioned_items],
        order_placed=order_response,
    )


def _build_menu_context(restaurant: Restaurant, items: list[MenuItem]) -> str:
    """Build a textual menu description for the AI agent."""
    lines = [f"Restaurant: {restaurant.name}"]
    if restaurant.cuisine_type:
        lines.append(f"Cuisine: {restaurant.cuisine_type}")
    lines.append("")
    lines.append("=== MENU ===")

    categories: dict[str, list[MenuItem]] = {}
    for item in items:
        categories.setdefault(item.category, []).append(item)

    for category, cat_items in sorted(categories.items()):
        lines.append(f"\n--- {category} ---")
        for item in cat_items:
            dietary = []
            if item.is_vegetarian:
                dietary.append("Vegetarian")
            if item.is_vegan:
                dietary.append("Vegan")
            if item.is_gluten_free:
                dietary.append("Gluten-Free")
            dietary_str = f" [{', '.join(dietary)}]" if dietary else ""

            allergen_str = f" | Allergens: {item.allergens}" if item.allergens else ""
            wine_str = f" | Wine pairing: {item.wine_pairing}" if item.wine_pairing else ""
            tags_str = f" | Tags: {item.tags}" if item.tags else ""
            spice_str = f" | Spice: {item.spice_level}/5" if item.spice_level > 0 else ""

            lines.append(
                f"  • {item.name} (ID:{item.id}) – ${item.price:.2f}{dietary_str}"
                f"{spice_str}{allergen_str}{wine_str}{tags_str}"
            )
            if item.description:
                lines.append(f"    {item.description}")

    return "\n".join(lines)


def _find_mentioned_items(reply: str, items: list[MenuItem]) -> list[MenuItem]:
    """Find menu items whose names appear in the agent reply."""
    reply_lower = reply.lower()
    return [item for item in items if item.name.lower() in reply_lower]


def _place_order(
    db: Session,
    restaurant_id: int,
    order_items_data: list[dict],
    menu_items: list[MenuItem],
) -> OrderResponse | None:
    """Create an order in the database from agent-detected order items."""
    menu_map = {item.id: item for item in menu_items}
    valid_items = []

    for oi in order_items_data:
        item_id = oi.get("menu_item_id")
        qty = oi.get("quantity", 1)
        if item_id in menu_map:
            valid_items.append((menu_map[item_id], qty, oi.get("special_instructions", "")))

    if not valid_items:
        return None

    order = Order(
        restaurant_id=restaurant_id,
        customer_name="AI Agent Order",
        status="pending",
    )
    db.add(order)
    db.flush()

    total = 0.0
    for menu_item, qty, instructions in valid_items:
        oi = OrderItem(
            order_id=order.id,
            menu_item_id=menu_item.id,
            quantity=qty,
            unit_price=menu_item.price,
            special_instructions=instructions,
        )
        db.add(oi)
        total += menu_item.price * qty

    order.total_amount = total
    db.commit()
    db.refresh(order)

    return OrderResponse(
        id=order.id,
        restaurant_id=order.restaurant_id,
        customer_name=order.customer_name,
        table_number=order.table_number,
        status=order.status,
        total_amount=order.total_amount,
        notes=order.notes,
        items=[
            OrderItemResponse.model_validate(oi)
            for oi in order.items
        ],
        created_at=order.created_at,
        updated_at=order.updated_at,
    )
