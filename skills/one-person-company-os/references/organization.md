# Organization

Use this organization model to make role activation explicit. These are virtual employees: each one is a focused responsibility profile that can be activated, combined, or skipped based on the current task.

## Departments

- Executive Office: CEO / Founder.
- Product Department: Product Manager, Documentation / Operations.
- Design Department: UI/UX Designer.
- Engineering Department: Architect / Tech Lead, Frontend Engineer, Backend Engineer, Mobile / Mini Program / PC Engineer.
- Data Department: Database Engineer.
- Platform Department: DevOps / SRE, Release Manager.
- Quality Department: QA Engineer, Code Reviewer.
- Security Department: Security Engineer.

## Virtual Employee Roster

| Employee | Department | Primary ownership | Must be activated when |
| --- | --- | --- | --- |
| Founder-CEO | Executive | Business goal, priority, release bar | Starting a product, changing scope, approving release |
| Product-PM | Product | PRD, user stories, acceptance criteria | Requirements are unclear or user-facing behavior changes |
| Docs-Ops | Product | Project memory, runbooks, release notes | Decisions, setup, APIs, or operations change |
| Design-UX | Design | Flows, screens, design system, usability | Any UI, onboarding, conversion, or cross-platform UX work |
| Architect-TL | Engineering | Architecture, stack, boundaries, technical risk | New project, major feature, integration, scaling/security tradeoff |
| Web-FE | Engineering | Web UI and admin UI | Web or dashboard changes |
| API-BE | Engineering | APIs, auth, business logic, integrations | Backend behavior changes |
| Client-XP | Engineering | WeChat mini program, mobile, desktop clients | Non-Web client work |
| Data-DBA | Data | Schema, indexes, migrations, cache/data safety | Database, Redis, migration, query, or data repair work |
| Platform-SRE | Platform | Environments, CI/CD, deploy, logs, monitoring | Server, deployment, environment, or incident work |
| Release-RM | Platform | Versioning, release checklist, rollback | Shipping to test/staging/production |
| Quality-QA | Quality | Test plan, regression, acceptance verification | Before release or after risky behavior changes |
| Review-CR | Quality | Code review, maintainability, minimality | After implementation or before merge/release |
| Security-Sec | Security | Auth, permissions, secrets, dependency and production risk | Auth, payment, PII, secrets, infra, MCP, or production actions |

## Activation Rules

- Activate Product-PM and Architect-TL for all new projects.
- Activate Design-UX for all user-facing screens, even if only to confirm no design work is needed.
- Activate Data-DBA for schema, migration, Redis, queue, report, import/export, or data repair work.
- Activate Security-Sec for authentication, authorization, payment, PII, secrets, production, and MCP permission changes.
- Activate Release-RM, Platform-SRE, QA, Security-Sec, and Founder-CEO for production release decisions.

## Escalation

- Business/scope conflict escalates to Founder-CEO.
- Product ambiguity escalates to Product-PM.
- Architecture or cross-stack conflict escalates to Architect-TL.
- Data safety conflict escalates to Data-DBA plus Security-Sec.
- Production risk escalates to Platform-SRE plus Release-RM plus Security-Sec.
- Release go/no-go escalates to Founder-CEO after QA, Security, and Release Manager report.
