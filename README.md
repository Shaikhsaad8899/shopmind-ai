# ShopMind AI

A secure AI-powered e-commerce platform built using modern full-stack technologies and a microservice architecture.

## Technology Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB, Mongoose
- Caching: Redis
- AI Service: Python, FastAPI, LLM
- Infrastructure: Docker
- Package Management: pnpm Workspaces
- Version Control: Git

## Project Structure

- `apps/storefront` — Customer-facing e-commerce application
- `apps/admin` — Admin dashboard
- `services/api` — Business backend
- `services/ai-service` — Planned Python AI microservice
- `packages` — Shared libraries
- `infrastructure` — Infrastructure configuration
- `docs` — Project documentation

## Development Ports

| Service | Port |
|---|---:|
| Storefront | 3000 |
| Admin | 3001 |
| Express API | 4000 |
| Python AI Service | 8000 |
| MongoDB | 27017 |
| Redis | 6379 |

## Development

Install dependencies:

`pnpm install`

Start JavaScript applications:

`pnpm dev`

## AI Security Objectives

- Domain-restricted AI assistant
- Prompt injection protection
- Role-based access control
- Authorized tool execution
- Validated AI inputs and outputs
- AI activity auditing
- Restricted access to customer and business data

## Git Branching Strategy

- master — Stable releases
- dev — Development integration
- sprint/* — Sprint development
- feature/* — Individual features
- fix/* — Bug fixes
- hotfix/* — Critical fixes

## Project Status

Sprint 1 — Development foundation in progress.

## Version

0.0.1