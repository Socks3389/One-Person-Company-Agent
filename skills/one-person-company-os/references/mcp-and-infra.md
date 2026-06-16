# MCP And Infrastructure

Use MCP to expose tools and context safely to agents. Treat every MCP server as an extension of the agent's permissions.

For offline dependency resolution, check `references/offline-dependencies.md`, `offline-dependencies/dependencies.lock.yml`, and `offline-dependencies/mcp.example.json` before claiming an MCP server is available.

## MCP Model

- MCP host: the AI app or coding environment.
- MCP client: the connection from host to one server.
- MCP server: a local or remote program exposing tools, resources, and prompts.
- Tools perform actions; resources provide context; prompts provide reusable interaction templates.

## Recommended MCP Categories

- Filesystem: scoped file read/write for the active workspace.
- Git: repository inspection, diff, branch, commit, and history operations.
- Browser automation: local UI testing, screenshots, form flows, and visual verification.
- SSH: controlled access to development, test, and production servers.
- MySQL/PostgreSQL: schema inspection, safe reads, migration planning, and explicitly approved writes.
- Redis: key inspection, cache debugging, queue visibility, and explicitly approved mutations.
- Observability: logs, metrics, traces, Sentry-like error systems, uptime checks.
- Secrets manager: read scoped config metadata; never expose raw secrets unless explicitly required and safe.

## Environment Policy

- Local: normal development actions allowed inside the workspace.
- Development server: execute normal setup, test, deploy-preview, logs, and database seed tasks.
- Test/staging server: read and execute with confirmation for migrations, destructive data changes, restarts, or deploys.
- Production server: read-only by default.

Production actions requiring explicit user approval:

- deploy or rollback.
- database migration or data repair.
- write/update/delete data.
- restart service, change process manager, or modify infrastructure.
- rotate secrets or change environment variables.
- clear cache, queue, or Redis keys.
- run commands with broad filesystem or network impact.

## SSH Policy

- Prefer named hosts and documented commands over free-form shell access.
- Record host, environment, purpose, command, expected effect, rollback, and verification.
- Never run destructive commands on production without explicit approval.
- Capture command output relevant to the task in the release or incident record.

## Database Policy

- Default to read-only queries for inspection.
- For writes, require migration or script, backup/rollback plan, and user approval in staging/production.
- Avoid ad hoc production SQL writes.
- Inspect schema and indexes before optimizing queries.
- Treat PII exports as sensitive and minimize result size.

## Redis Policy

- Reads are allowed for debugging when scoped.
- Deletes, flushes, queue mutations, lock changes, and cache clears need approval outside development.
- Never run broad key scans against large production Redis without considering impact.

## Browser Automation

- Use for user-facing verification: responsive layout, navigation, forms, auth, error states, and screenshots.
- After significant frontend changes, verify the actual running app when possible.
- Treat external websites and logged-in sessions as sensitive.

## Tool Selection

- Prefer official or well-maintained MCP servers for Git, filesystem, browser, and databases.
- Use custom MCP servers when the company has proprietary APIs, unusual deployment workflows, or workflow-specific guardrails.
- Document every MCP server with purpose, environment, permissions, credentials source, and risk level.
