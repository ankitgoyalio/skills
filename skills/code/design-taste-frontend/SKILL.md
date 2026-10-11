---
name: design-taste-frontend
description: "Art direction for landing pages, portfolios, editorial sites, and visual redesigns. Use when choosing a visual identity, replacing a template aesthetic, or translating design references into a frontend."
license: MIT
---

# Frontend design taste

1. Identify which content must dominate for the visitor to make the intended decision. For an existing site, read [redesign](references/redesign.md) before choosing a treatment. Set the preservation boundary from the brief and available evidence.
2. Read each applicable branch before making its first decision:
   - Images, product previews, logos, testimonials, or metrics: [assets and evidence](references/assets-evidence.md).
   - Animation or scroll effects: [motion](references/motion.md).
   - A new package, named design system, or platform API: [current sources](references/sources.md).
3. Translate the direction into a mechanism such as oversized project photography or a narrow editorial column. Set scale, wrapping, and crop with the actual content. Repeat layouts for comparable items; change them when the content's job changes. If directions compete, compare them in one section with identical content. In implementation, test an uncertain layout or scene at narrow and wide widths before extending it.
4. Trace the first focal point and reading order to the intended action. Remove ornament that repeats existing information. Finish with evidence appropriate to the deliverable:
   - Design: specify the composition and its narrow-layout adaptation, with acceptance checks for unresolved choices.
   - Implementation: inspect rendered narrow and wide views and record any unchecked layout or scene.
   - Review: tie each finding to visible evidence and a correction. Mark behavior or widths the supplied artifact cannot establish.

For interaction, accessibility, and loading performance, use `web-design` when installed. Otherwise use the official references under [engineering checks](references/sources.md#engineering-checks). The visual review above cannot establish those results.
