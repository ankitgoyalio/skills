#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument } from "yaml";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const defaultRoot = resolve(scriptDirectory, "..");
const argumentsList = process.argv.slice(2);
let root = defaultRoot;
let checkSkillsCli = true;

for (let index = 0; index < argumentsList.length; index += 1) {
  const argument = argumentsList[index];
  if (argument === "--root" && argumentsList[index + 1]) {
    root = resolve(argumentsList[index + 1]);
    index += 1;
  } else if (argument === "--skip-skills-cli") {
    checkSkillsCli = false;
  } else {
    console.error(`Unknown argument: ${argument}`);
    process.exit(2);
  }
}

const errors = [];
const report = (message) => errors.push(message);
const fromRoot = (path) => resolve(root, path);
const displayPath = (path) => relative(root, path) || ".";

function readText(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    report(`${displayPath(path)}: cannot be read (${error.message}).`);
    return undefined;
  }
}

function readJson(path) {
  const source = readText(path);
  if (source === undefined) return undefined;
  try {
    return JSON.parse(source);
  } catch (error) {
    report(`${displayPath(path)}: invalid JSON (${error.message}).`);
    return undefined;
  }
}

function readYaml(path, label) {
  const source = readText(path);
  if (source === undefined) return undefined;
  const document = parseDocument(source, { prettyErrors: true });
  if (document.errors.length > 0) {
    for (const error of document.errors) {
      report(`${displayPath(path)}: invalid YAML in ${label} (${error.message}).`);
    }
    return undefined;
  }
  const value = document.toJS();
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    report(`${displayPath(path)}: ${label} must be a YAML mapping.`);
    return undefined;
  }
  return value;
}

function duplicates(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

function compareOrdered(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    report(`${label}: expected [${expected.join(", ")}], found [${actual.join(", ")}].`);
  }
}

function compareMembership(actual, expected, label) {
  compareOrdered([...actual].sort(), [...expected].sort(), label);
}

function titleFor(category) {
  return category.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function descriptionFor(description) {
  return `Skills for ${description.replace(/[.!?]+$/, "")}.`;
}

const agentsPath = fromRoot("AGENTS.md");
const agentsSource = readText(agentsPath) ?? "";
const categoryDefinitions = [...agentsSource.matchAll(/^- `([^`/]+)\/`: (.+)$/gm)].map((match) => ({
  name: match[1],
  description: match[2].trim(),
}));
if (categoryDefinitions.length === 0) {
  report("AGENTS.md: could not find category definitions in the expected `- `category/`: description` form.");
}

const skillsRoot = fromRoot("skills");
const directoryCategories = existsSync(skillsRoot)
  ? readdirSync(skillsRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort()
  : [];
if (!existsSync(skillsRoot)) report("skills/: directory does not exist.");

const expectedCategoryNames = categoryDefinitions.map(({ name }) => name);
for (const duplicate of duplicates(expectedCategoryNames)) {
  report(`AGENTS.md: category \`${duplicate}\` is defined more than once.`);
}
compareOrdered(directoryCategories, [...expectedCategoryNames].sort(), "skills/: category directories do not match AGENTS.md");

