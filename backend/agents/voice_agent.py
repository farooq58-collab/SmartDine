"""
SmartDine AI - Voice Agent (Google Gemini)
Processes text input (from voice-to-text) to extract intent, generate
restaurant-context responses, and suggest menu items.
"""

import json
import os
import re
from typing import Any

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

# Configure Gemini client
_gemini_client = None
if GEMINI_API_KEY:
    _gemini_client = genai.Client(api_key=GEMINI_API_KEY)

VOICE_SYSTEM_PROMPT = """You are SmartDine AI Voice Assistant, a helpful restaurant voice interface.
You process spoken commands and queries from restaurant customers and staff.

Your responsibilities:
1. Understand the user's intent from their spoken text
2. Classify the intent into one of these categories:
   - "menu_query": asking about menu items, prices, ingredients, dietary info
   - "order": placing or modifying an order
   - "recommendation": asking for suggestions or recommendations
   - "reservation": booking a table
   - "complaint": reporting an issue
   - "compliment": positive feedback
   - "general": general questions or greetings
3. Generate a helpful, natural-sounding response appropriate for voice output
4. Suggest relevant menu items when applicable

Context: {context}

User's spoken text: "{text}"

Respond with a JSON object containing:
{{
  "reply": "Your natural-sounding response here",
  "intent": "one of the intent categories above",
  "confidence": 0.0 to 1.0 confidence score,
  "suggested_items": ["item1", "item2"] or empty list
}}

Return ONLY the JSON object, no other text.
"""


async def process_voice_input(
    text: str,
    context: str = "general",
) -> dict[str, Any]:
    """
    Process voice/text input using Google Gemini.

    Args:
        text: The transcribed text from voice input.
        context: Context type (general, menu_query, order).

    Returns:
        dict with reply, intent, confidence, and suggested_items.
    """
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        # Fallback when Gemini API key is not configured
        return _fallback_process(text, context)

    try:
        prompt = VOICE_SYSTEM_PROMPT.format(
            context=context,
            text=text,
        )

        response = _gemini_client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=512,
            ),
        )

        raw = response.text.strip()
        result = _parse_voice_response(raw)
        return result

    except Exception as exc:
        # If Gemini fails, use fallback
        return _fallback_process(text, context)


def _parse_voice_response(raw: str) -> dict[str, Any]:
    """Parse the Gemini JSON response."""
    # Direct JSON parse
    try:
        data = json.loads(raw)
        return _validate_voice_result(data)
    except json.JSONDecodeError:
        pass

    # Extract from code block
    json_match = re.search(r"```(?:json)?\s*\n(.*?)\n\s*```", raw, re.DOTALL)
    if json_match:
        try:
            data = json.loads(json_match.group(1))
            return _validate_voice_result(data)
        except json.JSONDecodeError:
            pass

    # Extract from braces
    brace_match = re.search(r"\{.*\}", raw, re.DOTALL)
    if brace_match:
        try:
            data = json.loads(brace_match.group(0))
            return _validate_voice_result(data)
        except json.JSONDecodeError:
            pass

    return {
        "reply": raw if raw else "I'm sorry, I didn't understand that. Could you please repeat?",
        "intent": "general",
        "confidence": 0.3,
        "suggested_items": [],
    }


def _validate_voice_result(data: dict) -> dict[str, Any]:
    """Validate and normalize the parsed voice response."""
    valid_intents = {
        "menu_query", "order", "recommendation",
        "reservation", "complaint", "compliment", "general",
    }
    intent = str(data.get("intent", "general")).lower()
    if intent not in valid_intents:
        intent = "general"

    confidence = data.get("confidence", 0.5)
    try:
        confidence = max(0.0, min(1.0, float(confidence)))
    except (TypeError, ValueError):
        confidence = 0.5

    suggested = data.get("suggested_items", [])
    if not isinstance(suggested, list):
        suggested = []
    suggested = [str(s) for s in suggested]

    return {
        "reply": str(data.get("reply", "How can I help you?")),
        "intent": intent,
        "confidence": confidence,
        "suggested_items": suggested,
    }


def _fallback_process(text: str, context: str) -> dict[str, Any]:
    """
    Intelligent fallback when Gemini is not available.
    Uses keyword matching to determine intent and generate responses.
    """
    text_lower = text.lower().strip()

    # Intent detection via keyword matching
    menu_keywords = {"menu", "dish", "food", "price", "cost", "ingredient", "allergen", "vegetarian", "vegan", "gluten", "spicy", "calories"}
    order_keywords = {"order", "i want", "i'd like", "give me", "bring me", "i'll have", "add", "can i get"}
    recommend_keywords = {"recommend", "suggest", "what's good", "popular", "best", "special", "favorite", "chef"}
    reservation_keywords = {"book", "reserve", "reservation", "table for", "seat"}
    complaint_keywords = {"complain", "wrong", "cold", "late", "bad", "terrible", "awful", "disgusting"}
    compliment_keywords = {"delicious", "amazing", "wonderful", "great", "excellent", "fantastic", "love", "perfect"}
    greeting_keywords = {"hello", "hi", "hey", "good morning", "good evening", "good afternoon"}

    # Determine intent
    intent = "general"
    confidence = 0.6

    words = set(text_lower.split())

    if any(kw in text_lower for kw in order_keywords):
        intent = "order"
        confidence = 0.85
        reply = "I'd be happy to help you place an order! Could you please specify which items you'd like and the quantities? You can browse our menu for options."
        suggested = ["Check our menu for today's specials"]
    elif any(kw in text_lower for kw in recommend_keywords):
        intent = "recommendation"
        confidence = 0.85
        reply = "Great question! I'd recommend checking out our chef's specials and popular items. Our most popular dishes are always a great choice. Would you like me to suggest items from a specific category?"
        suggested = ["Chef's Specials", "Popular Dishes", "Today's Specials"]
    elif words & menu_keywords:
        intent = "menu_query"
        confidence = 0.80
        reply = "I can help you with our menu! We have a variety of categories including appetizers, main courses, desserts, and drinks. Would you like details about a specific item or category?"
        suggested = ["Appetizers", "Main Courses", "Desserts", "Beverages"]
    elif any(kw in text_lower for kw in reservation_keywords):
        intent = "reservation"
        confidence = 0.80
        reply = "I'd be happy to help with a reservation! Please let me know the date, time, and number of guests, and I'll check availability for you."
        suggested = []
    elif words & complaint_keywords:
        intent = "complaint"
        confidence = 0.75
        reply = "I'm sorry to hear about your experience. Your feedback is important to us. I'll make sure to pass this along to our management team. Is there anything we can do to make it right?"
        suggested = []
    elif words & compliment_keywords:
        intent = "compliment"
        confidence = 0.75
        reply = "Thank you so much for your kind words! We're thrilled you enjoyed your experience. We look forward to serving you again!"
        suggested = []
    elif words & greeting_keywords:
        intent = "general"
        confidence = 0.90
        reply = "Welcome to our restaurant! How can I assist you today? I can help with our menu, take your order, or make recommendations."
        suggested = ["View Menu", "Get Recommendations", "Place an Order"]
    else:
        intent = "general"
        confidence = 0.5
        reply = f"I understand you're asking about: \"{text}\". I can help you with our menu, place orders, make recommendations, or answer questions about our restaurant. What would you like to do?"
        suggested = ["View Menu", "Get Recommendations", "Place an Order"]

    return {
        "reply": reply,
        "intent": intent,
        "confidence": confidence,
        "suggested_items": suggested,
    }
