# Workflow

Use this lifecycle for projects started from zero. Compress steps for small projects, but do not skip the intent, risk, test, and release checks.

## 1. Discovery

- Identify business goal, target users, competitors or alternatives, platforms, budget/time constraints, must-have features, non-goals, and success metrics.
- Ask only questions that materially change scope, architecture, security, or release criteria.
- Output: startup brief and initial risk list.

## 2. PRD

- Define MVP scope, user stories, acceptance criteria, data needs, integrations, permissions, and analytics/operation needs.
- Separate v1 from later ideas.
- Output: lightweight PRD and milestone list.

## 3. UX / UI

- Map user flows, screens, states, navigation, component needs, accessibility, responsive behavior, and platform conventions.
- For visual products, choose style, color, typography, spacing, motion, and anti-patterns based on industry and audience.
- Output: screen inventory, flow notes, design system notes, usability checklist.

## 4. Architecture

- Select stack, module boundaries, API contracts, database/cache/search/queue choices, auth model, deployment model, and observability.
- Record key tradeoffs and rejected alternatives.
- Output: architecture notes, data model outline, API outline, environment plan.

## 5. Task Planning

- Break work into small tasks with exact success criteria.
- Each task should include role owner, files or modules affected when known, test expectations, and verification command.
- Output: implementation task list.

## 6. Implementation

- Prefer test-driven development for business logic, APIs, critical flows, and bug fixes.
- Implement the smallest change that satisfies the current task.
- Avoid drive-by refactors unless needed to complete the task safely.
- Output: code, tests, updated docs when behavior changes.

## 7. Review

- Run self-review before declaring completion.
- Review against PRD, architecture, tests, security, platform behavior, and quality score.
- Output: review findings and fixes.

## 8. QA

- Verify acceptance criteria, edge cases, regressions, UI states, browser/device/platform behavior, database migrations, and API errors.
- Capture known issues and release blockers.
- Output: test report and quality score.

## 9. Release

- Confirm release notes, environment, config/secrets, migrations, backup, deploy steps, smoke tests, monitoring, rollback, and user communication.
- Production write/deploy actions require explicit user approval.
- Output: release checklist and release record.

## 10. Post-Release

- Check logs, metrics, errors, feedback, and business outcome.
- Record lessons and update future defaults.
- Output: post-release verification and improvement list.

## Minimum Artifacts

- `PRD`: what will be built and how it will be accepted.
- `Architecture`: stack, modules, data, APIs, deployment, risks.
- `Task Plan`: implementable tasks with verification.
- `Test Report`: what was checked and remaining risk.
- `Release Record`: version, changes, environment, deploy/rollback notes.