const skills = [];
for (const category of directoryCategories) {
  const categoryPath = fromRoot(`skills/${category}`);
  if (!existsSync(categoryPath)) continue;
  const entries = readdirSync(categoryPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(resolve(categoryPath, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();
  for (const directoryName of entries) {
    const directory = resolve(categoryPath, directoryName);
    const skillPath = resolve(directory, "SKILL.md");
    const source = readText(skillPath);
    let frontmatter;
    if (source !== undefined) {
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      if (!match) {
        report(`${displayPath(skillPath)}: missing YAML frontmatter delimited by opening and closing \`---\` lines.`);
      } else {
        const document = parseDocument(match[1], { prettyErrors: true });
        if (document.errors.length > 0) {
          for (const error of document.errors) report(`${displayPath(skillPath)}: invalid frontmatter YAML (${error.message}).`);
        } else {
          frontmatter = document.toJS();
          if (frontmatter === null || typeof frontmatter !== "object" || Array.isArray(frontmatter)) {
            report(`${displayPath(skillPath)}: frontmatter must be a YAML mapping.`);
            frontmatter = undefined;
          }
        }
      }
    }

    const name = frontmatter?.name;
    if (typeof name !== "string" || name.trim() === "") {
      report(`${displayPath(skillPath)}: frontmatter \`name\` must be a non-empty string.`);
    } else if (name !== directoryName) {
      report(`${displayPath(skillPath)}: frontmatter name \`${name}\` must match directory name \`${directoryName}\`.`);
    }

    const agentPath = resolve(directory, "agents/openai.yaml");
    let agent;
    if (!existsSync(agentPath)) {
      report(`${displayPath(directory)}: missing required agents/openai.yaml.`);
    } else {
      agent = readYaml(agentPath, "agent metadata");
      for (const field of ["display_name", "short_description"]) {
        const value = agent?.interface?.[field];
        if (typeof value !== "string" || value.trim() === "") {
          report(`${displayPath(agentPath)}: interface.${field} must be a non-empty string.`);
        }
      }
    }

    const disableInvocation = frontmatter?.["disable-model-invocation"] === true;
    const implicitInvocation = agent?.policy?.allow_implicit_invocation;
    if (frontmatter && "disable-model-invocation" in frontmatter && typeof frontmatter["disable-model-invocation"] !== "boolean") {
      report(`${displayPath(skillPath)}: disable-model-invocation must be a boolean when present.`);
    }
    if (agent?.policy && "allow_implicit_invocation" in agent.policy && typeof implicitInvocation !== "boolean") {
      report(`${displayPath(agentPath)}: policy.allow_implicit_invocation must be a boolean when present.`);
    }
    if (disableInvocation && implicitInvocation !== false) {
      report(`${displayPath(agentPath)}: policy.allow_implicit_invocation must be false because SKILL.md sets disable-model-invocation: true.`);
    }
    if (!disableInvocation && implicitInvocation === false) {
      report(`${displayPath(agentPath)}: model-invoked skill must not set policy.allow_implicit_invocation to false.`);
    }

    skills.push({ category, directoryName, name, directory, skillPath });
  }
}

const validSkillNames = skills.filter(({ name }) => typeof name === "string" && name.trim() !== "").map(({ name }) => name);
for (const duplicate of duplicates(validSkillNames)) {
  report(`skills/: frontmatter name \`${duplicate}\` is used by more than one skill; skill names must be unique.`);
}

const expectedByCategory = new Map(expectedCategoryNames.map((category) => [
  category,
  skills.filter((skill) => skill.category === category).map((skill) => skill.directoryName),
]));
const allExpectedNames = skills.map(({ directoryName }) => directoryName);
const allExpectedPaths = skills.map(({ category, directoryName }) => `./skills/${category}/${directoryName}`);

const skillsCatalog = readJson(fromRoot("skills.sh.json"));
if (skillsCatalog !== undefined) {
  if (!Array.isArray(skillsCatalog.groupings)) {
    report("skills.sh.json: `groupings` must be an array.");
  } else {
    const groupings = skillsCatalog.groupings;
    compareOrdered(groupings.map((group) => group?.title), categoryDefinitions.map(({ name }) => titleFor(name)), "skills.sh.json: category ordering or names do not match AGENTS.md");
    const listed = [];
    for (let index = 0; index < categoryDefinitions.length; index += 1) {
      const definition = categoryDefinitions[index];
      const group = groupings[index];
      if (!group) continue;
      const expectedDescription = descriptionFor(definition.description);
      if (group.description !== expectedDescription) {
        report(`skills.sh.json: category \`${group.title ?? index}\` description must be \`${expectedDescription}\` to match AGENTS.md.`);
      }
      if (!Array.isArray(group.skills)) {
        report(`skills.sh.json: category \`${group.title ?? index}\` must contain a skills array.`);
        continue;
      }
      listed.push(...group.skills);
      compareMembership(group.skills, expectedByCategory.get(definition.name) ?? [], `skills.sh.json: ${definition.name} membership is incorrect`);
    }
    for (const duplicate of duplicates(listed)) report(`skills.sh.json: skill \`${duplicate}\` appears more than once.`);
    for (const missing of allExpectedNames.filter((name) => !listed.includes(name))) report(`skills.sh.json: missing published skill \`${missing}\`.`);
    for (const stale of listed.filter((name) => !allExpectedNames.includes(name))) report(`skills.sh.json: stale or unknown skill \`${stale}\`.`);
  }
}

const marketplace = readJson(fromRoot(".claude-plugin/marketplace.json"));
if (marketplace !== undefined) {
  if (!Array.isArray(marketplace.plugins)) {
    report(".claude-plugin/marketplace.json: `plugins` must be an array.");
  } else {
    const plugins = marketplace.plugins;
    compareOrdered(plugins.map((plugin) => plugin?.name), expectedCategoryNames, ".claude-plugin/marketplace.json: category ordering or names do not match AGENTS.md");
    const listed = [];
    for (let index = 0; index < categoryDefinitions.length; index += 1) {
      const definition = categoryDefinitions[index];
      const plugin = plugins[index];
      if (!plugin) continue;
      const skillsGrouping = skillsCatalog?.groupings?.[index];
      const expectedDescription = descriptionFor(definition.description);
      if (plugin.description !== expectedDescription) {
        report(`.claude-plugin/marketplace.json: category \`${plugin.name ?? index}\` description must be \`${expectedDescription}\` to match AGENTS.md.`);
      }
      if (!Array.isArray(plugin.skills)) {
        report(`.claude-plugin/marketplace.json: category \`${plugin.name ?? index}\` must contain a skills array.`);
        continue;
      }
      listed.push(...plugin.skills);
      const expectedPaths = (expectedByCategory.get(definition.name) ?? []).map((name) => `./skills/${definition.name}/${name}`);
      compareMembership(plugin.skills, expectedPaths, `.claude-plugin/marketplace.json: ${definition.name} membership is incorrect`);
      if (skillsGrouping?.skills && Array.isArray(skillsGrouping.skills)) {
        compareOrdered(
          plugin.skills,
          skillsGrouping.skills.map((name) => `./skills/${definition.name}/${name}`),
          `.claude-plugin/marketplace.json: ${definition.name} skill ordering does not match skills.sh.json`,
        );
      }
    }
    for (const path of listed) {
      if (typeof path !== "string" || !/^\.\/skills\/[^/]+\/[^/]+$/.test(path)) {
        report(`.claude-plugin/marketplace.json: skill path \`${String(path)}\` must use ./skills/<category>/<skill-name>.`);
      } else if (!existsSync(fromRoot(path))) {
        report(`.claude-plugin/marketplace.json: skill path \`${path}\` does not resolve to a directory.`);
      } else if (!statSync(fromRoot(path)).isDirectory()) {
        report(`.claude-plugin/marketplace.json: skill path \`${path}\` does not resolve to a directory.`);
      }
    }
    for (const duplicate of duplicates(listed)) report(`.claude-plugin/marketplace.json: skill path \`${duplicate}\` appears more than once.`);
    for (const missing of allExpectedPaths.filter((path) => !listed.includes(path))) report(`.claude-plugin/marketplace.json: missing published skill path \`${missing}\`.`);
    for (const stale of listed.filter((path) => !allExpectedPaths.includes(path))) report(`.claude-plugin/marketplace.json: stale or unknown skill path \`${stale}\`.`);
  }
}

const readmePath = fromRoot("README.md");
const readme = readText(readmePath) ?? "";
const linkedSkillPaths = new Set();
const referenceDefinitions = new Map(
  [...readme.matchAll(/^\s{0,3}\[([^\]]+)\]:\s*(?:<([^>]+)>|(\S+))/gm)]
    .map((match) => [match[1].trim().toLowerCase(), match[2] ?? match[3]]),
);
const referencedTargets = [...readme.matchAll(/!?\[([^\]]*)\]\[([^\]]*)\]/g)]
  .map((match) => referenceDefinitions.get((match[2] || match[1]).trim().toLowerCase()))
  .filter(Boolean);
