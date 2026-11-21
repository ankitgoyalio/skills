# Performance and loading

## Measure the affected experience

Use the project's existing performance budget and representative devices/network conditions. [Core Web Vitals](https://web.dev/articles/vitals) assess loading, responsiveness, and stability: good thresholds are LCP at most 2.5 seconds, INP at most 200 milliseconds, and CLS at most 0.1, evaluated at the 75th percentile with mobile and desktop segmented. These are performance guidance, not WCAG requirements. Field measurements describe real visits; lab traces diagnose individual runs. A lab score alone does not establish field performance.

Before comparing an optimization, name the affected user journey and metric. Measure the baseline and changed version with the same build mode, content, device, network, and cache conditions. Confirm that both runs complete the intended work successfully; an error page or skipped interaction is not a faster version of the journey.

For a before/after claim, repeat both versions under matched conditions, alternating their order when practical. Report the run count, median, and range with the result and retain the traces or measurement output. If the difference is within run-to-run variation, report no measurable improvement; if the conditions or completed work differ, report the comparison as inconclusive. A single diagnostic run can locate a bottleneck but leaves an improvement claim unverified.

## Images and fonts

Reserve media space with intrinsic dimensions or an appropriate aspect ratio to reduce shifts. Supply responsive image candidates sized for the layout. Keep the LCP image discoverable and eagerly loaded; use `fetchpriority="high"` when evidence identifies it as critical. Lazy-load images outside the initial view rather than the LCP resource. See [LCP optimization](https://web.dev/articles/optimize-lcp).

For web fonts, choose fallback metrics and font-display behavior that keep text available with acceptable shifts. Preload only fonts/resources demonstrably needed early, with the correct URL and request attributes; excessive hints compete for bandwidth. Preconnect only critical cross-origin dependencies. Check the waterfall rather than applying hints to every third-party origin.

## Rendering and interaction

Use traces to identify long tasks, forced synchronous layout, and heavy paint. Reduce critical JavaScript or split expensive optional features where delayed loading remains usable. Batch DOM reads/writes for demonstrated layout thrashing. Prefer transform/opacity when they express an animation's effect, then verify rendering cost; those properties and `will-change` alone do not guarantee a compositing benefit.

Virtualization is a response to demonstrated rendering cost, not a fixed item-count requirement. Preserve keyboard position, accessible collection semantics, find-in-page expectations, and scroll restoration, or consider pagination instead.

Under slow or failed loads, keep the action's pending state perceivable and provide a recovery path. After optimization, repeat the affected load or interaction trace and check that text, images, focus, and error recovery still work.
