# GitHub repository standards

Limit work to settings stored on an existing GitHub repository, including repository-level Actions settings. Leave workflow YAML and other repository files untouched.

1. **Inspect.** Prefer the explicit `OWNER/REPO`, otherwise resolve it from the GitHub remote. Use the requested scope and consult [Public defaults](#public-defaults) for a public baseline. Read `gh api repos/OWNER/REPO` for general settings and match `full_name` to the intended target. Use [Settings controls](#settings-controls) for Security and Actions and [Branch rules](references/branch-rules.md) for protection or a default-branch change. Record every in-scope value and mark unreadable settings unknown with the reason.
2. **Recommend or apply.** For an audit or recommendation, report current or proposed values for every in-scope setting without writing. Base proposals on current values and the project's workflow. Apply only requested changes and confirm an ambiguous target before writing. Require explicit authorization for the exact transition when changing visibility or the default branch, removing or weakening protection, or broadening Actions permissions. Use authorization already given. Review [GitHub's visibility consequences](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#consequences-of-changing-a-repositorys-visibility) before changing visibility. Pass the exact repository on each write and send only authorized fields that need to change. For general settings, use [`gh repo edit`](https://cli.github.com/manual/gh_repo_edit) or the [repository update API](https://docs.github.com/en/rest/repos/repos#update-a-repository).
3. **Verify writes.** Read each requested setting back on GitHub through the same controls used to inspect it. For protection or default-branch changes, verify effective rules as described in [Branch rules](references/branch-rules.md). Report the exact repository and each requested setting as already matching, updated, or blocked, with its verified value or readback failure and any known cause.

## Public defaults

- **Security.** Enable secret scanning and repository push protection. For supported dependencies, enable the dependency graph, Dependabot alerts, and Dependabot security updates. Enable private vulnerability reporting when a maintainer can respond. Enable CodeQL default setup for supported languages when eligible. Check the effect on any advanced CodeQL setup before recommending a switch.
- **Default branch.** Use the [default-branch policy](#default-branch-policy).
- **Actions.** When in use, set default `GITHUB_TOKEN` permissions to read-only and require approval for fork PR workflows from at least first-time contributors. Recommend job-level write permissions in workflow YAML when needed.
- **Merging.** Enable squash merge and automatic deletion of merged head branches. Enable rebase merge when preserving individual commits matters.
- **Issues.** Enable when someone will monitor them.

## Default-branch policy

Require PRs and resolved review conversations. Block branch deletion and force pushes. Require status checks once they run reliably on PRs. Require an approving review when another maintainer is available. Use zero required approvals for a solo maintainer.

For a solo workflow that prefers linear history, allow squash and rebase, disable merge commits, and require linear history on the default branch. Keep the branch rules and repository merge settings compatible.

## Settings controls

- **Security.** Start in **Settings → Advanced Security**. [Security and analysis](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-security-and-analysis-settings-for-your-repository) · [Dependabot security updates](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-security-updates) · [Private vulnerability reporting](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository) · [CodeQL default setup](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning)
- **Actions.** Use **Settings → Actions → General** or the repository REST endpoints. [Actions settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository) · [Default workflow permissions](https://docs.github.com/en/rest/actions/permissions#get-default-workflow-permissions-for-a-repository) · [Fork PR contributor approval](https://docs.github.com/en/rest/actions/permissions#get-fork-pr-contributor-approval-permissions-for-a-repository)