for (const [identifier, target] of referenceDefinitions) {
  const escapedIdentifier = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`\\[${escapedIdentifier}\\](?![:(])`, "i").test(readme)) referencedTargets.push(target);
}
const readmeTargets = [
  ...[...readme.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1]),
  ...referencedTargets,
  ...[...readme.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]),
];
for (let target of new Set(readmeTargets)) {
  target = target.trim();
  if (target.startsWith("<")) {
    const closingBracket = target.indexOf(">");
    if (closingBracket >= 0) target = target.slice(1, closingBracket);
  } else {
    target = target.split(/\s+/, 1)[0];
  }
  if (/^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith("//")) continue;
  const pathPart = target.split("#", 1)[0].split("?", 1)[0];
  if (pathPart === "") continue;
  let decoded;
  try {
    decoded = decodeURIComponent(pathPart);
  } catch {
    report(`README.md: repository-relative link \`${target}\` contains invalid URL encoding.`);
    continue;
  }
  if (isAbsolute(decoded)) {
    report(`README.md: local link \`${target}\` must be repository-relative.`);
    continue;
  }
  const resolved = resolve(dirname(readmePath), decoded);
  const relativeTarget = relative(root, resolved);
  if (relativeTarget === ".." || relativeTarget.startsWith(`..${sep}`)) {
    report(`README.md: repository-relative link \`${target}\` points outside the repository.`);
  } else if (!existsSync(resolved)) {
    report(`README.md: repository-relative link \`${target}\` does not resolve.`);
  } else {
    linkedSkillPaths.add(relativeTarget.split(sep).join("/"));
  }
}
for (const { category, directoryName } of skills) {
  const expectedLink = `skills/${category}/${directoryName}/SKILL.md`;
  if (!linkedSkillPaths.has(expectedLink)) report(`README.md: missing a valid link to \`${expectedLink}\`.`);
}

