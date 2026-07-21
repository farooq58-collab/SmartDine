"""
SmartDine AI - AR Router
POST /api/ar/process – process a food image for AR preview
"""

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from models import User
from schemas import ARProcessResponse
from auth import get_current_user
from ar.processor import process_ar_image

router = APIRouter()


@router.post("/process", response_model=ARProcessResponse)
async def process_ar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    """
    Process an uploaded food image for AR preview.
    Applies background removal, perspective transform, and overlay generation.
    Returns the processed image as base64.
    """
    # Validate file type
    allowed = {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported image type '{file.content_type}'. Use JPEG, PNG, or WebP.",
        )

    contents = await file.read()

    # Validate file size (max 10 MB)
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image exceeds 10 MB limit",
        )

    try:
        result = process_ar_image(contents)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Image processing failed: {exc}",
        )

    return result
