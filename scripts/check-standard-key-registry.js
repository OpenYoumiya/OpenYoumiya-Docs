import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const registryDir = join(rootDir, "src/content/docs/zh-cn/standard-key-registry");
const keyPattern = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;

const tableSpecs = new Map([
  ["franchise keys", { name: "franchises", key: "key", header: ["key", "name"] }],
  ["project keys", { name: "projects", key: "key", header: ["key", "name"] }],
  ["group keys", { name: "groups", key: "key", header: ["key", "name"] }],
  ["projectgroup keys", { name: "projectGroups", key: "key", header: ["key", "project_key", "group_key"] }],
]);

const errors = [];
const pages = await markdownFiles(registryDir);

for (const file of pages) {
  const content = await readFile(file, "utf8");
  const tables = csvTables(content, file);
  if (tables.length === 0) continue;

  validatePage(file, tables);
}

if (errors.length > 0) {
  console.error("Standard key registry validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Standard key registry validation passed (${pages.length} markdown files scanned).`);
}

async function markdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await markdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function csvTables(content, file) {
  const tables = [];
  const fencePattern = /```csv\n([\s\S]*?)```/g;
  let match;

  while ((match = fencePattern.exec(content)) !== null) {
    const rows = parseCsv(match[1]);
    if (rows.length === 0) continue;

    const heading = precedingHeading(content, match.index);
    const spec = tableSpecs.get(heading.toLowerCase());
    const location = `${relative(rootDir, file)}:${lineNumber(content, match.index)}`;

    if (!spec) {
      errors.push(`${location} is under unsupported registry heading "${heading}"`);
      continue;
    }

    const header = rows[0];
    if (header.join(",") !== spec.header.join(",")) {
      errors.push(`${location} has header "${header.join(",")}", expected "${spec.header.join(",")}"`);
      continue;
    }

    tables.push({ location, rows, spec });
  }

  return tables;
}

function validatePage(file, tables) {
  const fileName = relative(rootDir, file);
  const byName = new Map(tables.map((table) => [table.spec.name, table]));

  for (const table of tables) {
    validateRows(table);
  }

  const projects = keySet(byName.get("projects"));
  const groups = keySet(byName.get("groups"));
  const projectGroups = byName.get("projectGroups");
  if (!projectGroups) return;

  if (!byName.has("projects")) {
    errors.push(`${fileName} has projectGroups but no projects table`);
  }
  if (!byName.has("groups")) {
    errors.push(`${fileName} has projectGroups but no groups table`);
  }

  for (const row of dataRows(projectGroups)) {
    const projectKey = row.get("project_key");
    const groupKey = row.get("group_key");
    if (projects.size > 0 && !projects.has(projectKey)) {
      errors.push(`${row.location} references missing project_key "${projectKey}"`);
    }
    if (groups.size > 0 && !groups.has(groupKey)) {
      errors.push(`${row.location} references missing group_key "${groupKey}"`);
    }
  }
}

function validateRows(table) {
  const seen = new Map();
  const header = table.rows[0];

  for (const row of dataRows(table)) {
    if (row.cells.length !== header.length) {
      errors.push(`${row.location} has ${row.cells.length} columns, expected ${header.length}`);
      continue;
    }

    for (const [index, value] of row.cells.entries()) {
      if (!value) {
        errors.push(`${row.location} has empty required field "${header[index]}"`);
      }
    }

    const key = row.get(table.spec.key);
    if (key && !keyPattern.test(key)) {
      errors.push(`${row.location} has invalid key "${key}"`);
    }
    if (key && seen.has(key)) {
      errors.push(`${row.location} duplicates key "${key}" first seen at ${seen.get(key)}`);
    } else if (key) {
      seen.set(key, row.location);
    }
  }
}

function keySet(table) {
  if (!table) return new Set();
  return new Set(dataRows(table).map((row) => row.get(table.spec.key)).filter(Boolean));
}

function dataRows(table) {
  const header = table.rows[0];
  return table.rows.slice(1).map((cells, index) => ({
    cells,
    location: `${table.location}+${index + 1}`,
    get(name) {
      return cells[header.indexOf(name)] ?? "";
    },
  }));
}

function precedingHeading(content, index) {
  const before = content.slice(0, index);
  const headings = [...before.matchAll(/^##\s+(.+)$/gm)];
  return headings.at(-1)?.[1]?.trim() ?? "";
}

function parseCsv(value) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    const next = value[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  row.push(field);
  rows.push(row);

  return rows
    .map((cells) => cells.map((cell) => cell.trim()))
    .filter((cells) => cells.some((cell) => cell.length > 0));
}

function lineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}
