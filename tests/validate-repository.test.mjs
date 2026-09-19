import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validator = resolve(repositoryRoot, "scripts/validate-repository.mjs");

function fixture() {
  const root = mkdtempSync(resolve(tmpdir(), "skills-validation-"));
  for (const path of ["AGENTS.md", "README.md", "skills.sh.json", ".claude-plugin", "skills"]) {
    cpSync(resolve(repositoryRoot, path), resolve(root, path), { recursive: true });
  }
  return root;
}

function validate(root) {
  return spawnSync(process.execPath, [validator, "--root", root, "--skip-skills-cli"], {
    encoding: "utf8",
  });
}

function mutateJson(root, path, mutation) {
  const absolutePath = resolve(root, path);
  const value = JSON.parse(readFileSync(absolutePath, "utf8"));
  mutation(value);
  writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`);
}

function rejectsMutation(name, mutation, expectedMessage) {
  test(name, () => {
    const root = fixture();
    try {
      mutation(root);
      const result = validate(root);
      assert.notEqual(result.status, 0, result.stdout);
      assert.match(result.stderr, expectedMessage);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
}

test("accepts the repository fixture", () => {
  const root = fixture();
  try {
    const result = validate(root);
    assert.equal(result.status, 0, result.stderr);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

rejectsMutation("rejects a missing catalog entry", (root) => {
  mutateJson(root, "skills.sh.json", (catalog) => catalog.groupings[0].skills.shift());
}, /missing published skill `app-ux-writing`/);

rejectsMutation("rejects a duplicate catalog entry", (root) => {
  mutateJson(root, ".claude-plugin/marketplace.json", (catalog) => {
    catalog.plugins[0].skills.push(catalog.plugins[0].skills[0]);
  });
}, /skill path `.\/skills\/code\/app-ux-writing` appears more than once/);

rejectsMutation("rejects a stale catalog entry", (root) => {
  mutateJson(root, ".claude-plugin/marketplace.json", (catalog) => {
    catalog.plugins[0].skills[0] = "./skills/code/removed-skill";
  });
}, /stale or unknown skill path `.\/skills\/code\/removed-skill`/);

rejectsMutation("rejects mismatched skill frontmatter", (root) => {
  const path = resolve(root, "skills/code/app-ux-writing/SKILL.md");
  writeFileSync(path, readFileSync(path, "utf8").replace("name: app-ux-writing", "name: wrong-name"));
}, /frontmatter name `wrong-name` must match directory name `app-ux-writing`/);
