import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

const standardKeyRegistryPages = ["index", "planning/bang-dream"];

const coreModelSpecs = [
  { slug: "planning/franchise", fields: ["id", "key", "name"] },
  { slug: "planning/project", fields: ["id", "key", "name"] },
  { slug: "planning/group", fields: ["id", "key", "name"] },
  { slug: "planning/project-group", fields: ["id", "key", "projectKey", "groupKey"] },
  { slug: "roles/character", fields: ["id", "key", "name"] },
  { slug: "roles/character-project", fields: ["id", "key", "characterKey", "projectKey"] },
  { slug: "roles/character-group", fields: ["id", "key", "characterKey", "groupKey"] },
  { slug: "roles/agency", fields: ["id", "key", "name"] },
  { slug: "roles/seiyuu", fields: ["id", "key", "name"] },
  { slug: "roles/cast", fields: ["id", "key", "characterKey", "seiyuuKey"] },
  { slug: "music-discography/release", fields: ["id", "key", "name"] },
  { slug: "music-discography/song", fields: ["id", "key", "name"] },
  { slug: "music-discography/track", fields: ["id", "key", "releaseKey", "songKey"] },
  { slug: "events/event", fields: ["id", "key", "name"] },
  { slug: "events/event-session", fields: ["id", "key", "eventKey"] },
  { slug: "events/event-timeline", fields: ["id", "key", "eventKey"] },
  { slug: "events/session-setlist", fields: ["id", "key", "sessionKey", "songKey"] },
  { slug: "venues-facilities/venue", fields: ["id", "key", "name"] },
  { slug: "travel/transport", fields: ["id", "key", "name"] },
  { slug: "travel/airport", fields: ["id", "key", "name"] },
  { slug: "travel/station", fields: ["id", "key", "name"] },
];

const coreModelFiles = coreModelSpecs.flatMap(({ slug }) => [
  `../src/content/docs/en/core-models/${slug}.md`,
  `../src/content/docs/zh-cn/core-models/${slug}.md`,
]);

const requiredDocs = [
  "../src/content/docs/en/index.md",
  "../src/content/docs/en/api-reference.md",
  "../src/content/docs/en/data-license.md",
  "../src/content/docs/en/contributing.md",
  "../src/content/docs/en/funding.md",
  ...standardKeyRegistryPages.map((page) => `../src/content/docs/en/standard-key-registry/${page}.md`),
  "../src/content/docs/en/core-concepts/overview.md",
  "../src/content/docs/en/core-concepts/data-models-hierarchy.md",
  "../src/content/docs/en/common-specifications/base-fields.md",
  "../src/content/docs/en/common-specifications/response-envelope.md",
  ...coreModelFiles,
  "../src/content/docs/zh-cn/index.md",
  "../src/content/docs/zh-cn/api-reference.md",
  "../src/content/docs/zh-cn/core-concepts/overview.md",
  "../src/content/docs/zh-cn/core-concepts/data-models-hierarchy.md",
  "../src/content/docs/zh-cn/common-specifications/base-fields.md",
  "../src/content/docs/zh-cn/common-specifications/response-envelope.md",
  "../src/content/docs/zh-cn/getting-started.md",
  "../src/content/docs/zh-cn/authentication.md",
  "../src/content/docs/zh-cn/rate-limits.md",
  "../src/content/docs/zh-cn/data-license.md",
  "../src/content/docs/zh-cn/contributing.md",
  "../src/content/docs/zh-cn/funding.md",
  ...standardKeyRegistryPages.map((page) => `../src/content/docs/zh-cn/standard-key-registry/${page}.md`),
  "../src/content/docs/zh-cn/errors.md",
];

test("OpenAPI server uses the public API base", async () => {
  const spec = await readFile(new URL("../public/openapi/openapi.yaml", import.meta.url), "utf8");
  assert.match(spec, /url: https:\/\/open\.youmiya\.love/);
  assert.match(spec, /\/api\/v1\/healthz/);
});

test("examples use the public API base", async () => {
  const curl = await readFile(new URL("../examples/curl.sh", import.meta.url), "utf8");
  const client = await readFile(new URL("../examples/typescript/client.ts", import.meta.url), "utf8");
  assert.match(curl, /https:\/\/open\.youmiya\.love\/api\/v1/);
  assert.match(client, /https:\/\/open\.youmiya\.love/);
});

