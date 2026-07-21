"""
SmartDine AI - Voice Router
POST /api/voice/process – process voice/text input using Gemini AI
"""

from fastapi import APIRouter, Depends, HTTPException, status

from models import User
from schemas import VoiceProcessRequest, VoiceProcessResponse
from auth import get_current_user
from agents.voice_agent import process_voice_input

router = APIRouter()


@router.post("/process", response_model=VoiceProcessResponse)
async def process_voice(
    body: VoiceProcessRequest,
    current_user: User = Depends(get_current_user),
):
    """
    Process text (originally from voice-to-text) using Google Gemini.
    Extracts intent, generates restaurant-context response, and suggests menu items.
    """
    try:
        result = await process_voice_input(
            text=body.text,
            context=body.context,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Voice processing failed: {exc}",
        )

    return result
