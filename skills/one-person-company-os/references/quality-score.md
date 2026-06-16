# Quality Score

Use the quality score as a release gate and review discipline. It rewards verified quality, not speed theater.

## Baseline

- Every task starts at 100 points.
- Scores below 80 block release.
- Critical security, data loss, or production safety issues block release regardless of score.

## Positive Signals

Add or preserve confidence when the task includes:

- Clear acceptance criteria.
- Test-first or test-backed implementation.
- Edge case coverage.
- Small, focused diff.
- Existing patterns followed.
- UI verified in realistic viewport/device when user-facing.
- API/database behavior documented.
- Migration rollback considered.
- Secrets and permissions handled safely.
- Release and rollback path known.

## Deductions

- `-5`: minor doc or naming inconsistency.
- `-10`: missing edge case, weak error state, or incomplete verification notes.
- `-15`: no test for non-trivial business logic or API behavior.
- `-20`: unclear requirements implemented without clarification.
- `-20`: over-engineered abstraction or unrelated refactor.
- `-25`: UI not visually verified after significant frontend changes.
- `-30`: risky database migration without rollback.
- `-40`: security-sensitive behavior without security review.
- `-50`: production write/deploy/restart/delete without explicit user approval.
- `blocker`: secret leak, data loss risk, auth bypass, destructive production operation, or unverified release-critical path.

## Release Bands

- `90-100`: release allowed; record useful pattern.
- `80-89`: release allowed with improvement notes.
- `60-79`: release blocked; fix issues and re-score.
- `<60`: release blocked; run a focused retrospective and increase review depth.

## Required Score Report

For each release candidate, report:

- Current score.
- Major deductions.
- Release decision.
- Required fixes before release.
- Residual risks after release.

## Retrospective Rule

If a task drops below 80, identify the cause as one of: unclear intent, weak plan, insufficient tests, poor architecture, unsafe tooling, production risk, UX miss, or review failure. Update the next task plan to prevent recurrence.
