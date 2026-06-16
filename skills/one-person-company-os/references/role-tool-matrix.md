# Role Tool Matrix

Use this matrix to decide which local references, offline skill dependencies, and MCP capabilities a role should use. Prefer direct invocation of the named offline dependency when installed. Do not silently replace a required dependency with "inspiration" from it; if it is unavailable, report the missing dependency and use the fallback only after noting the limitation.

## Offline Skill Dependencies

- `$one-person-company-os`: this company operating skill.
- `$superpowers/*`: local mirror at `offline-dependencies/repos/skills/superpowers`; use concrete subskills such as `brainstorming`, `writing-plans`, `test-driven-development`, `systematic-debugging`, `verification-before-completion`, and `requesting-code-review`.
- `$ui-ux-pro-max-skill`: local mirror at `offline-dependencies/repos/skills/ui-ux-pro-max-skill`; use for front-end UI/UX design, visual systems, platform-specific UI, accessibility, and anti-pattern checks.
- `$karpathy-guidelines`: local mirror at `offline-dependencies/repos/skills/andrej-karpathy-skills`; use for coding discipline, minimal diffs, clarification, simplicity, and verifiable goals.
- Built-in artifact skills: spreadsheets, documents, presentations, and PDF only when the requested output requires those artifacts.
- Language/framework skills: PHP, Node.js/TypeScript, Java, Python, Rust, Laravel, Spring Boot, FastAPI, Next.js, Tauri, React Native, Flutter; require a concrete installed skill or project-local reference before claiming one is active.

## MCP Capability Names

- Filesystem MCP: scoped workspace file operations.
- Git MCP: repository history, diff, branch, commit, PR support.
- Browser MCP: browser automation, screenshots, UI flow verification.
- SSH MCP: controlled server access.
- Database MCP: MySQL/PostgreSQL schema and query access.
- Redis MCP: cache, queue, lock, and key inspection.
- Observability MCP: logs, metrics, traces, errors, uptime.
- Secrets MCP: scoped secret metadata and config access.
- Issue/Project MCP: tasks, tickets, roadmap, sprint board when available.
- Design MCP: Figma/design-source access when available.

## Matrix

| Role | Primary references | Required skill dependencies | MCP capabilities |
| --- | --- | --- | --- |
| Founder-CEO | organization, workflow, quality-score | `$one-person-company-os`, `$superpowers/brainstorming` | Issue/Project, Git read-only, observability summaries |
| Product-PM | workflow, platforms, organization | `$one-person-company-os`, `$superpowers/brainstorming`, `$superpowers/writing-plans` | Issue/Project, Filesystem docs, analytics/observability when available |
| Docs-Ops | workflow, quality-score | `$one-person-company-os`, documents/PDF/spreadsheets as needed | Filesystem, Git, Issue/Project |
| Design-UX | platforms, workflow | `$ui-ux-pro-max-skill`, `$superpowers/brainstorming` | Browser, Design/Figma, Filesystem assets |
| Architect-TL | tech-stacks, mcp-and-infra, workflow | `$superpowers/writing-plans`, `$karpathy-guidelines`, installed language/framework skill | Git, Filesystem, Database read-only, Observability |
| Web-FE | platforms, tech-stacks | `$ui-ux-pro-max-skill`, `$karpathy-guidelines`, Node/TypeScript or chosen frontend skill | Filesystem, Git, Browser, Design/Figma |
| API-BE | tech-stacks, mcp-and-infra | `$karpathy-guidelines`, `$superpowers/test-driven-development`, installed backend language skill | Filesystem, Git, Database read-only/write with approval, Redis scoped |
| Client-XP | platforms, tech-stacks | `$ui-ux-pro-max-skill`, `$karpathy-guidelines`, mobile/mini-program/desktop skill | Filesystem, Git, Browser or device automation, Design/Figma |
| Data-DBA | tech-stacks, mcp-and-infra, quality-score | `$karpathy-guidelines`, database-specific skill if installed | Database, Redis, Git, SSH with approval |
| Platform-SRE | mcp-and-infra, workflow, quality-score | `$superpowers/systematic-debugging`, `$superpowers/verification-before-completion`, DevOps/deployment skill if installed | SSH, Git, Observability, Secrets metadata, Database read-only |
| Release-RM | workflow, quality-score, mcp-and-infra | `$superpowers/finishing-a-development-branch`, `$superpowers/verification-before-completion` | Git, SSH with approval, Observability, Issue/Project |
| Quality-QA | workflow, platforms, quality-score | `$superpowers/test-driven-development`, `$superpowers/verification-before-completion`, `$ui-ux-pro-max-skill` for UI flows | Browser, Git, Filesystem, Observability |
| Review-CR | roles, quality-score, tech-stacks | `$superpowers/requesting-code-review`, `$karpathy-guidelines` | Git, Filesystem, test runners through local shell |
| Security-Sec | mcp-and-infra, quality-score, tech-stacks | `$karpathy-guidelines`, security review skill if installed | Git, Filesystem, Secrets metadata, Database read-only, Observability |

## Tool Use Rules

- Use the narrowest MCP capability that can answer the question.
- Prefer read-only tool use until the plan and risk are understood.
- Do not use SSH or database write access as a shortcut for missing local verification.
- When a role uses a high-risk MCP, include purpose, environment, expected effect, approval state, and rollback note.
- If a needed MCP is unavailable, fall back to local inspection or ask for configuration; do not invent access.
- Check `offline-dependencies/dependencies.lock.yml` before claiming an external dependency exists locally.
