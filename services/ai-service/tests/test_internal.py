from fastapi.testclient import TestClient


def test_internal_ping_without_api_key(client: TestClient):
    response = client.get("/api/v1/internal/ping")

    assert response.status_code == 401
    assert response.json()["detail"] == ("Unauthorized internal API request")


def test_internal_ping_with_invalid_api_key(client: TestClient):
    response = client.get(
        "/api/v1/internal/ping",
        headers={"X-Internal-API-Key": "invalid-key"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == ("Unauthorized internal API request")


def test_internal_ping_with_empty_api_key(client: TestClient):
    response = client.get(
        "/api/v1/internal/ping",
        headers={"X-Internal-API-Key": ""},
    )

    assert response.status_code == 401


def test_internal_ping_with_valid_api_key(
    client: TestClient,
    internal_headers: dict[str, str],
):
    response = client.get(
        "/api/v1/internal/ping",
        headers=internal_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True
    assert data["message"] == "Internal authentication successful"
    assert data["service"] == "ShopMind AI Service"
    assert data["version"] == "0.1.0"
