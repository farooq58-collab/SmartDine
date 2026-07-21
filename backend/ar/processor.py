"""
SmartDine AI - AR Image Processor
Processes food images for augmented-reality previews using Pillow.
Implements: background removal, perspective transforms, overlay generation.
"""

import base64
import io
import math
from typing import Any

from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps


def process_ar_image(image_bytes: bytes) -> dict[str, Any]:
    """
    Process a food image for AR preview.

    Pipeline:
        1. Load and validate the image
        2. Auto-enhance (brightness, contrast, sharpness)
        3. Background removal (color-based segmentation)
        4. Perspective transform (slight 3D tilt for AR placement)
        5. Add shadow/glow overlay for realism
        6. Return as base64 PNG

    Args:
        image_bytes: Raw bytes of the uploaded image.

    Returns:
        dict with processed_image_base64, width, height, and processing_steps.
    """
    steps: list[str] = []

    # Step 1: Load image
    img = Image.open(io.BytesIO(image_bytes)).convert("RGBA")
    original_size = img.size
    steps.append(f"Loaded image: {original_size[0]}x{original_size[1]}")

    # Resize if too large (max 1024px on longest side for performance)
    max_dim = 1024
    if max(img.size) > max_dim:
        ratio = max_dim / max(img.size)
        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
        img = img.resize(new_size, Image.LANCZOS)
        steps.append(f"Resized to {new_size[0]}x{new_size[1]}")

    # Step 2: Auto-enhance
    img = _auto_enhance(img)
    steps.append("Applied auto-enhancement (brightness, contrast, sharpness)")

    # Step 3: Background removal
    img = _remove_background(img)
    steps.append("Removed background using color-based segmentation")

    # Step 4: Perspective transform
    img = _apply_perspective_transform(img)
    steps.append("Applied perspective transform for AR placement")

    # Step 5: Add shadow overlay
    img = _add_shadow_overlay(img)
    steps.append("Added drop shadow for realism")

    # Step 6: Add subtle plate/surface glow
    img = _add_surface_glow(img)
    steps.append("Added surface glow effect")

    # Encode to base64 PNG
    buffer = io.BytesIO()
    img.save(buffer, format="PNG", optimize=True)
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    steps.append("Encoded to base64 PNG")

    return {
        "processed_image_base64": b64,
        "width": img.size[0],
        "height": img.size[1],
        "processing_steps": steps,
    }


def _auto_enhance(img: Image.Image) -> Image.Image:
    """Enhance brightness, contrast, and sharpness for vibrant food photos."""
    # Work on RGB for enhancement, preserve alpha
    rgb = img.convert("RGB")
    alpha = img.getchannel("A") if img.mode == "RGBA" else None

    # Brightness boost (slight)
    enhancer = ImageEnhance.Brightness(rgb)
    rgb = enhancer.enhance(1.1)

    # Contrast boost
    enhancer = ImageEnhance.Contrast(rgb)
    rgb = enhancer.enhance(1.15)

    # Sharpness boost
    enhancer = ImageEnhance.Sharpness(rgb)
    rgb = enhancer.enhance(1.3)

    # Color saturation boost (makes food look more appetizing)
    enhancer = ImageEnhance.Color(rgb)
    rgb = enhancer.enhance(1.2)

    result = rgb.convert("RGBA")
    if alpha:
        result.putalpha(alpha)
    return result


