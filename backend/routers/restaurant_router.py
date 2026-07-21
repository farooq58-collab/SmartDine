"""
SmartDine AI - Restaurant Router
GET  /api/restaurant      – get current user's restaurant
PUT  /api/restaurant      – update restaurant details
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User, Restaurant
from schemas import RestaurantResponse, RestaurantUpdateRequest
from auth import get_current_user

router = APIRouter()


def _get_restaurant(user: User, db: Session) -> Restaurant:
    """Helper: fetch the restaurant owned by the current user."""
    restaurant = db.query(Restaurant).filter(Restaurant.owner_id == user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No restaurant found for this user. Register first.",
        )
    return restaurant


@router.get("", response_model=RestaurantResponse)
def get_restaurant(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return the authenticated user's restaurant details."""
    restaurant = _get_restaurant(current_user, db)
    return RestaurantResponse.model_validate(restaurant)


@router.put("", response_model=RestaurantResponse)
def update_restaurant(
    body: RestaurantUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update restaurant details (partial update – only supplied fields)."""
    restaurant = _get_restaurant(current_user, db)

    update_data = body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(restaurant, field, value)

    db.commit()
    db.refresh(restaurant)
    return RestaurantResponse.model_validate(restaurant)
