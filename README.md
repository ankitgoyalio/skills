# Skills for Practical Work

[![skills.sh](https://skills.sh/b/ankitgoyalio/skills)](https://skills.sh/ankitgoyalio/skills)

My collection of reusable agent skills for software work, workplace communication, cooking, reflection, naming, and purchase research.

Good agent work depends on more than a capable model. It also needs a clear method: the right questions, trustworthy evidence, explicit constraints, and an output that is ready to use.

These skills package those methods into focused workflows. Install the full collection or choose only the skills that fit your work, then adapt the installed files to your own projects.

## Installation (30-second setup)

There are two ways to install the collection. **[skills.sh](https://skills.sh/ankitgoyalio/skills)** lets you select skills and add editable copies to supported agents. **[Claude Code plugins](https://code.claude.com/docs/en/plugins)** install the collection by category from this repository's marketplace. Choose the route that fits your agent and workflow.

### Get the skills

<details>
<summary><strong>Codex, Claude Code, and other agents</strong></summary>

```bash
npx skills@latest add ankitgoyalio/skills
```

Choose the skills you want and the agents on which to install them. The installer adds ordinary skill files that you can inspect and edit in your project or user configuration.

</details>

<details>
<summary><strong>Claude Code plugins</strong></summary>

Add this repository as a third-party marketplace:

```bash
claude plugin marketplace add ankitgoyalio/skills
```

Then install one or more category plugins:

```bash
claude plugin install code@ankitgoyal-skills
claude plugin install communication@ankitgoyal-skills
claude plugin install food@ankitgoyal-skills
claude plugin install knowledge@ankitgoyal-skills
claude plugin install naming@ankitgoyal-skills
claude plugin install shopping@ankitgoyal-skills
```

Each plugin contains the skills in that category. This repository is a third-party marketplace, not an official Claude Code marketplace listing.

</details>

<details>
<summary><strong>For tinkerers</strong></summary>

Use the skills installer with any supported agent:

```bash
npx skills@latest add ankitgoyalio/skills
```

The installed skills are regular files. Read them, tailor them to your conventions, and update them when you decide to pull in newer versions.

</details>

Once installed, ask your agent to use a skill by name, for example, `Use $product-comparison to compare these options`, or let it select a model-invoked skill when the task matches.

## Why These Skills Exist

I built these skills to make recurring work with coding agents more deliberate, consistent, and useful.

### #1: Interface Copy Is Part of the Product

**The problem:** Interface language is often treated as decoration after the interaction has already been designed. That leaves people with vague labels, missing context, inconsistent terminology, and promises the product cannot support.

**The fix** is [`app-ux-writing`](./skills/code/app-ux-writing/SKILL.md). It treats language as part of the interaction, using purpose, anticipation, context, and empathy to plan, write, review, or implement app copy. It also keeps terminology, localization, accessibility, and actual product behavior in view.

### #2: Routine Development Messages Still Need Context

**The problem:** A vague commit subject or a file-by-file pull request description makes history harder to search and reviews harder to perform. Small writing tasks become inconsistent when their intent, evidence, and audience are not explicit.

**The fix** is to use:

- [`git-commit-message`](./skills/code/git-commit-message/SKILL.md) for concise Conventional Commit messages that accurately describe one logical change.
- [`pull-request-message`](./skills/code/pull-request-message/SKILL.md) for reviewer-oriented descriptions organized around what changed, why it matters, and how it was implemented.

Together, they turn repository evidence into messages that are useful after the immediate task is over.

### #3: Work Becomes Visible Through Deliberate Communication

**The problem:** Individual contributors often hold the most complete picture of their work, while managers, mentors, and teammates see only fragments. A generic status message can hide decisions, uncertainty, risks, and the help that would move the work forward.

**The fix** is [`work-update`](./skills/communication/work-update/SKILL.md). It uses an adaptive interview to build a shared understanding of the work, challenges vague or unsupported claims, and produces an audience-specific message that is ready to share.

### #4: Recommendations Need Evidence and Constraints

**The problem:** Recommendations can sound convincing while hiding assumptions, comparing mismatched options, or relying on stale and weak evidence. That matters whether the decision is what to cook, what to buy, or what to name a project.

**The fix** is a set of research-led workflows:

- [`cook-with-what-you-have`](./skills/food/cook-with-what-you-have/SKILL.md) finds established YouTube recipes and adapts them to the ingredients, equipment, time, and dietary constraints at hand.
- [`product-comparison`](./skills/shopping/product-comparison/SKILL.md) resolves exact variants, checks current evidence, applies a weighted scorecard, and makes the tradeoffs behind a purchase recommendation visible.
- [`indic-project-naming`](./skills/naming/indic-project-naming/SKILL.md) develops software project names from defensible Indic language roots, then checks pronunciation, provenance, technical usability, and collisions.

Each workflow distinguishes what is known, what is inferred, and what still needs confirmation.

### #5: Consuming a Source Is Not the Same as Understanding It

**The problem:** Highlights and summaries preserve information, but they do not necessarily capture what you think about it. Without reflection, the source's claims, your response, and the agent's synthesis can blur together.

**The fix** is [`reflect-on-source`](./skills/knowledge/reflect-on-source/SKILL.md). It uses a probing interview to develop your position, preserve your answers, and turn them into an approved reflection without inventing agreement or certainty.

### Summary

The collection is intentionally varied, but every skill follows the same principle: turn a recurring task into a transparent workflow with clear inputs, reliable evidence, and a useful finish line.

## Repository validation

Install the pinned dependency with `npm ci`, then run the complete repository and skills CLI checks:

```bash
npm run validate
```

Run `npm test` for the validator's failure-case tests. If the Claude Code CLI is installed, `npm run validate:claude` additionally runs its strict marketplace validation as an optional local check.

## Reference

The skills split on one axis: who can invoke them. **User-invoked** skills run only when you explicitly select them. **Model-invoked** skills may be selected by you or invoked automatically by a compatible agent when the task fits.

### Code

Skills for software development workflows.

**Model-invoked**

- **[app-ux-writing](./skills/code/app-ux-writing/SKILL.md):** Plan, write, review, and implement app interface copy using WWDC UX writing principles.
- **[git-commit-message](./skills/code/git-commit-message/SKILL.md):** Draft or revise precise Conventional Commit messages from the available intent and repository evidence.
- **[pull-request-message](./skills/code/pull-request-message/SKILL.md):** Draft or revise reviewer-oriented pull request and merge request descriptions using a What / Why / How structure.

### Communication

Skills for professional and workplace communication.

**Model-invoked**

- **[work-update](./skills/communication/work-update/SKILL.md):** Interview the user about their work, confirm a shared understanding, and draft an audience-specific update.

### Food

Skills for cooking and recipe planning.

**Model-invoked**

- **[cook-with-what-you-have](./skills/food/cook-with-what-you-have/SKILL.md):** Find established YouTube recipes and adapt them to the ingredients and constraints you have.

### Knowledge

Skills for reflection and personal knowledge management.

**Model-invoked**

- **[reflect-on-source](./skills/knowledge/reflect-on-source/SKILL.md):** Reflect on a saved source through an interview, then turn the answers into an approved personal reflection.

### Naming

Skills for naming projects and products.

**User-invoked**

- **[indic-project-naming](./skills/naming/indic-project-naming/SKILL.md):** Develop premium, globally pronounceable software project names with defensible Indic language roots.

### Shopping

Skills for researching and comparing purchases.

**Model-invoked**

- **[product-comparison](./skills/shopping/product-comparison/SKILL.md):** Research and compare exact product variants with current evidence, weighted scorecards, claim checks, and a buyer-specific recommendation.
