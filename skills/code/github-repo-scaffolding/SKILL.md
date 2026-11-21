---
name: github-repo-scaffolding
description: Scaffold a GitHub repository from a project brief or local code. Also use to add the issue, triage, and domain conventions for agent-led engineering to an existing GitHub repository.
---

# GitHub Repository Scaffolding

## 1. Identify the target

Inspect the working tree, history, remotes, and root project and agent docs. When a GitHub repository is named or configured, check its owner, default branch, visibility, and Issues setting with `gh repo view`. Classify the target as local-only, an existing GitHub repository, or a new GitHub repository to publish.

For a new remote, resolve the owner, repository name, and visibility before creating it. Reuse choices from the request. If publication details are still missing, prepare the local scaffold while the user resolves them.

## 2. Add the repository baseline

Initialize Git only for an unversioned project. Add missing baseline files:

- **README** with the project name, purpose, and any setup commands that work today.
- **`.gitignore`** for the project's actual toolchain and local-only files.
- **LICENSE** when the user or repository has selected a license. Use the license's standard text.

Preserve existing files and history. When publishing a new remote, review and commit the intended scaffold locally, create the remote empty, and seed it from the local history. If the remote already has commits, use its default branch as the base, reconcile local changes, and follow its branch and review conventions.

## 3. Set up the engineering workflow

When the request includes agent-led engineering, read [Engineering setup](references/engineering-setup.md). Use it to set up project-local skills, GitHub Issues and triage, and domain documentation. A repository-only request ends with the baseline.

## 4. Verify the scaffold

Check that the README describes the scaffold, agent pointers resolve, and the diff contains only intended files. If published, verify that the GitHub repository matches the requested owner and visibility and that the expected commit is on the target branch. If engineering setup is in scope, also verify its project-local skills, labels, and issue tracker. Report the repository URL or local path, the verified state, and any pending publication choice.
