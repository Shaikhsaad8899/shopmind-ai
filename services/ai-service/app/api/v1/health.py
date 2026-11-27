from datetime import UTC, datetime

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get("/health")
async def get_health():
    return {
        "success": True,
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "timestamp": datetime.now(UTC).isoformat(),
    }


@router.get("/health/live")
async def get_liveness():
    return {
        "success": True,
        "status": "alive",
        "timestamp": datetime.now(UTC).isoformat(),
    }


@router.get("/health/ready")
async def get_readiness():
    return {
        "success": True,
        "status": "ready",
        "timestamp": datetime.now(UTC).isoformat(),
    }
