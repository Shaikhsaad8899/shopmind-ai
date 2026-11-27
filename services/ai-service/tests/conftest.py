import os

import pytest
from fastapi.testclient import TestClient

TEST_API_KEY = "a" * 64

os.environ["APP_ENV"] = "test"
os.environ["INTERNAL_API_KEY"] = TEST_API_KEY

from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def internal_headers():
    return {
        "X-Internal-API-Key": TEST_API_KEY,
    }
