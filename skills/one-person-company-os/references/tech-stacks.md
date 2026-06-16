# Tech Stacks

Choose boring, well-supported stacks unless the product clearly needs otherwise. Prefer the user's existing repo patterns when working inside a project.

## Selection Rules

- Default to the simplest stack that can ship the MVP and remain maintainable.
- Use one primary backend language per product unless there is a strong boundary.
- Avoid introducing microservices before scale or ownership requires them.
- Include tests, linting, formatting, environment config, and migration strategy from day one.

## PHP

- Best for: content sites, admin systems, e-commerce, CRM, Laravel ecosystems, fast CRUD products.
- Default framework: Laravel for full-stack/backend; Symfony for enterprise-style modular systems.
- Database: MySQL or PostgreSQL; Redis for cache/queue/session when needed.
- Testing: PHPUnit or Pest; feature tests for HTTP/API behavior.
- Notes: use migrations, form requests/validators, policies/gates, queues for slow jobs, and explicit service boundaries for complex domains.

## Node.js / TypeScript

- Best for: Web apps, APIs, real-time features, full-stack TypeScript, serverless, AI integrations.
- Default frameworks: Next.js for full-stack Web; NestJS or Fastify for API services; Express only for small/simple services.
- Database: PostgreSQL with Prisma/Drizzle or query builder; Redis for cache/queue/rate limits.
- Testing: Vitest/Jest for units, Playwright for UI, Supertest or framework test utilities for APIs.
- Notes: prefer TypeScript strict mode, schema validation with Zod/Valibot, explicit env validation, and typed API contracts.

## Java

- Best for: enterprise backends, high-concurrency services, long-lived business systems, strong typing and mature ops.
- Default framework: Spring Boot.
- Database: PostgreSQL/MySQL; Redis for cache; Kafka/RabbitMQ only when asynchronous scale is needed.
- Testing: JUnit, Spring Boot tests, Testcontainers for integration tests.
- Notes: keep layered architecture disciplined, avoid excessive boilerplate, and document API contracts with OpenAPI when relevant.

## Python

- Best for: AI/ML, automation, internal tools, data processing, fast APIs, scripting.
- Default frameworks: FastAPI for APIs; Django for full-stack/admin-heavy products; Typer for CLIs.
- Database: PostgreSQL; Redis/Celery or RQ for background jobs when needed.
- Testing: pytest, httpx/TestClient, factory fixtures.
- Notes: use type hints, ruff, dependency pinning, env validation, and separate notebooks/experiments from production code.

## Rust

- Best for: performance-critical services, CLIs, desktop/native tooling, systems integrations, safe concurrency.
- Default frameworks: Axum for Web APIs; Tauri for desktop apps; Clap for CLIs.
- Database: PostgreSQL with sqlx or SeaORM based on team preference.
- Testing: cargo test, integration tests, property tests for critical parsers.
- Notes: choose Rust only when performance, safety, distribution, or native integration justifies the learning and build cost.

## Cross-Cutting Defaults

- Auth: start with proven libraries/framework primitives; never hand-roll crypto.
- API: define request/response schemas and error shape early.
- Database: use migrations, indexes for common queries, and rollback notes.
- Cache: add Redis only for clear latency, session, queue, lock, or rate-limit needs.
- Observability: log structured errors, expose health checks, record key business events.
- CI: run tests, lint/type checks, build, and security/dependency checks when available.
