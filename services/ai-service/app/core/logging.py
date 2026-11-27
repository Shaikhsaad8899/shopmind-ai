import logging
import time

from app.core.config import settings


def configure_logging() -> None:
    logging.Formatter.converter = time.gmtime

    logging.basicConfig(
        level=settings.LOG_LEVEL,
        format=("%(asctime)sZ | %(levelname)s | %(name)s | %(message)s"),
        datefmt="%Y-%m-%dT%H:%M:%S",
    )


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
