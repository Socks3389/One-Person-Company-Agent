# Offline Dependencies

Use this reference to resolve actual local skill and MCP dependencies. Do not treat external repositories as ideas to absorb. Treat them as dependencies to install, invoke, audit, and update deliberately.

## Local Mirror Root

Local mirrors live under:

`offline-dependencies/repos/`

Pinned metadata lives in:

`offline-dependencies/dependencies.lock.yml`

Human-facing documentation lives in:

`docs/one-person-company-os-offline-dependencies.md`

## Core Skill Mirrors

- Superpowers: `offline-dependencies/repos/skills/superpowers`
  - Directly use its subskills for brainstorming, planning, TDD, debugging, verification, code review, and branch finishing.
- UI UX Pro Max Skill: `offline-dependencies/repos/skills/ui-ux-pro-max-skill`
  - Directly use it for UI/UX design intelligence, frontend design systems, platform-specific UI, accessibility, and visual anti-pattern checks.
- Karpathy Guidelines: `offline-dependencies/repos/skills/andrej-karpathy-skills`
  - Directly use `skills/karpathy-guidelines` for coding discipline, clarification, minimal diffs, simplicity, and verifiable goals.

## Core MCP Mirrors

- MCP Reference Servers: `offline-dependencies/repos/mcp/modelcontextprotocol-servers`
  - Prefer `src/filesystem`, `src/git`, `src/fetch`, `src/memory`, `src/sequentialthinking`, and `src/time` for local reference and installation.
- Awesome MCP Servers by punkpeye: `offline-dependencies/repos/mcp/awesome-mcp-servers-punkpeye`
  - Use as a high-star directory for discovering additional MCPs.
- Awesome MCP Servers by appcypher: `offline-dependencies/repos/mcp/awesome-mcp-servers-appcypher`
  - Use as a curated directory plus security warning reference.
- Redis MCP: `offline-dependencies/repos/mcp/mcp-redis`
  - Use for Redis only after configuring scoped Redis ACLs and environment-specific URLs.

## Activation Policy

- If the dependency has a `SKILL.md`, load it through the host's skill mechanism.
- If the dependency is a Claude plugin or `CLAUDE.md` style dependency, install it using that tool's plugin mechanism or explicitly load its local instructions before work.
- If the dependency is an MCP server, configure it in the host MCP config with least-privilege credentials.
- If the dependency is only a registry, use it for discovery, then pin the chosen MCP separately before use.

## Required Checks

Before using any offline dependency:

- Confirm local path exists.
- Confirm the lockfile source URL and commit.
- Confirm license and maintenance status.
- Confirm whether it can execute code, access network, read secrets, or mutate data.
- Confirm environment permission level from `collaboration-permissions.md`.

## Update Policy

- Never auto-update dependencies during project work.
- Update in a dedicated dependency refresh task.
- Record old commit, new commit, release notes, security notes, and validation result.
- Re-run skill validation after changing skill dependencies.
