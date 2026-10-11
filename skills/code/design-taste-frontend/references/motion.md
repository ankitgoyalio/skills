# Motion

Give the effect a specific job before selecting its implementation. Use the project's existing tools where they can express it.

For a scroll scene, define the reading sequence with pinning and horizontal movement disabled. Keep the complete content and actions available in that sequence. In implementation, verify the animated version with a short viewport, touch scrolling, keyboard traversal, resize, and return navigation. Revert to the reading sequence where the scene obstructs access.

For pointer tracking, keep the target stationary enough to activate and provide the same essential information and actions to touch and keyboard users.

Give each animated property one owner. When multiple libraries are present, assign different properties or elements to each. In implementation, verify cleanup when the framework remounts the scene.

Use `web-design` for reduced-motion behavior and rendering-cost checks. When unavailable, use the [engineering sources](sources.md#engineering-checks). In implementation, verify a static reduced-motion path and measure rendering cost before making performance claims.
