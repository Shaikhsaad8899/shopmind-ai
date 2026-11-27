# ShopMind AI Service

An internal Python-based AI microservice for the ShopMind AI e-commerce platform, built using FastAPI.

## Technology Stack

- Python 3.12
- FastAPI
- Uvicorn
- Pydantic
- Pydantic Settings
- Pytest
- Ruff

## Current Features

- Versioned REST API
- Environment-based configuration
- Application lifecycle management
- UTC application logging
- Health, liveness and readiness endpoints
- Internal API key authentication
- Constant-time credential comparison
- Production API documentation restrictions
- Automated API testing
- GitHub Actions CI integration

## Local Development

Execute the following commands from the `services/ai-service` directory.

### Create Virtual Environment

```powershell
python -m venv .venv
```

### Activate Virtual Environment

```powershell
.\.venv\Scripts\Activate.ps1
```

### Install Dependencies

```powershell
python -m pip install -r requirements.txt
```

### Configure Environment

```powershell
Copy-Item .env.example .env
```

Generate a secure internal API key:

```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

Add the generated key to the local `.env` file.

Never commit actual credentials or environment secrets.

### Start Development Server

```powershell
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

## API Endpoints

| Method | Endpoint | Authentication |
|---|---|---|
| GET | / | Not required |
| GET | /api/v1/health | Not required |
| GET | /api/v1/health/live | Not required |
| GET | /api/v1/health/ready | Not required |
| GET | /api/v1/internal/ping | Internal API key |

Protected endpoints require the `X-Internal-API-Key` request header.

## API Documentation

Available in non-production environments:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc
- OpenAPI: http://127.0.0.1:8000/openapi.json

## Code Quality

```powershell
python -m ruff check .
python -m ruff format --check .
```

Automatically fix linting and formatting issues:

```powershell
python -m ruff check . --fix
python -m ruff format .
```

## Automated Testing

```powershell
python -m pytest
```

## Continuous Integration

GitHub Actions validates dependencies, linting, formatting and automated tests on Ubuntu using Python 3.12.

## Future Enhancements

- Node.js and Python service communication
- LLM integration
- Retrieval-Augmented Generation (RAG)
- Vector database integration
- Product recommendation agents
- E-commerce conversational assistant
- AI guardrails
- Prompt injection protection
- AI observability and monitoring

## Version

0.1.0