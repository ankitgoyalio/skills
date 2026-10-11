# Sources

## Current implementation guidance

Use repository configuration to identify installed libraries and versions. Keep the existing framework and component contracts unless the task calls for changing them. For a new dependency or API, check official documentation for compatibility, maintenance status, and browser support. The package command belongs to that documentation, not this skill.

A named design system can be required by a host platform or the brief. A visual resemblance alone does not require its component package. Check the system's current implementation path before selecting it.

## Engineering checks

When `web-design` is unavailable, use the sources relevant to the changed behavior and record a verification result or untested limitation:

- Accessibility criteria, including motion alternatives: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- Custom-widget keyboard and focus behavior: [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/), which is informative guidance.
- Native control and document behavior: [WHATWG HTML](https://html.spec.whatwg.org/multipage/).
- CSS support and user preferences: [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS).
- Loading, responsiveness, and stability measurement: [Core Web Vitals](https://web.dev/articles/vitals).

## Provenance

Rewritten from the design intent of [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill/blob/717446e07a78d4e6d7918b1fde1a263378eebac9/skills/taste-skill/SKILL.md). The rewrite replaces prescribed package versions, numerical aesthetic presets, rigid visual bans, and the promised block library with content-driven decisions and conditional references. The upstream MIT notice is preserved in [upstream-license.txt](upstream-license.txt).
