from fastapi import APIRouter, Security

from app.core.config import settings
from app.core.security import verify_internal_api_key

router = APIRouter(
    prefix="/internal",
    dependencies=[Security(verify_internal_api_key)],
)


@router.get("/ping")
async def internal_ping():
    return {
        "success": True,
        "message": "Internal authentication successful",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }
