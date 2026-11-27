import secrets
from typing import Annotated

from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)

api_key_header = APIKeyHeader(
    name="X-Internal-API-Key",
    auto_error=False,
)


async def verify_internal_api_key(
    api_key: Annotated[str | None, Security(api_key_header)],
) -> None:
    expected_key = settings.INTERNAL_API_KEY.get_secret_value()

    if not api_key or not secrets.compare_digest(
        api_key.encode("utf-8"),
        expected_key.encode("utf-8"),
    ):
        logger.warning("Unauthorized internal API request")

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized internal API request",
        )
