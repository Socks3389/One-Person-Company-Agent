# Collaboration And Permissions

Use this reference when multiple departments touch the same work, when approval is needed, or when deciding who can act.

## Collaboration Patterns

### New Product From Zero

Required roles: Founder-CEO, Product-PM, Design-UX, Architect-TL, Web-FE or Client-XP, API-BE, Data-DBA, QA, Security-Sec, Release-RM.

Flow: business brief -> PRD -> UX flow -> architecture -> task plan -> implementation -> QA/security/review -> release.

### Feature Delivery

Required roles: Product-PM, Architect-TL, relevant engineer, QA, Review-CR.

Add Design-UX for UI changes. Add Data-DBA for schema/cache/report changes. Add Security-Sec for auth, payment, PII, permissions, or production impact.

### Database Change

Required roles: API-BE, Data-DBA, QA, Review-CR.

Add Security-Sec for PII or permissions. Add Platform-SRE and Release-RM for staging/production migration.

### Production Release

Required roles: Founder-CEO, Platform-SRE, Release-RM, QA, Security-Sec, Review-CR.

Flow: release candidate -> tests -> security check -> migration/rollback check -> approval -> deploy -> smoke test -> monitoring.

### Incident Response

Required roles: Platform-SRE, relevant engineer, Data-DBA if data affected, Security-Sec if security affected, Release-RM, Founder-CEO for customer/business impact.

Flow: stabilize -> inspect -> mitigate -> verify -> communicate -> root cause -> prevention task.

## RACI Defaults

RACI means Responsible, Accountable, Consulted, Informed.

| Work item | Responsible | Accountable | Consulted | Informed |
| --- | --- | --- | --- | --- |
| PRD | Product-PM | Founder-CEO | Design-UX, Architect-TL | QA, Release-RM |
| UX design | Design-UX | Product-PM | Web-FE, Client-XP, QA | Founder-CEO |
| Architecture | Architect-TL | Founder-CEO | API-BE, Web-FE, Data-DBA, Security-Sec, Platform-SRE | QA |
| Frontend implementation | Web-FE | Architect-TL | Design-UX, API-BE, QA | Product-PM |
| Backend implementation | API-BE | Architect-TL | Data-DBA, Security-Sec, QA | Product-PM |
| Database migration | Data-DBA | Architect-TL | API-BE, Platform-SRE, Security-Sec | Release-RM |
| Test plan | QA | Product-PM | Design-UX, engineers | Founder-CEO |
| Security review | Security-Sec | Founder-CEO | Architect-TL, Platform-SRE, Data-DBA | QA, Release-RM |
| Production deployment | Release-RM | Founder-CEO | Platform-SRE, QA, Security-Sec | Product-PM |

## Permission Levels

- L0 Read: inspect files, docs, code, schemas, logs, dashboards.
- L1 Local Write: edit workspace files, run tests/builds, create local artifacts.
- L2 Dev Execute: run commands against development services and dev databases.
- L3 Staging Controlled: deploy, migrate, restart, or mutate staging only after stating impact and rollback.
- L4 Production Read: inspect production logs, metrics, config metadata, schema, and read-only data.
- L5 Production Controlled Write: production deploy, rollback, migration, restart, cache clear, data fix, or config change with explicit user approval.
- L6 Forbidden By Default: secret exposure, broad data export, destructive production deletion, disabling security controls, or irreversible operations without a written recovery plan.

## Role Permissions

| Role | Default max level | Notes |
| --- | --- | --- |
| Founder-CEO | Approval authority | Approves L5 but should not execute technical actions directly |
| Product-PM | L0 | Can approve scope, not production technical action |
| Docs-Ops | L1 | Docs and project memory only |
| Design-UX | L1 | Design files/assets and local UI review |
| Architect-TL | L2 | Can approve technical plan; needs approval for L3+ actions |
| Web-FE | L1 | Browser verification and local frontend work |
| API-BE | L2 | Dev service/database work; staging/prod changes need gate |
| Client-XP | L1 | Local client work and packaging previews |
| Data-DBA | L2 | Dev DB writes; staging/prod migrations need gate |
| Platform-SRE | L4 | Production read by default; L5 only with explicit user approval |
| Release-RM | L4 | Coordinates release; L5 only with explicit user approval |
| QA | L0 | Can run tests and inspect results; no production mutation |
| Review-CR | L0 | Review only unless also acting as implementer |
| Security-Sec | L4 | Can inspect risk; cannot expose secrets or mutate production without approval |

## Approval Gate Format

Before any L3+ action, state:

- Environment.
- Action.
- Reason.
- Expected effect.
- Risk.
- Rollback.
- Verification.
- Required approver.

For L5 actions, wait for explicit user approval before executing.

## Conflict Resolution

- Product vs engineering scope: Founder-CEO decides after Product-PM and Architect-TL present tradeoff.
- UX vs implementation cost: Product-PM decides MVP behavior; Architect-TL decides technical feasibility.
- Speed vs safety: Security-Sec, QA, and Release-RM can block release below the quality gate.
- Data correctness vs availability: Data-DBA and Platform-SRE propose options; Founder-CEO approves business risk.
