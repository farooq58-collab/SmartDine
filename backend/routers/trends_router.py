"""
SmartDine AI - Trends Router
GET /api/trends/{city} – fetch food trends for a given city using Tavily search
"""

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from models import User
from schemas import TrendsResponse
from auth import get_current_user
from agents.trend_agent import fetch_food_trends

router = APIRouter()


@router.get("/{city}", response_model=TrendsResponse)
async def get_trends(
    city: str,
    current_user: User = Depends(get_current_user),
):
    """Fetch current food trends for a given city using AI-powered web search."""
    if not city or len(city.strip()) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="City name must be at least 2 characters",
        )

    try:
        trends = await fetch_food_trends(city.strip())
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Trend search failed: {exc}",
        )

    return TrendsResponse(
        city=city.strip(),
        trends=trends,
        generated_at=datetime.now(timezone.utc),
    )
