---
name: github-repo-settings
description: Audit or configure settings on an existing GitHub repository, including repository features, pull request merge options, and default-branch protection.
---

# GitHub Repository Settings

Work on settings stored on GitHub. The target is an existing `OWNER/REPO`.

## 1. Read the current settings

Resolve the repository from the request or its GitHub remote. If those point to different repositories, use the explicitly named target. If the target is ambiguous, confirm the slug before making a change.

Read the relevant fields from `gh api repos/OWNER/REPO`. For branch protection, read [Default-branch rules](references/branch-rules.md). An audit is complete when you can report the actual values of the requested settings and identify any settings you could not read.

## 2. Apply the requested changes

Compare the requested values with the current state. If the user asks you to choose settings, select a profile suited to how the repository is maintained. For a solo project that uses GitHub Issues and a PR workflow, a starting profile enables Issues, allows squash and rebase merges, disables merge commits, and deletes merged head branches. Use the branch-rules reference when protection is in scope.

Use [`gh repo edit`](https://cli.github.com/manual/gh_repo_edit) for supported settings and the [repository API](https://docs.github.com/en/rest/repos/repos#update-a-repository) for other general settings. Pass the repository slug explicitly and send only fields that need to change. Preserve unrelated settings when applying a profile.

For a visibility change, review [GitHub's visibility consequences](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) and proceed only when the user has authorized the exact transition. For a default-branch change, verify the named branch exists and check which rules will apply to it.

## 3. Verify on GitHub

Read back each requested setting and, when editing protection, check the effective rules for the target branch. Report the repository, verified changes, and any setting blocked by permissions, plan limits, or organization policy.
