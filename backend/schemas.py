"""
SmartDine AI - Pydantic Schemas
Request/response models for every endpoint.
"""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


# ─── Auth ───────────────────────────────────────────────────────────────────

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)
    full_name: str = Field(..., min_length=1, max_length=255)
    restaurant_name: str = Field(..., min_length=1, max_length=255)


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Restaurant ─────────────────────────────────────────────────────────────

class RestaurantResponse(BaseModel):
    id: int
    owner_id: int
    name: str
    description: str
    cuisine_type: str
    address: str
    city: str
    phone: str
    logo_url: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class RestaurantUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    cuisine_type: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    phone: Optional[str] = None
    logo_url: Optional[str] = None


# ─── Menu Item ──────────────────────────────────────────────────────────────

class MenuItemCreateRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str = ""
    price: float = Field(..., gt=0)
    category: str = "Main Course"
    is_available: bool = True
    is_vegetarian: bool = False
    is_vegan: bool = False
    is_gluten_free: bool = False
    spice_level: int = Field(0, ge=0, le=5)
    calories: int = Field(0, ge=0)
    allergens: str = ""
    tags: str = ""
    wine_pairing: str = ""
    preparation_time: int = Field(15, ge=1)


class MenuItemUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    is_available: Optional[bool] = None
    is_vegetarian: Optional[bool] = None
    is_vegan: Optional[bool] = None
    is_gluten_free: Optional[bool] = None
    spice_level: Optional[int] = None
    calories: Optional[int] = None
    allergens: Optional[str] = None
    tags: Optional[str] = None
    wine_pairing: Optional[str] = None
    preparation_time: Optional[int] = None


class MenuItemResponse(BaseModel):
    id: int
    restaurant_id: int
    name: str
    description: str
    price: float
    category: str
    image_url: str
    is_available: bool
    is_vegetarian: bool
    is_vegan: bool
    is_gluten_free: bool
    spice_level: int
    calories: int
    allergens: str
    tags: str
    wine_pairing: str
    preparation_time: int
    popularity_score: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─── Order ──────────────────────────────────────────────────────────────────

class OrderItemCreateRequest(BaseModel):
    menu_item_id: int
    quantity: int = Field(1, ge=1)
    special_instructions: str = ""


class OrderCreateRequest(BaseModel):
    customer_name: str = "Walk-in"
    table_number: Optional[int] = None
    notes: str = ""
    items: list[OrderItemCreateRequest]


class OrderItemResponse(BaseModel):
    id: int
    menu_item_id: int
    quantity: int
    unit_price: float
    special_instructions: str

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    restaurant_id: int
    customer_name: str
    table_number: Optional[int]
    status: str
    total_amount: float
    notes: str
    items: list[OrderItemResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─── Chat / Voice Agent ────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    items_mentioned: list[MenuItemResponse] = []
    order_placed: Optional[OrderResponse] = None


# ─── Trends ─────────────────────────────────────────────────────────────────

class TrendItem(BaseModel):
    name: str
    description: str
    change_percentage: float
    tags: list[str]
    source_url: str = ""


class TrendsResponse(BaseModel):
    city: str
    trends: list[TrendItem]
    generated_at: datetime


# ─── Voice ──────────────────────────────────────────────────────────────────

class VoiceProcessRequest(BaseModel):
    text: str = Field(..., min_length=1)
    context: str = "general"  # general | menu_query | order


class VoiceProcessResponse(BaseModel):
    reply: str
    intent: str
    confidence: float
    suggested_items: list[str] = []


# ─── AR ─────────────────────────────────────────────────────────────────────

class ARProcessResponse(BaseModel):
    processed_image_base64: str
    width: int
    height: int
    processing_steps: list[str]