test("getting started documents main-site data source", async () => {
  const english = await readFile(new URL("../src/content/docs/en/getting-started.md", import.meta.url), "utf8");
  const chinese = await readFile(new URL("../src/content/docs/zh-cn/getting-started.md", import.meta.url), "utf8");
  assert.match(english, /main OpenYoumiya site/);
  assert.doesNotMatch(english, /maintained through Console|submit create and update requests|Pending submissions/);
  assert.match(chinese, /主站的结构化数据|来自主站 OpenYoumiya/);
  assert.doesNotMatch(chinese, /通过 Console 维护|提交创建和修改请求|pending/);
});

test("core docs document the main site as the data source", async () => {
  const files = [
    "../src/content/docs/en/core-concepts/overview.md",
    "../src/content/docs/en/index.md",
    "../src/content/docs/zh-cn/core-concepts/overview.md",
    "../src/content/docs/zh-cn/index.md",
  ];
  const contents = await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  for (const content of contents) {
    assert.match(content, /main OpenYoumiya site|主站 OpenYoumiya|OpenYoumiya主站/);
    assert.doesNotMatch(content, /maintained through Console|Console-maintained|maintained in Console|Console 中维护|Console 维护|唯一维护入口/);
  }
});

test("root and Chinese documentation pages exist", async () => {
  await Promise.all(requiredDocs.map((file) => access(new URL(file, import.meta.url))));
});

test("docs keep markdown tables readable", async () => {
  const config = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
  const css = await readFile(new URL("../src/styles/docs.css", import.meta.url), "utf8");
  assert.match(config, /customCss: \["\.\/src\/styles\/docs\.css"\]/);
  assert.match(config, /lastUpdated: true/);
  assert.match(config, /remarkCsvTables/);
  assert.match(css, /--oy-docs-toc-width: 13rem/);
  assert.match(css, /--sl-content-width: 70rem/);
  assert.match(css, /\.right-sidebar-container/);
  assert.match(css, /width: calc\(100% - var\(--oy-docs-toc-width\)\)/);
  assert.match(css, /overflow-x: auto/);
  assert.match(css, /white-space: nowrap/);
  assert.match(css, /width: max-content/);
  assert.doesNotMatch(css, /thead, tbody/);
});

test("csv fenced blocks render as HTML tables", async () => {
  const { default: remarkCsvTables } = await import("../src/plugins/remark-csv-tables.js");
  const tree = {
    type: "root",
    children: [
      {
        type: "code",
        lang: "csv",
        value: 'key,displayName,aliases\nidolmaster,THE IDOLM@STER,"IM@S, Idolmaster"',
      },
    ],
  };

  remarkCsvTables()(tree);

  assert.equal(tree.children[0].type, "html");
  assert.match(tree.children[0].value, /<table class="csv-table">/);
  assert.match(tree.children[0].value, /<th>key<\/th>/);
  assert.match(tree.children[0].value, /<td>idolmaster<\/td>/);
  assert.match(tree.children[0].value, /IM@S, Idolmaster/);
});

test("community and support docs use license, contribution, and sponsorship wording", async () => {
  const files = [
    "../src/content/docs/en/data-license.md",
    "../src/content/docs/en/contributing.md",
    "../src/content/docs/en/funding.md",
    "../src/content/docs/zh-cn/data-license.md",
    "../src/content/docs/zh-cn/contributing.md",
    "../src/content/docs/zh-cn/funding.md",
  ];
  const contents = await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  const joined = contents.join("\n");
  assert.match(joined, /CC BY 4\.0|Creative Commons Attribution 4\.0/);
  assert.match(joined, /Data provided by OpenYoumiya API \(https:\/\/open\.youmiya\.love\)/);
  assert.match(joined, /Data Source: \[OpenYoumiya API\]\(https:\/\/open\.youmiya\.love\)/);
  assert.match(joined, /Data Source: <a href="https:\/\/open\.youmiya\.love" target="_blank" rel="noopener noreferrer">OpenYoumiya API<\/a>/);
  assert.match(joined, /main OpenYoumiya site|主站 OpenYoumiya/);
  assert.doesNotMatch(joined, /create and update requests|创建和修改请求|Pending submissions|pending 提交/);
  assert.match(joined, /GitHub Issues/);
  assert.match(joined, /GitHub Discussions/);
  assert.match(joined, /mailto:hina@youmiya\.love/);
  assert.doesNotMatch(joined, /your-username|your-repo/);
  assert.match(joined, /Afdian|爱发电/);
  assert.match(joined, /https:\/\/ifdian\.net\/a\/OpenYoumiya/);
  assert.doesNotMatch(joined, /GitHub Sponsors/);
  assert.match(joined, /free within documented rate limits|频次限制内免费使用/);
  assert.doesNotMatch(joined, /paid tier|commercial tier|enterprise|收费|商业套餐|企业套餐/);
});

