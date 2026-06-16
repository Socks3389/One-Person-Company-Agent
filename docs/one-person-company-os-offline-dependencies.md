# One Person Company OS Offline Dependencies

Snapshot date: 2026-06-16

This document explains the offline dependency model for `one-person-company-os`. The goal is direct dependency usage: for example, the frontend engineer does not "borrow ideas" from UI UX Pro Max; the frontend engineer uses the local `$ui-ux-pro-max-skill` dependency when it is installed and relevant.

## 1. Dependency Principle

The company OS has three layers:

1. Company governance: `skills/one-person-company-os`.
2. Offline skill dependencies: external skills mirrored under `offline-dependencies/repos/skills`.
3. Offline MCP dependencies and registries: MCP servers and catalogs mirrored under `offline-dependencies/repos/mcp`.

Rules:

- Use a dependency by name when the role matrix requires it.
- If a dependency is missing or not installed in the active host, report that limitation.
- Do not silently replace a missing dependency with a summary or memory of it.
- Pin every mirrored dependency by commit in `offline-dependencies/dependencies.lock.yml`.
- Treat every MCP server as executable code that may access files, databases, network, or secrets.

## 2. Core Skill Dependencies

### Superpowers

Local path: `offline-dependencies/repos/skills/superpowers`

Pinned commit: `8cf39006140a743dce31ba4046fceab90cc214e6`

Use for:

- Product brainstorming.
- Implementation planning.
- Test-driven development.
- Systematic debugging.
- Verification before completion.
- Code review workflow.
- Development branch finishing.

Role usage:

- Product-PM uses `brainstorming` and `writing-plans`.
- API-BE uses `test-driven-development`.
- Platform-SRE uses `systematic-debugging` and `verification-before-completion`.
- Review-CR uses `requesting-code-review`.
- Release-RM uses `finishing-a-development-branch`.

### UI UX Pro Max Skill

Local path: `offline-dependencies/repos/skills/ui-ux-pro-max-skill`

Pinned commit: `b7e3af80f6e331f6fb456667b82b12cade7c9d35`

Use for:

- Frontend UI/UX direction.
- Landing page and application layout.
- Cross-platform UI decisions.
- Design system recommendations.
- Accessibility and anti-pattern checks.
- Dashboard/chart UI guidance.

Role usage:

- Design-UX must use it for user-facing product design.
- Web-FE must use it before major frontend implementation.
- Client-XP must use it for WeChat mini program, mobile, and desktop UX.
- Quality-QA may use it to verify UI states and user flows.

### Karpathy Guidelines

Local path: `offline-dependencies/repos/skills/andrej-karpathy-skills`

Pinned commit: `2c606141936f1eeef17fa3043a72095b4765b9c2`

Use for:

- Clarifying assumptions before coding.
- Keeping diffs small and surgical.
- Avoiding over-engineered abstractions.
- Transforming vague tasks into verifiable goals.

Role usage:

- Architect-TL uses it when selecting or simplifying architecture.
- Web-FE/API-BE/Client-XP use it during implementation.
- Review-CR uses it during code review.
- Security-Sec uses it when checking risky assumptions.

## 3. Core MCP Dependencies

### Model Context Protocol Reference Servers

Local path: `offline-dependencies/repos/mcp/modelcontextprotocol-servers`

Pinned commit: `275175cda17ca9c49920ceed2bcf27e12e59f8b2`

Use for:

- Filesystem MCP.
- Git MCP.
- Fetch MCP.
- Memory MCP.
- Sequential Thinking MCP.
- Time MCP.

Default role usage:

- Architect-TL, Web-FE, API-BE, Review-CR use Git/Filesystem.
- Product-PM and Docs-Ops use Filesystem/Memory for project context.
- Platform-SRE and Release-RM use Git plus observability MCPs where configured.

### Awesome MCP Servers by punkpeye

Local path: `offline-dependencies/repos/mcp/awesome-mcp-servers-punkpeye`

Pinned commit: `daa005e19ee5ddcbd943e43d2ffe27c3b720f0bf`

Use for:

- Discovering high-star MCP servers.
- Comparing MCP candidates before pinning one.

This is a registry dependency, not an executable dependency.

### Awesome MCP Servers by appcypher

Local path: `offline-dependencies/repos/mcp/awesome-mcp-servers-appcypher`

Pinned commit: `280218b4bba97a49facf929f8012dec5e30384b6`

Use for:

- Curated MCP discovery.
- Security checklist reference.

This repository explicitly warns that MCP servers can execute code and should be sandboxed/reviewed before installation.

### Redis MCP

Local path: `offline-dependencies/repos/mcp/mcp-redis`

Pinned commit: `49920d7d0daf509e0fbc35d4a5a0e36909f3420e`

Use for:

- Redis key inspection.
- Cache debugging.
- Queue visibility.
- Redis search/data operations when intentionally enabled.

Required controls:

- Use Redis ACL.
- Prefer read-only users for production.
- Never allow broad production key deletion or flush by default.
- Configure separate dev/test/prod URLs.

## 4. Pending MCP Choices

Some MCP capabilities are intentionally not pinned yet:

- MySQL MCP: choose from official registry or curated lists after security review.
- PostgreSQL MCP: official reference Postgres exists in archived materials; choose a maintained server or use read-only database tooling.
- SSH MCP: choose only after defining host names, allowed commands, user accounts, and production approval policy.
- Secrets MCP: choose only after deciding the secret manager.
- Observability MCP: choose based on Sentry, Grafana, Prometheus, Datadog, ELK, or cloud provider.
- Design/Figma MCP: choose based on design workflow and account access.
- Issue/Project MCP: choose based on GitHub Issues, Linear, Jira, Notion, or another tracker.

## 5. Installation Model

For Codex/Claude hosts:

- Install skill dependencies through the host plugin/skill mechanism when possible.
- If the host cannot install a skill directly, load the local dependency path as a project-level reference.
- Configure MCP servers through the host MCP config.
- Keep credentials outside this repository.

Example config shape:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:/Users/Administrator/Desktop/One Person Company"]
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "C:/Users/Administrator/Desktop/One Person Company"]
    },
    "redis-dev": {
      "command": "uvx",
      "args": ["--from", "redis-mcp-server@latest", "redis-mcp-server", "--url", "redis://localhost:6379/0"]
    }
  }
}
```

On Windows, some `npx` MCP entries may need to be wrapped with `cmd /c` depending on the host.

## 6. Permission Model

Use the permission model in `skills/one-person-company-os/references/collaboration-permissions.md`.

Short version:

- Local development: normal file edits and tests.
- Development server: normal setup, logs, seed data, preview deploys.
- Staging: risky commands require stated impact and rollback.
- Production: read-only by default.
- Production writes, migrations, restarts, deploys, data repair, cache clear, and secret changes require explicit user approval.

## 7. Update Procedure

Use a dedicated dependency refresh task:

1. Pull or re-clone the dependency.
2. Record old commit and new commit.
3. Review release notes and security issues.
4. Re-run local validation.
5. Update `offline-dependencies/dependencies.lock.yml`.
6. Update role matrix if invocation names or structure changed.

Never update dependencies during a product implementation task unless the task is specifically dependency maintenance.
