"""
SmartDine AI - FastAPI Application Entry Point
Configures CORS, includes all routers, and initialises the database.
"""

import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

load_dotenv()

from database import init_db
from routers.auth_router import router as auth_router
from routers.restaurant_router import router as restaurant_router
from routers.menu_router import router as menu_router
from routers.voice_agent_router import router as voice_agent_router
from routers.trends_router import router as trends_router
from routers.ar_router import router as ar_router
from routers.voice_router import router as voice_router


# ─── Lifespan ───────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: create tables and uploads directory."""
    init_db()
    uploads_dir = Path(__file__).parent / "uploads"
    uploads_dir.mkdir(exist_ok=True)
    print("[OK] SmartDine AI backend started successfully")
    yield
    print("[STOP] SmartDine AI backend shutting down")


# ─── App ────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="SmartDine AI",
    description="AI-powered restaurant SaaS platform – menu management, voice ordering, food trends, and AR previews.",
    version="1.0.0",
    lifespan=lifespan,
)

# ─── CORS ───────────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Static Files (uploaded images) ────────────────────────────────────────

uploads_path = Path(__file__).parent / "uploads"
uploads_path.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_path)), name="uploads")

# ─── Routers ───────────────────────────────────────────────────────────────

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(restaurant_router, prefix="/api/restaurant", tags=["Restaurant"])
app.include_router(menu_router, prefix="/api/menu", tags=["Menu"])
app.include_router(voice_agent_router, prefix="/api/agent", tags=["AI Chat Agent"])
app.include_router(trends_router, prefix="/api/trends", tags=["Food Trends"])
app.include_router(ar_router, prefix="/api/ar", tags=["AR Preview"])
app.include_router(voice_router, prefix="/api/voice", tags=["Voice Processing"])


# ─── Health ─────────────────────────────────────────────────────────────────

@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "healthy", "service": "SmartDine AI", "version": "1.0.0"}


# ─── Run ────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=True,
    )
