# Offline Dependencies

This directory stores local mirrors and lock metadata for the `one-person-company-os` skill.

## What Is Mirrored

- `repos/skills/superpowers`
- `repos/skills/ui-ux-pro-max-skill`
- `repos/skills/andrej-karpathy-skills`
- `repos/mcp/modelcontextprotocol-servers`
- `repos/mcp/awesome-mcp-servers-punkpeye`
- `repos/mcp/awesome-mcp-servers-appcypher`
- `repos/mcp/mcp-redis`

## Lockfile

See `dependencies.lock.yml` for source URLs, pinned commits, usage, and status.

## Policy

- Do not auto-update these repositories during product work.
- Review code and permissions before enabling any dependency.
- Treat MCP servers as executable code with the host process permissions.
- Keep production MCP access read-only unless explicitly approved.