test("mixed-case Chinese docs path redirects to generated locale path", async () => {
  const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");
  const rootPage = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
  assert.match(redirects, /^\/\s+\/zh-cn\/\s+301/m);
  assert.match(redirects, /\/getting-started\s+\/en\/getting-started\s+301/);
  assert.match(redirects, /\/standard-key-registry\/\*\s+\/en\/standard-key-registry\/:splat\s+301/);
  assert.match(redirects, /\/zh-CN\s+\/zh-cn\s+301/);
  assert.match(redirects, /\/zh-CN\/\*\s+\/zh-cn\/:splat\s+301/);
  assert.match(rootPage, /const target = "\/zh-cn\/"/);
  assert.match(rootPage, /window\.location\.replace\("\/zh-cn\/"\)/);
});

test("docs header links to console", async () => {
  const config = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
  const headerLinks = await readFile(new URL("../src/components/HeaderLinks.astro", import.meta.url), "utf8");
  assert.match(config, /HeaderLinks\.astro/);
  assert.match(headerLinks, /https:\/\/youmiya\.love/);
  assert.match(headerLinks, /https:\/\/console\.youmiya\.love/);
});

test("readmes summarize documentation map and support channels", async () => {
  const english = await readFile(new URL("../README.md", import.meta.url), "utf8");
  const chinese = await readFile(new URL("../README.zh-CN.md", import.meta.url), "utf8");
  const joined = `${english}\n${chinese}`;
  assert.match(joined, /Documentation Map|文档结构/);
  assert.match(joined, /Documentation Roadmap|文档 Roadmap/);
  assert.match(joined, /Community and support|社区与支持/);
  assert.match(joined, /https:\/\/ifdian\.net\/a\/OpenYoumiya/);
  assert.match(joined, /mailto:hina@youmiya\.love/);
  assert.doesNotMatch(joined, /GitHub Sponsors/);
});

test("new documentation structure is linked in sidebar", async () => {
  const config = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
  assert.match(config, /Core Concepts/);
  assert.match(config, /Common Specifications/);
  assert.match(config, /Standard Key Registry/);
  assert.match(config, /Core Models/);
  assert.match(config, /Community & Support/);
  assert.match(config, /core-concepts\/overview/);
  assert.match(config, /core-concepts\/data-models-hierarchy/);
  assert.match(config, /common-specifications\/base-fields/);
  assert.match(config, /common-specifications\/response-envelope/);
  assert.match(config, /standard-key-registry/);
  for (const { slug } of coreModelSpecs) {
    assert.match(config, new RegExp(`core-models/${slug}`));
  }
  assert.match(config, /standard-key-registry\/planning\/bang-dream/);
  assert.doesNotMatch(config, /standard-key-registry\/idolmaster/);
  assert.doesNotMatch(config, /standard-key-registry\/lovelive/);
  assert.doesNotMatch(config, /standard-key-registry\/project-sekai/);
  assert.doesNotMatch(config, /field-naming/);
  assert.doesNotMatch(config, /data-source/);
});

test("standard key registry defines Planning keys as a standalone section", async () => {
  const config = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
  const englishContents = await Promise.all(
    standardKeyRegistryPages.map((page) =>
      readFile(new URL(`../src/content/docs/en/standard-key-registry/${page}.md`, import.meta.url), "utf8"),
    ),
  );
  const chineseContents = await Promise.all(
    standardKeyRegistryPages.map((page) =>
      readFile(new URL(`../src/content/docs/zh-cn/standard-key-registry/${page}.md`, import.meta.url), "utf8"),
    ),
  );
  const english = englishContents.join("\n");
  const chinese = chineseContents.join("\n");
  assert.match(config, /label: "Standard Key Registry"/);
  assert.match(config, /slug: "standard-key-registry"/);
  assert.match(english, /title: Standard Key Registry/);
  assert.match(chinese, /title: 标准 Key 注册表/);
  assert.match(english, /canonical registry data is maintained in the Chinese documentation/);
  assert.doesNotMatch(english, /```csv/);
  assert.doesNotMatch(english, /bang_dream|bandori|our_notes|mygo|ave_mujica/);

  assert.match(chinese, /Project <- \[ProjectGroup\] -> Group/);
  assert.match(chinese, /franchiseKey/);
  assert.match(chinese, /projectKey/);
  assert.match(chinese, /groupKey/);
  assert.doesNotMatch(chinese, /ProjectGroup relations/);
  assert.match(chinese, /```csv/);
  assert.match(chinese, /bang_dream/);
  assert.match(chinese, /bandori/);
  assert.match(chinese, /our_notes/);
  assert.match(chinese, /mygo/);
  assert.match(chinese, /ave_mujica/);
  assert.doesNotMatch(chinese, /idolmaster|love_live|project_sekai|million_live|shiny_colors|muse|aqours|leo_need/);
  assert.doesNotMatch(
    chinese,
    /^groupKey,displayName,projectKey$|^groupKey,展示名称,projectKey$|^projectKey,groupKey$|^projectKey,groupKey,name$|on_mygo/m,
  );
  assert.doesNotMatch(chinese, /^\|/m);
  assert.doesNotMatch(chinese, /planned|计划中|待定|franchiseId|projectId|groupId/);
});

