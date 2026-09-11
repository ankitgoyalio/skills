# Git completion

Use this reference only when the selected destination is inside a Git repository. Saving a reflection, committing changes, and pushing commits are separate operations. Follow the user's request and applicable repository policy; carry forward existing authorization without asking again. When Git operations are outside the request, finish with local files and report that they remain uncommitted. Other destinations need no repository initialization.

## Establish the baseline before editing

Identify the repository root, current branch, working-tree changes, and staged changes. Useful read-only commands are `git rev-parse --show-toplevel`, `git status --short --branch`, `git diff`, and `git diff --cached`. Run commands in the destination repository, which may differ from the agent's current workspace.

Record which affected files already contain user changes and whether unrelated changes are staged. This baseline defines what belongs to the reflection session. Preserve an existing merge, rebase, or cherry-pick; leave commits pending if they would interfere with that operation. A detached HEAD requires an intended branch before making a requested commit; use an already specified branch or resolve that missing choice with the user.

The baseline is complete when the branch state and pre-existing work are known and the session's intended files are identified.

## Choose meaningful checkpoints

Follow the requested commit structure or repository convention. Otherwise, one commit for the completed reflection and its related organizational updates is sufficient. Separate interview/draft and approved-reflection commits can be useful when the user wants that history; save the draft checkpoint before finalization in that case. Intermediate commits may contain drafts, but their messages must describe them as drafts.

Choose boundaries from the actual changes. When resuming a session, inspect its existing history and commit only remaining work. Avoid empty commits or reconstructing earlier states merely to reach a fixed commit count.

## Isolate and review the changes

Review the session diff, including source moves, transcript additions, metadata, and links. Check that exact answers remain intact and organizational updates belong to this source.

Stage explicit paths with `git add -- <paths>` when those files contain only session changes. For a moved file, include both its old and new paths. When a file also contains earlier edits, isolate the session's hunks and inspect the resulting staged content. Select the intended paths or hunks directly so unrelated notes remain excluded.

A normal commit includes everything already staged. If unrelated staged changes exist, preserve that index state and use an isolated index or another scoped commit method only when you can verify both the commit contents and preservation of the original staged work. Otherwise leave the commit pending and explain the overlap. Keep unrelated edits in place; do not discard, stash, or unstage them merely to simplify this workflow.

Before committing, inspect the exact proposed commit diff and its file list. With the normal index, use `git diff --cached` and `git diff --cached --name-status`; check whitespace with `git diff --cached --check`. This step is complete when every included change belongs to the intended checkpoint and every required session change for that checkpoint is included.

## Commit and verify

Use the repository's commit-message convention and describe the actual outcome, such as saving a source reflection or recording an interview draft. Run applicable repository checks and honor commit hooks. If a hook modifies files, review those modifications before staging and retrying. If checks fail, resolve session-owned issues; report unrelated failures without bypassing checks.

After a successful commit, inspect `git show --stat --oneline HEAD` and the commit diff, record its identifier, and check status again. Confirm unrelated staged and working-tree changes still match the baseline. If the commit contains unexpected work, report it and resolve the scope before pushing; rewriting existing history requires authorization appropriate to that change.

## Push when authorized

Verify the intended remote, branch, and upstream. If no destination is configured or specified, resolve that choice before publishing. Fetch the relevant remote when needed to inspect current divergence, then review outgoing commits with `git log <upstream>..HEAD` and their changes. A push publishes the outgoing branch history, which may include commits made before this session.

Proceed when that outgoing history is within the authorized scope. If it includes unrelated commits, explain what would also be published and leave the push pending unless their inclusion is already authorized. If the remote has advanced and the push is rejected, preserve local commits and follow any authorized synchronization workflow; otherwise report the divergence. Use a normal push, with no force push as an automatic retry.

Untracked files and uncommitted changes are not included in a push. Their presence alone does not block it. Apply a clean-worktree requirement only when the user or repository policy specifies one.

Verify the push result and report its destination and published commit identifiers. On authentication, network, or remote-policy failure, keep local commits and report the failure rather than claiming synchronization succeeded.

## Close out accurately

Report whether work is saved but uncommitted, committed locally, or pushed. Include commit identifiers, any remaining session changes, and the concrete reason for a deferred or failed operation. Mention unrelated work only as needed to explain its preservation or an actual blocker; a clean working tree is not a universal completion requirement.
