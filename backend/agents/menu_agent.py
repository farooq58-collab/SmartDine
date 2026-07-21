"""
SmartDine AI - Menu Agent (LangChain + Mistral)
Conversational AI agent for menu Q&A, recommendations, dietary filtering,
wine pairings, and order placement.
"""

import json
import os
import re
from typing import Any

from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

load_dotenv()

MISTRAL_API_KEY: str = os.getenv("MISTRAL_API_KEY", "")

SYSTEM_PROMPT = """You are SmartDine AI, a friendly and knowledgeable restaurant assistant for {restaurant_name}.
You help customers with:

1. **Menu Browsing**: Describe dishes, prices, ingredients, and preparation details.
2. **Recommendations**: Suggest popular dishes, chef's specials, or items matching customer preferences.
3. **Dietary & Allergen Filtering**: Identify vegetarian, vegan, gluten-free options, and flag allergens.
4. **Wine Pairings**: Recommend wines that pair well with selected dishes.
5. **Order Placement**: When a customer wants to order, confirm items and quantities clearly.

IMPORTANT RULES:
- Only recommend items from the menu provided below. Never invent dishes.
- Always mention prices when recommending items.
- If asked about allergens, be thorough and cautious.
- When a customer confirms they want to place an order, respond with a JSON block at the END of your message in this exact format:
  ```ORDER_JSON
  [{{"menu_item_id": <id>, "quantity": <qty>, "special_instructions": "<instructions>"}}]
  ```
- Be warm, helpful, and concise. Use emoji sparingly for friendliness.

{menu_context}
"""


def _build_langchain_messages(
    system_prompt: str,
    chat_history: list[dict],
    user_message: str,
) -> list:
    """Convert chat history and new message into LangChain message objects."""
    messages = [SystemMessage(content=system_prompt)]

    for msg in chat_history:
        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            messages.append(AIMessage(content=msg["content"]))

    messages.append(HumanMessage(content=user_message))
    return messages


def _extract_order_json(reply: str) -> list[dict] | None:
    """Extract ORDER_JSON block from the agent reply if present."""
    pattern = r"```ORDER_JSON\s*\n(.*?)\n\s*```"
    match = re.search(pattern, reply, re.DOTALL)
    if match:
        try:
            data = json.loads(match.group(1))
            if isinstance(data, list):
                return data
        except json.JSONDecodeError:
            pass
    return None


def _clean_reply(reply: str) -> str:
    """Remove the ORDER_JSON block from the reply shown to the user."""
    pattern = r"\s*```ORDER_JSON\s*\n.*?\n\s*```\s*"
    return re.sub(pattern, "", reply, flags=re.DOTALL).strip()


async def get_menu_agent_response(
    user_message: str,
    menu_context: str,
    chat_history: list[dict],
    restaurant_name: str,
) -> dict[str, Any]:
    """
    Send a message to the Mistral-powered menu agent and return the response.

    Returns:
        dict with keys:
            - reply (str): The agent's text response
            - order_items (list[dict] | None): Parsed order items if detected
    """
    llm = ChatMistralAI(
        model="mistral-small-latest",
        api_key=MISTRAL_API_KEY,
        temperature=0.7,
        max_tokens=1024,
    )

    system_prompt = SYSTEM_PROMPT.format(
        restaurant_name=restaurant_name,
        menu_context=menu_context,
    )

    messages = _build_langchain_messages(system_prompt, chat_history, user_message)

    response = await llm.ainvoke(messages)
    full_reply = response.content

    # Check for order intent
    order_items = _extract_order_json(full_reply)
    clean = _clean_reply(full_reply)

    return {
        "reply": clean,
        "order_items": order_items,
    }
