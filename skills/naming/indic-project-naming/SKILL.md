---
name: indic-project-naming
description: Develop premium, globally pronounceable Indic-inspired names for software portfolio projects.
disable-model-invocation: true
---

# Indic project naming

Develop a software project's name through a **naming tree**: the product truth branches into the meaning the name should carry, then voice and word shape, then viable names, then validation and selection. Treat the name as a product decision grounded in defensible Indic language roots, not a decorative translation.

## Work the naming tree

Work in **rounds**. The **frontier** is every decision whose prerequisites are settled: questions the user can answer now without guessing about an answer still open. Ask the whole frontier in one round, number each question, and recommend an answer. Then wait.

Format each question like this:

```text
❓ **Q1 — <title>:** <question and, when useful, a short set of choices>

➡️ **Recommendation:** <answer and brief reason>
```

Each answer reshapes the tree. Recompute the frontier and ask the next round. A decision that depends on an answer still open belongs to a later round. Omit decisions the user has already settled, and generate names immediately when the supplied brief leaves no material decisions open.

The user owns preferences and tradeoffs. Facts are your job: inspect supplied project material, research linguistic claims, and run requested collision checks instead of asking the user to provide information you can find. Research may leave part of the tree waiting; continue with any independent frontier questions.

The brief's branch is complete when all of these are settled well enough to reject an otherwise attractive name:

- product purpose, central benefit or mechanism, users, and technical setting;
- the signal, personality, and associations the name should carry;
- length, sound, spelling, category relationship, and other word-shape preferences that matter;
- excluded words, sounds, styles, and cultural territory;
- desired scope for repository, package, web, domain, or broader collision checks.

Ask for examples only when they discriminate between live branches. Recommend a sensible default when the user has no preference; once accepted, treat it as settled.

## Build the semantic territory

Reduce the settled brief to three to five concepts tied to the product's benefit or mechanism, such as visibility, flow, memory, craft, coordination, or guardianship. Generic prestige concepts need a concrete connection to the product to remain in the tree.

Research suitable words and roots across the Indic languages that genuinely fit the territory. Sanskrit, Pali, Prakrit, and modern Indic languages are distinct sources; identify the actual language rather than presenting one tradition as representative of India. Favor compact forms with stable romanization and pronunciation that an international developer can recover from the spelling.

Verify every unfamiliar word or root with a reputable dictionary, lexicon, or linguistic source. Keep the native form where available, transliteration, language, grammatical form, and literal meaning aligned. Label residual uncertainty and remove that candidate from the leading shortlist.

## Generate an honest slate

Build both classes when the settled brief permits them:

- **Attested:** an existing word or established form with a directly supported meaning. Identify its source language. A stem, respelling, or new compound belongs in the other class.
- **Coined or hybrid:** a new construction from identifiable Indic roots, deliberate phonetic adaptation, or modern technical language. Show its components and construction without implying the complete form is attested.

A viable coinage keeps a defensible connection to its roots, reads naturally as a repository name, and is easy to say after seeing it once. Prefer meaningful constructions over arbitrary syllable splicing or ornamental diacritics.

Screen every name before showing it:

- strong fit with the product and settled naming direction;
- straightforward global spelling and pronunciation;
- linguistic integrity and an honest provenance claim;
- distinctive, contemporary character in developer contexts;
- usable lowercase repository, package, and command form;
- no reasonably detectable negative, comic, vulgar, or misleading reading in relevant Indic languages or global English;
- no careless use of sacred, religious, caste, ethnic, political, honorific, or community-specific vocabulary;
- no implication that one language or tradition is pan-Indian;
- no confusing similarity to a prominent software project, company, or developer tool found during the agreed screen.

Prefer culturally neutral territory for ordinary developer tooling. Explore identity-linked or sacred territory only when the user explicitly chooses it and the context supports respectful use. Remove a materially compromised name rather than explaining the concern away. This screen is practical due diligence, not proof of universal acceptability or legal clearance.

Rank survivors by product-semantic fit, pronunciation and spelling, linguistic integrity, developer-context distinctiveness, modern character, and technical usability. Meaning never compensates for poor fit or difficult pronunciation. Use qualitative tradeoffs rather than invented numerical precision.

## Validate the agreed scope

For requested collision checks, search the exact spelling and close phonetic variants across the agreed surfaces: GitHub, general web results, relevant package registries, and only the domain extensions the user named. Report the surfaces checked, the date, and prominent conflicts. Call it a preliminary collision screen; commercial selection may warrant a formal trademark search or professional review.

## Present the round

Return a selective slate, normally six to ten names total rather than padded spelling variants:

1. restate the naming direction in one sentence;
2. show attested and coined or hybrid names separately;
3. rank the strongest three, best fit first;
4. disclose material linguistic, cultural, pronunciation, and collision caveats;
5. ask the next frontier: the smallest set of preference decisions needed to select, refine, or change territory.

For each name include its Latin-script form, simple pronunciation, class, source language and root or components, literal meaning, intended product association, concise fit, and lowercase technical form when non-obvious. Include a caveat only when material.

Continue rounds until the user selects a name, asks for a final shortlist, or ends the exploration. Before declaring a final recommendation, confirm that every delivered finalist passed every agreed check and that no ranking decision rests on a silently assumed preference.
