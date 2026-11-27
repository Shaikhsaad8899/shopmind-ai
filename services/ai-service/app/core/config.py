from pathlib import Path
from typing import Literal

from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    INTERNAL_API_KEY: SecretStr = Field(min_length=64)
    APP_NAME: str = "ShopMind AI Service"
    APP_VERSION: str = "0.1.0"

    APP_ENV: Literal["development", "test", "production"] = "development"

    APP_HOST: str = "127.0.0.1"

    APP_PORT: int = Field(default=8000, ge=1, le=65535)

    LOG_LEVEL: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()