def _remove_background(img: Image.Image) -> Image.Image:
    """
    Remove background using color-distance-based segmentation.
    Samples corner pixels to detect background color and makes similar pixels transparent.
    """
    width, height = img.size
    pixels = img.load()

    # Sample corner regions to determine background color
    sample_size = max(5, min(width, height) // 20)
    corner_samples = []

    corners = [
        (0, 0),                          # top-left
        (width - sample_size, 0),        # top-right
        (0, height - sample_size),       # bottom-left
        (width - sample_size, height - sample_size),  # bottom-right
    ]

    for cx, cy in corners:
        for dx in range(sample_size):
            for dy in range(sample_size):
                x = min(cx + dx, width - 1)
                y = min(cy + dy, height - 1)
                corner_samples.append(pixels[x, y][:3])

    if not corner_samples:
        return img

    # Calculate average background color
    avg_r = sum(c[0] for c in corner_samples) // len(corner_samples)
    avg_g = sum(c[1] for c in corner_samples) // len(corner_samples)
    avg_b = sum(c[2] for c in corner_samples) // len(corner_samples)
    bg_color = (avg_r, avg_g, avg_b)

    # Calculate color variance to set adaptive threshold
    variance = sum(
        (c[0] - avg_r) ** 2 + (c[1] - avg_g) ** 2 + (c[2] - avg_b) ** 2
        for c in corner_samples
    ) / len(corner_samples)
    std_dev = math.sqrt(variance)

    # Adaptive threshold: higher variance = less aggressive removal
    threshold = max(30, min(80, int(std_dev * 1.5 + 35)))

    # Create alpha mask
    result = img.copy()
    result_pixels = result.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = result_pixels[x, y]
            # Color distance from background
            dist = math.sqrt((r - bg_color[0]) ** 2 + (g - bg_color[1]) ** 2 + (b - bg_color[2]) ** 2)

            if dist < threshold:
                # Background pixel - make transparent
                result_pixels[x, y] = (r, g, b, 0)
            elif dist < threshold * 1.5:
                # Edge pixel - partial transparency for smooth edges
                alpha_factor = (dist - threshold) / (threshold * 0.5)
                new_alpha = int(a * min(1.0, alpha_factor))
                result_pixels[x, y] = (r, g, b, new_alpha)

    # Apply slight blur to smooth edges
    alpha_channel = result.getchannel("A")
    alpha_channel = alpha_channel.filter(ImageFilter.GaussianBlur(radius=1))
    result.putalpha(alpha_channel)

    return result


def _apply_perspective_transform(img: Image.Image) -> Image.Image:
    """
    Apply a subtle perspective transform to make the food image look like
    it's placed on a surface viewed from a slight angle (AR placement).
    """
    width, height = img.size

    # Define perspective coefficients for a slight top-down tilt
    # This simulates placing the food on a table viewed from ~30 degrees
    # The transform narrows the top slightly and widens the bottom
    margin_x = int(width * 0.05)  # 5% inward at top
    margin_y = int(height * 0.02)  # 2% padding

    # Source corners (original image rectangle)
    # Destination corners (slightly trapezoid for perspective)
    coeffs = _find_perspective_coeffs(
        src=[(0, 0), (width, 0), (width, height), (0, height)],
        dst=[
            (margin_x, margin_y),            # top-left moves inward
            (width - margin_x, margin_y),    # top-right moves inward
            (width, height),                  # bottom-right stays
            (0, height),                      # bottom-left stays
        ],
    )

    result = img.transform(
        (width, height),
        Image.PERSPECTIVE,
        coeffs,
        Image.BICUBIC,
        fillcolor=(0, 0, 0, 0),
    )

    return result


def _find_perspective_coeffs(src: list[tuple], dst: list[tuple]) -> tuple:
    """
    Calculate the 8 perspective transform coefficients from source to destination
    quad points using a linear algebra approach.
    """
    matrix = []
    for (x, y), (X, Y) in zip(src, dst):
        matrix.append([x, y, 1, 0, 0, 0, -X * x, -X * y])
        matrix.append([0, 0, 0, x, y, 1, -Y * x, -Y * y])

    A = matrix
    B = [X for pt in dst for X in pt]

    # Solve using simple Gaussian elimination for 8x8
    n = 8
    aug = [A[i][:] + [B[i]] for i in range(n)]

    for col in range(n):
        # Find pivot
        max_row = col
        for row in range(col + 1, n):
            if abs(aug[row][col]) > abs(aug[max_row][col]):
                max_row = row
        aug[col], aug[max_row] = aug[max_row], aug[col]

        pivot = aug[col][col]
        if abs(pivot) < 1e-10:
            continue

        for row in range(col + 1, n):
            factor = aug[row][col] / pivot
            for j in range(col, n + 1):
                aug[row][j] -= factor * aug[col][j]

    # Back substitution
    coeffs = [0.0] * n
    for i in range(n - 1, -1, -1):
        if abs(aug[i][i]) < 1e-10:
            continue
        coeffs[i] = aug[i][n]
        for j in range(i + 1, n):
            coeffs[i] -= aug[i][j] * coeffs[j]
        coeffs[i] /= aug[i][i]

    return tuple(coeffs)


def _add_shadow_overlay(img: Image.Image) -> Image.Image:
    """
    Add a drop shadow beneath the food item for AR realism.
    The shadow is placed below and slightly offset.
    """
    width, height = img.size
    shadow_offset = int(height * 0.03)
    shadow_expansion = int(max(width, height) * 0.05)

    # Create a larger canvas for the shadow
    canvas_w = width + shadow_expansion * 2
    canvas_h = height + shadow_expansion * 2 + shadow_offset
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    # Create shadow from the alpha channel
    alpha = img.getchannel("A")
    shadow = Image.new("RGBA", img.size, (0, 0, 0, 60))
    shadow.putalpha(alpha)

    # Blur the shadow
    shadow_blurred = shadow.filter(ImageFilter.GaussianBlur(radius=8))

    # Paste shadow (offset down and centered)
    shadow_x = shadow_expansion
    shadow_y = shadow_expansion + shadow_offset
    canvas.paste(shadow_blurred, (shadow_x, shadow_y), shadow_blurred)

    # Paste original image on top
    img_x = shadow_expansion
    img_y = shadow_expansion
    canvas.paste(img, (img_x, img_y), img)

    # Crop any excess transparent border
    bbox = canvas.getbbox()
    if bbox:
        canvas = canvas.crop(bbox)

    return canvas


def _add_surface_glow(img: Image.Image) -> Image.Image:
    """
    Add a subtle radial glow/light effect at the bottom of the image
    to simulate ambient light reflecting off a table surface.
    """
    width, height = img.size

    # Create a gradient overlay
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Draw a subtle elliptical glow at the bottom center
    glow_width = int(width * 0.6)
    glow_height = int(height * 0.15)
    center_x = width // 2
    glow_y = height - glow_height // 2

    for i in range(glow_height, 0, -1):
        ratio = i / glow_height
        alpha = int(15 * (1 - ratio))  # Very subtle
        w = int(glow_width * ratio)
        h = int(glow_height * ratio)
        draw.ellipse(
            [
                center_x - w // 2,
                glow_y - h // 2,
                center_x + w // 2,
                glow_y + h // 2,
            ],
            fill=(255, 255, 255, alpha),
        )

    # Composite
    result = Image.alpha_composite(img, overlay)
    return result
