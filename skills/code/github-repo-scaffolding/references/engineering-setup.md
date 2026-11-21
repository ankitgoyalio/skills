# Engineering setup

## Project-local skills

Inspect `.agents/skills/`, `skills-lock.json`, and the agent's available skills. Reuse installed equivalents and preserve local adaptations. For a ReadRelay-style setup, use this selection as a starting point:

- **Plan and implement** with `grilling`, `to-spec`, `to-tickets`, `implement-spec`, and `tdd`.
- **Maintain** with `triage`, `domain-modeling`, and `code-review`.
- **Publish changes** with `git-commit-message` and `pull-request-message`.

Add question-driven design skills or `wizard` when those workflows are part of the project.

Discover current names before installing. ReadRelay drew its engineering skills from [Matt Pocock's skills](https://github.com/mattpocock/skills) and its commit and PR skills from [ankitgoyalio/skills](https://github.com/ankitgoyalio/skills). Use [the skills CLI](https://github.com/vercel-labs/skills) in project scope, confirm the selected skills are discoverable, and retain the generated lockfile when the repository tracks installed skills.

## Agent docs

Add short, conditional pointers under the existing agent instructions. Use root `AGENTS.md` on a fresh scaffold.

- **Issue tracker** → `docs/agents/issue-tracker.md`. Record the GitHub repository slug and how to create, read, comment on, and close issues. Use GitHub sub-issues for parent-child relationships and native dependencies for blockers. Record whether PRs enter the intake queue. ReadRelay uses Issues for intake.
- **Triage labels** → `docs/agents/triage-labels.md` when triage is in scope. Map the five roles to existing labels where possible. For a fresh tracker use `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. Create missing labels on the target repository and preserve the ones already there.
- **Domain vocabulary and architecture** → `docs/agents/domain.md`. Point to the root `GLOSSARY.md` and `docs/adr/` for a single domain context. Follow an existing domain map when the project already has distinct contexts. Add glossary entries and ADRs when the project brief establishes terms or decisions worth preserving.

## Verification

When configuring GitHub Issues as the tracker, enable Issues on the selected repository if needed. Verify that Issues is enabled, the tracker guide identifies that repository, and each mapped label exists when triage is in scope. For a local-only scaffold, prepare the local docs and report the pending GitHub work. Stop at the scaffold unless the user also asked to publish a spec or tickets.