test("model hierarchy avoids public IP resource naming and documents relationships", async () => {
  const english = await readFile(new URL("../src/content/docs/en/core-concepts/data-models-hierarchy.md", import.meta.url), "utf8");
  const chinese = await readFile(new URL("../src/content/docs/zh-cn/core-concepts/data-models-hierarchy.md", import.meta.url), "utf8");
  for (const content of [english, chinese]) {
    assert.match(content, /Franchise/);
    assert.match(content, /ProjectGroup/);
    assert.match(content, /CharacterProject/);
    assert.match(content, /CharacterGroup/);
    assert.match(content, /Cast/);
    assert.doesNotMatch(content, /\bIP\b/);
  }
});

test("core model docs use minimal supported fields", async () => {
  const oldFieldNames = [
    "displayName",
    "aliases",
    "status",
    "sortOrder",
    "createdAt",
    "updatedAt",
    "slug",
    "eventType",
    "itemKey",
    "startsAt",
    "endsAt",
    "utcOffset",
    "profileImageUrl",
    "officialUrl",
  ];

  for (const spec of coreModelSpecs) {
    const english = await readFile(new URL(`../src/content/docs/en/core-models/${spec.slug}.md`, import.meta.url), "utf8");
    const chinese = await readFile(new URL(`../src/content/docs/zh-cn/core-models/${spec.slug}.md`, import.meta.url), "utf8");
    for (const [content, locale] of [
      [english, "en"],
      [chinese, "zh"],
    ]) {
      const rows = fieldRows(content);
      assert.deepEqual(rows.map((row) => row.name), spec.fields, spec.slug);
      assert.ok(rows.every((row) => row.supported === "✓"), spec.slug);
      assert.ok(rows.every((row) => row.type === "string"), spec.slug);
      assert.match(content, locale === "en" ? /Supported/ : /supported/);
      assert.match(content, new RegExp(`${modelNameFromSlug(spec.slug)} \`data\` payload`));
      assert.match(content, /```json/);
      for (const oldFieldName of oldFieldNames) {
        assert.doesNotMatch(content, new RegExp(`\\\\| \\\`${oldFieldName}\\\\\`|\"${oldFieldName}\"`), `${spec.slug} still documents ${oldFieldName}`);
      }
    }
  }
});

test("core model docs keep relationship keys only on relationship models", async () => {
  const relationshipFieldNames = new Set([
    "projectKey",
    "groupKey",
    "characterKey",
    "seiyuuKey",
    "releaseKey",
    "songKey",
    "eventKey",
    "sessionKey",
  ]);
  for (const spec of coreModelSpecs) {
    const english = await readFile(new URL(`../src/content/docs/en/core-models/${spec.slug}.md`, import.meta.url), "utf8");
    const rows = fieldRows(english);
    const hasRelationFields = rows.some((row) => relationshipFieldNames.has(row.name));
    const isRelationship = spec.fields.some((field) => relationshipFieldNames.has(field));
    assert.equal(hasRelationFields, isRelationship, spec.slug);
  }
});

test("public field docs do not describe legacy compatibility fields", async () => {
  const contents = await Promise.all(coreModelFiles.map((file) => readFile(new URL(file, import.meta.url), "utf8")));
  for (const content of contents) {
    assert.doesNotMatch(content, /Legacy|legacy|兼容|旧字段|venueName|venueArea|performerName/);
    assert.doesNotMatch(content, /franchiseId|projectId|groupId|characterId|seiyuuId|agencyId/);
  }
});

function fieldRows(markdown) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("| `"))
    .map((line) => {
      const [name, type, supported, description] = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim().replace(/^`|`$/g, ""));
      return { name, type, supported, description };
    })
    .filter((row) => row.type === "string");
}

function modelNameFromSlug(slug) {
  const basename = slug.split("/").at(-1);
  const names = {
    "project-group": "ProjectGroup",
    "character-project": "CharacterProject",
    "character-group": "CharacterGroup",
    "event-session": "EventSession",
    "event-timeline": "EventTimelineItem",
    "session-setlist": "SessionSetlist",
  };
  return names[basename] ?? `${basename[0].toUpperCase()}${basename.slice(1)}`;
}