if (checkSkillsCli) {
  const executable = process.platform === "win32" ? "npx.cmd" : "npx";
  const result = spawnSync(executable, ["--yes", "skills@latest", "add", ".", "--list"], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, CI: "1", NO_COLOR: "1", FORCE_COLOR: "0" },
    timeout: 120_000,
  });
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, "");
  if (result.error) {
    report(`skills CLI: could not run npx --yes skills@latest add . --list (${result.error.message}).`);
  } else if (result.status !== 0) {
    report(`skills CLI: listing command failed with exit code ${result.status}.\n${output.trim()}`);
  } else {
    const lines = output.split(/\r?\n/).map((line) => line.replace(/^[│◇◆●○◒◐◓◑└─\s]+/u, "").trimEnd());
    const categoryIndexes = [];
    for (const definition of categoryDefinitions) {
      const title = titleFor(definition.name);
      const indexes = lines.map((line, index) => line === title ? index : -1).filter((index) => index >= 0);
      if (indexes.length !== 1) {
        report(`skills CLI: expected category \`${title}\` exactly once, found ${indexes.length}.`);
      }
      categoryIndexes.push(indexes[0] ?? -1);
    }
    const validCategoryIndexes = categoryIndexes.filter((index) => index >= 0);
    if (validCategoryIndexes.some((index, position) => position > 0 && index <= validCategoryIndexes[position - 1])) {
      report("skills CLI: discovered categories are not in the order defined by AGENTS.md.");
    }
    for (let categoryIndex = 0; categoryIndex < categoryDefinitions.length; categoryIndex += 1) {
      const start = categoryIndexes[categoryIndex];
      if (start < 0) continue;
      const laterIndexes = categoryIndexes.slice(categoryIndex + 1).filter((index) => index >= 0);
      const end = laterIndexes.length > 0 ? Math.min(...laterIndexes) : lines.length;
      const block = lines.slice(start + 1, end);
      const expectedNames = expectedByCategory.get(categoryDefinitions[categoryIndex].name) ?? [];
      const discovered = expectedNames.filter((name) => block.includes(name));
      compareOrdered(discovered, expectedNames, `skills CLI: ${categoryDefinitions[categoryIndex].name} discovery is incomplete`);
    }
    const countMatch = output.match(/Found\s+(\d+)\s+skills?/i);
    if (!countMatch || Number(countMatch[1]) !== skills.length) {
      report(`skills CLI: expected it to report ${skills.length} discovered skills, but found ${countMatch?.[1] ?? "no count"}.`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Repository validation failed with ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  for (const [index, error] of errors.entries()) console.error(`\n${index + 1}. ${error}`);
  process.exit(1);
}

console.log(`Repository validation passed: ${skills.length} skills across ${categoryDefinitions.length} categories${checkSkillsCli ? ", including skills CLI discovery" : ""}.`);
