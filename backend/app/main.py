from fastapi import FastAPI

from app.database.database import Base, engine

# Import Models
from app.models.user import User
from app.models.asset import Asset
from app.models.vulnerability import Vulnerability

# Import Routers
from app.api.auth import router as auth_router
from app.api.assets import router as asset_router
from app.api.vulnerability import router as vulnerability_router
from app.api.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.reports import router as reports_router
from app.api.ai import router as ai_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AegisAI ASM",
    version="1.0.0",
    description="AI Powered Attack Surface Management Platform"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth_router)
app.include_router(asset_router)
app.include_router(vulnerability_router)
app.include_router(dashboard_router)
app.include_router(reports_router)
app.include_router(ai_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to AegisAI ASM 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }