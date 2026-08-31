# Skill repository

Skills are organized into category folders under `skills/`:

- `code/`: software development workflows
- `food/`: cooking and recipe planning
- `naming/`: project and product naming
- `shopping/`: purchase research and product comparison

Every skill in these folders is part of the published collection and must appear exactly once in both catalogs:

- `skills.sh.json` controls the groups displayed on skills.sh. Its entries use the `name` from each skill's `SKILL.md` frontmatter.
- `.claude-plugin/marketplace.json` controls the groups displayed by the `skills` CLI. Its entries use repository-relative skill directory paths in the form `./skills/<category>/<skill-name>`.

The category folders, `skills.sh.json` groupings, and `.claude-plugin/marketplace.json` plugins mirror one another. Keep their names, descriptions, membership, and ordering aligned. A new category requires a group in both catalogs; remove both catalog groups when a category loses its final skill.

Whenever adding, renaming, moving, or deleting a skill, update both catalogs in the same change. After editing a skill, verify that its frontmatter name, directory path, and category membership still agree with both catalogs. Content-only changes need no catalog diff when those identifiers remain unchanged.

Before finishing a skill change, validate both JSON files and confirm that each catalog covers the complete set of `SKILL.md` directories without duplicates or stale entries. After a catalog, skill-name, or skill-path change, run `npx skills@latest add . --list` and verify that every skill appears under the expected category.
