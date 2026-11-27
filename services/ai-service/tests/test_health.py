from fastapi.testclient import TestClient


def test_root_endpoint(client: TestClient):
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True
    assert data["service"] == "ShopMind AI Service"
    assert data["environment"] == "test"


def test_health_endpoint(client: TestClient):
    response = client.get("/api/v1/health")

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True
    assert data["status"] == "healthy"
    assert data["service"] == "ShopMind AI Service"
    assert "timestamp" in data


def test_liveness_endpoint(client: TestClient):
    response = client.get("/api/v1/health/live")

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True
    assert data["status"] == "alive"
    assert "timestamp" in data


def test_readiness_endpoint(client: TestClient):
    response = client.get("/api/v1/health/ready")

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True
    assert data["status"] == "ready"
    assert "timestamp" in data
