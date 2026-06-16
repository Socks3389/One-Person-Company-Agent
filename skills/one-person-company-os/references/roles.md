# Roles

Use roles as lenses for responsibility, review, and handoff. Do not simulate meetings. Activate only the roles needed for the phase.

## CEO / Founder

- Own business goal, target customer, commercial priority, budget, timeline, and release standard.
- Decide tradeoffs between speed, quality, cost, and scope.
- Output: business brief, priority order, non-goals, release go/no-go.

## Product Manager

- Convert ideas into user problems, personas, scenarios, PRD, MVP scope, and acceptance criteria.
- Keep scope small enough to ship and explicit enough to test.
- Output: PRD, user stories, acceptance criteria, milestone plan, change log.

## UI/UX Designer

- Design information architecture, user flows, wireframes, states, interaction patterns, accessibility, and cross-platform consistency.
- Choose visual direction based on product domain, not generic decoration.
- Output: flow map, screen list, design system notes, component/state checklist, usability risks.

## Architect / Tech Lead

- Select architecture, language, framework, module boundaries, API contracts, data flow, deployment model, and risk controls.
- Keep abstractions proportional to current complexity.
- Output: architecture decision record, module map, API/data model outline, risk register.

## Frontend Engineer

- Build Web UI, admin dashboards, state management, forms, routing, data fetching, error/loading/empty states, responsiveness, and accessibility.
- Verify with browser checks and visual review for user-facing changes.
- Output: frontend implementation, UI tests where appropriate, visual verification notes.

## Backend Engineer

- Build APIs, authentication, authorization, business logic, validation, queues, integrations, and service boundaries.
- Keep API behavior documented and testable.
- Output: API implementation, tests, migration notes, integration notes.

## Mobile / Mini Program / PC Engineer

- Build platform-specific clients for WeChat mini programs, iOS/Android apps, desktop apps, or cross-platform shells.
- Respect platform lifecycle, permissions, packaging, store/review constraints, and native UX expectations.
- Output: client implementation, platform checklist, packaging/release notes.

## Database Engineer

- Design schemas, indexes, migrations, seed data, backup/restore expectations, cache strategy, and query performance checks.
- Treat destructive schema/data operations as high-risk.
- Output: schema plan, migration plan, rollback plan, performance notes.

## DevOps / SRE

- Own local/dev/test/prod environments, CI/CD, secrets, deployment, logs, metrics, alerts, rollback, and incident handling.
- Separate environment permissions clearly.
- Output: environment map, CI/CD checklist, deploy plan, rollback steps, monitoring basics.

## QA Engineer

- Define test strategy, acceptance tests, regression tests, edge cases, device/browser matrix, and release verification.
- Verify claims before completion.
- Output: test plan, test report, known issues, release recommendation.

## Security Engineer

- Review secrets, authentication, authorization, data exposure, input validation, dependency risk, MCP permissions, and production operations.
- Block release for critical security gaps.
- Output: security checklist, risk rating, required fixes.

## Code Reviewer

- Review plan compliance, behavioral correctness, test coverage, readability, minimality, and unwanted side effects.
- Findings lead; summaries follow.
- Output: review findings by severity, required fixes, residual risks.

## Release Manager

- Confirm version, release notes, deploy steps, rollback, smoke tests, monitoring, and post-release follow-up.
- Production writes, migrations, restarts, deletes, and deploys need explicit user approval.
- Output: release checklist, release record, post-release verification.

## Documentation / Operations

- Maintain concise docs that help future agents act safely: project brief, decisions, setup, API notes, runbooks, and known risks.
- Output: updated operational docs, not bloated manuals.
