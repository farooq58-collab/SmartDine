"""
SmartDine AI - Menu Router
GET    /api/menu                – list all menu items for user's restaurant
POST   /api/menu                – create a new menu item
GET    /api/menu/{item_id}      – get a single menu item
PUT    /api/menu/{item_id}      – update a menu item
DELETE /api/menu/{item_id}      – delete a menu item
POST   /api/menu/{item_id}/image – upload image for a menu item
"""

import shutil
import uuid
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from sqlalchemy.orm import Session

from database import get_db
from models import User, Restaurant, MenuItem
from schemas import MenuItemCreateRequest, MenuItemUpdateRequest, MenuItemResponse
from auth import get_current_user

router = APIRouter()

UPLOAD_DIR = Path(__file__).parent.parent / "uploads"


def _get_restaurant(user: User, db: Session) -> Restaurant:
    restaurant = db.query(Restaurant).filter(Restaurant.owner_id == user.id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="No restaurant found for this user")
    return restaurant


def _get_menu_item(item_id: int, restaurant_id: int, db: Session) -> MenuItem:
    item = (
        db.query(MenuItem)
        .filter(MenuItem.id == item_id, MenuItem.restaurant_id == restaurant_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item


@router.get("", response_model=list[MenuItemResponse])
def list_menu_items(
    category: Optional[str] = Query(None, description="Filter by category"),
    vegetarian: Optional[bool] = Query(None),
    vegan: Optional[bool] = Query(None),
    gluten_free: Optional[bool] = Query(None),
    available: Optional[bool] = Query(None),
    search: Optional[str] = Query(None, description="Search name/description"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List menu items with optional filters."""
    restaurant = _get_restaurant(current_user, db)
    query = db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant.id)

    if category:
        query = query.filter(MenuItem.category == category)
    if vegetarian is not None:
        query = query.filter(MenuItem.is_vegetarian == vegetarian)
    if vegan is not None:
        query = query.filter(MenuItem.is_vegan == vegan)
    if gluten_free is not None:
        query = query.filter(MenuItem.is_gluten_free == gluten_free)
    if available is not None:
        query = query.filter(MenuItem.is_available == available)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            MenuItem.name.ilike(search_term) | MenuItem.description.ilike(search_term)
        )

    items = query.order_by(MenuItem.category, MenuItem.name).all()
    return [MenuItemResponse.model_validate(i) for i in items]


@router.post("", response_model=MenuItemResponse, status_code=status.HTTP_201_CREATED)
def create_menu_item(
    body: MenuItemCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new menu item for the user's restaurant."""
    restaurant = _get_restaurant(current_user, db)

    item = MenuItem(
        restaurant_id=restaurant.id,
        **body.model_dump(),
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return MenuItemResponse.model_validate(item)


@router.get("/{item_id}", response_model=MenuItemResponse)
def get_menu_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get a single menu item by ID."""
    restaurant = _get_restaurant(current_user, db)
    item = _get_menu_item(item_id, restaurant.id, db)
    return MenuItemResponse.model_validate(item)


@router.put("/{item_id}", response_model=MenuItemResponse)
def update_menu_item(
    item_id: int,
    body: MenuItemUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update a menu item (partial update)."""
    restaurant = _get_restaurant(current_user, db)
    item = _get_menu_item(item_id, restaurant.id, db)

    update_data = body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return MenuItemResponse.model_validate(item)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_menu_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a menu item."""
    restaurant = _get_restaurant(current_user, db)
    item = _get_menu_item(item_id, restaurant.id, db)
    db.delete(item)
    db.commit()


@router.post("/{item_id}/image", response_model=MenuItemResponse)
async def upload_menu_item_image(
    item_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload an image for a menu item."""
    restaurant = _get_restaurant(current_user, db)
    item = _get_menu_item(item_id, restaurant.id, db)

    # Validate file type
    allowed_types = {"image/jpeg", "image/png", "image/webp", "image/gif"}
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type '{file.content_type}' not allowed. Use JPEG, PNG, WebP, or GIF.",
        )

    # Validate file size (max 5 MB)
    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 5 MB limit",
        )

    # Save file
    ext = Path(file.filename or "image.jpg").suffix or ".jpg"
    filename = f"menu_{item.id}_{uuid.uuid4().hex[:8]}{ext}"
    file_path = UPLOAD_DIR / filename
    UPLOAD_DIR.mkdir(exist_ok=True)

    with open(file_path, "wb") as f:
        f.write(contents)

    # Update the menu item's image_url
    item.image_url = f"/uploads/{filename}"
    db.commit()
    db.refresh(item)
    return MenuItemResponse.model_validate(item)


# ─── Order Management ──────────────────────────────────────────────────────

@router.get("/orders", response_model=list)
def list_orders(
    status_filter: Optional[str] = Query(None, alias="status"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List all orders for the user's restaurant."""
    from models import Order
    restaurant = _get_restaurant(current_user, db)
    query = db.query(Order).filter(Order.restaurant_id == restaurant.id)
    if status_filter:
        query = query.filter(Order.status == status_filter)
    orders = query.order_by(Order.created_at.desc()).all()
    result = []
    for order in orders:
        items_data = []
        for oi in order.items:
            menu_item = db.query(MenuItem).filter(MenuItem.id == oi.menu_item_id).first()
            items_data.append({
                "id": oi.id,
                "menu_item_id": oi.menu_item_id,
                "quantity": oi.quantity,
                "unit_price": oi.unit_price,
                "special_instructions": oi.special_instructions,
                "menu_item": {"name": menu_item.name} if menu_item else {"name": "Unknown"},
            })
        result.append({
            "id": order.id,
            "restaurant_id": order.restaurant_id,
            "customer_name": order.customer_name,
            "table_number": order.table_number,
            "status": order.status,
            "total_amount": order.total_amount,
            "notes": order.notes,
            "items": items_data,
            "created_at": order.created_at.isoformat() if order.created_at else None,
            "updated_at": order.updated_at.isoformat() if order.updated_at else None,
        })
    return result


@router.post("/orders", status_code=status.HTTP_201_CREATED)
def create_order(
    body: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new order."""
    from models import Order, OrderItem
    restaurant = _get_restaurant(current_user, db)
    order = Order(
        restaurant_id=restaurant.id,
        customer_name=body.get("customer_name", "Walk-in"),
        table_number=body.get("table_number"),
        notes=body.get("notes", ""),
        status="pending",
    )
    db.add(order)
    db.flush()

    total = 0.0
    for item_data in body.get("items", []):
        menu_item_id = item_data.get("menu_item_id")
        qty = item_data.get("quantity", 1)
        menu_item = db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
        if menu_item:
            oi = OrderItem(
                order_id=order.id,
                menu_item_id=menu_item.id,
                quantity=qty,
                unit_price=menu_item.price,
                special_instructions=item_data.get("special_instructions", ""),
            )
            db.add(oi)
            total += menu_item.price * qty

    order.total_amount = total
    db.commit()
    db.refresh(order)
    return {"id": order.id, "status": order.status, "total_amount": order.total_amount}


@router.put("/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    body: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update order status. Send {"status": "next"} to advance, or a specific status."""
    from models import Order
    restaurant = _get_restaurant(current_user, db)
    order = db.query(Order).filter(
        Order.id == order_id, Order.restaurant_id == restaurant.id
    ).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    new_status = body.get("status", "")
    if new_status == "next":
        flow = ["pending", "confirmed", "preparing", "ready", "delivered"]
        try:
            idx = flow.index(order.status)
            if idx < len(flow) - 1:
                order.status = flow[idx + 1]
        except ValueError:
            pass
    elif new_status in ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"]:
        order.status = new_status
    else:
        raise HTTPException(status_code=400, detail="Invalid status")

    db.commit()
    db.refresh(order)
    return {"id": order.id, "status": order.status}

