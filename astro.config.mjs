import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import logo from "./src/assets/OpenYoumiya.png";
import remarkCsvTables from "./src/plugins/remark-csv-tables.js";

export default defineConfig({
  site: "https://docs.youmiya.love",
  markdown: {
    remarkPlugins: [remarkCsvTables],
  },
  integrations: [
    starlight({
      title: "OpenYoumiya Docs",
      logo: {
        src: logo,
        alt: "OpenYoumiya",
        replacesTitle: true,
      },
      components: {
        SocialIcons: "./src/components/HeaderLinks.astro",
      },
      customCss: ["./src/styles/docs.css"],
      lastUpdated: true,
      locales: {
        en: { label: "English", lang: "en" },
        "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      defaultLocale: "en",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/OpenYoumiya/OpenYoumiya-Docs",
        },
      ],
      sidebar: [
        {
          label: "Start",
          translations: { "zh-CN": "开始" },
          items: [
            { label: "Home", slug: "index", translations: { "zh-CN": "首页" } },
            {
              label: "Getting Started",
              slug: "getting-started",
              translations: { "zh-CN": "快速开始" },
            },
            {
              label: "Authentication",
              slug: "authentication",
              translations: { "zh-CN": "认证" },
            },
            {
              label: "Rate Limits",
              slug: "rate-limits",
              translations: { "zh-CN": "频次限制" },
            },
            { label: "Errors", slug: "errors", translations: { "zh-CN": "错误" } },
          ],
        },
        {
          label: "Core Concepts",
          translations: { "zh-CN": "核心概念" },
          items: [
            { label: "Overview", slug: "core-concepts/overview", translations: { "zh-CN": "概览" } },
            {
              label: "Data Models & Hierarchy",
              slug: "core-concepts/data-models-hierarchy",
              translations: { "zh-CN": "数据模型与层级" },
            },
          ],
        },
        {
          label: "Common Specifications",
          translations: { "zh-CN": "通用规范" },
          items: [
            {
              label: "Base Fields",
              slug: "common-specifications/base-fields",
              translations: { "zh-CN": "基础字段" },
            },
            {
              label: "Response Envelope",
              slug: "common-specifications/response-envelope",
              translations: { "zh-CN": "响应结构" },
            },
          ],
        },
        {
          label: "Core Models",
          translations: { "zh-CN": "核心模型定义" },
          items: [
            {
              label: "Planning",
              translations: { "zh-CN": "企划" },
              items: [
                {
                  label: "Franchise",
                  slug: "core-models/planning/franchise",
                  translations: { "zh-CN": "Franchise" },
                },
                {
                  label: "Project",
                  slug: "core-models/planning/project",
                  translations: { "zh-CN": "Project" },
                },
                { label: "Group", slug: "core-models/planning/group", translations: { "zh-CN": "Group" } },
                {
                  label: "ProjectGroup",
                  slug: "core-models/planning/project-group",
                  translations: { "zh-CN": "ProjectGroup" },
                },
              ],
            },
            {
              label: "Roles",
              translations: { "zh-CN": "角色" },
              items: [
                {
                  label: "Character",
                  slug: "core-models/roles/character",
                  translations: { "zh-CN": "Character" },
                },
                {
                  label: "CharacterProject",
                  slug: "core-models/roles/character-project",
                  translations: { "zh-CN": "CharacterProject" },
                },
                {
                  label: "CharacterGroup",
                  slug: "core-models/roles/character-group",
                  translations: { "zh-CN": "CharacterGroup" },
                },
                { label: "Agency", slug: "core-models/roles/agency", translations: { "zh-CN": "Agency" } },
                { label: "Seiyuu", slug: "core-models/roles/seiyuu", translations: { "zh-CN": "Seiyuu" } },
                { label: "Cast", slug: "core-models/roles/cast", translations: { "zh-CN": "Cast" } },
              ],
            },
            {
              label: "Music & Discography",
              translations: { "zh-CN": "音乐与唱片" },
              items: [
                {
                  label: "Release",
                  slug: "core-models/music-discography/release",
                  translations: { "zh-CN": "Release" },
                },
                {
                  label: "Song",
                  slug: "core-models/music-discography/song",
                  translations: { "zh-CN": "Song" },
                },
                {
                  label: "Track",
                  slug: "core-models/music-discography/track",
                  translations: { "zh-CN": "Track" },
                },
              ],
            },
            {
              label: "Events",
              translations: { "zh-CN": "活动" },
              items: [
                { label: "Event", slug: "core-models/events/event", translations: { "zh-CN": "Event" } },
                {
                  label: "Event Session",
                  slug: "core-models/events/event-session",
                  translations: { "zh-CN": "Event Session" },
                },
                {
                  label: "Event Timeline",
                  slug: "core-models/events/event-timeline",
                  translations: { "zh-CN": "Event Timeline" },
                },
                {
                  label: "Session Setlist",
                  slug: "core-models/events/session-setlist",
                  translations: { "zh-CN": "Session Setlist" },
                },
              ],
            },
            {
              label: "Venues & Facilities",
              translations: { "zh-CN": "场馆与设施" },
              items: [
                {
                  label: "Venue",
                  slug: "core-models/venues-facilities/venue",
                  translations: { "zh-CN": "Venue" },
                },
              ],
            },
            {
              label: "Travel",
              translations: { "zh-CN": "远征" },
              items: [
                {
                  label: "Transport",
                  slug: "core-models/travel/transport",
                  translations: { "zh-CN": "Transport" },
                },
                { label: "Airport", slug: "core-models/travel/airport", translations: { "zh-CN": "Airport" } },
                { label: "Station", slug: "core-models/travel/station", translations: { "zh-CN": "Station" } },
              ],
            },
          ],
        },
        {
          label: "Standard Key Registry",
          translations: { "zh-CN": "标准 Key 注册表" },
          items: [
            {
              label: "Overview",
              slug: "standard-key-registry",
              translations: { "zh-CN": "总览" },
            },
            {
              label: "Planning",
              translations: { "zh-CN": "企划" },
              items: [
                {
                  label: "BanG Dream!",
                  slug: "standard-key-registry/planning/bang-dream",
                  translations: { "zh-CN": "BanG Dream!" },
                },
              ],
            },
          ],
        },
        {
          label: "Community & Support",
          translations: { "zh-CN": "社区与支持" },
          items: [
            {
              label: "Data License",
              slug: "data-license",
              translations: { "zh-CN": "数据使用协议" },
            },
            {
              label: "Contributing",
              slug: "contributing",
              translations: { "zh-CN": "贡献指南" },
            },
            {
              label: "Funding",
              slug: "funding",
              translations: { "zh-CN": "资金支持" },
            },
          ],
        },
      ],
    }),
  ],
});
