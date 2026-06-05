# OpenYoumiya Docs

[中文](./README.zh-CN.md)

OpenYoumiya Docs is the public documentation site for OpenYoumiya API.

Connect passion with technology, so fan projects are no longer limited by data.

OpenYoumiya API provides stable, structured access to public data from the [main OpenYoumiya site](https://youmiya.love) for developers building fan sites, event tools, seiyuu and character databases, analytics projects, and support utilities.

You no longer need to start from fragile crawlers, inconsistent data formats, or repeated low-level plumbing. The platform handles public data synchronization, unified field conventions, API token authentication, usage visibility, service stability protections, and highly available delivery so developers can focus on creative tools, research, visualization, and fan-made experiences.

Our goal is simple: make reliable public data available to everyone who loves this community, and let better tools grow on top of a shared foundation.

- Main site: [https://youmiya.love](https://youmiya.love)
- Documentation site: [https://docs.youmiya.love](https://docs.youmiya.love)
- API base: [https://open.youmiya.love](https://open.youmiya.love)
- Console: [https://console.youmiya.love](https://console.youmiya.love)
- Data license: CC BY 4.0
- Funding: [Afdian](https://ifdian.net/a/OpenYoumiya)
- Contact: [hina@youmiya.love](mailto:hina@youmiya.love)

## What You Can Build

- Event timelines, schedules, and reminder tools.
- Seiyuu, cast, character, group, project, and franchise databases.
- Data analysis, ranking, visualization, and archive projects.
- Fan-site integrations and lightweight widgets.
- Creative support tools that need stable public metadata.

## API Contract

- Data source: public data is synchronized from the main OpenYoumiya site into the open platform data layer.
- Authentication: public data endpoints require an API token from Console and the `Authorization: Bearer <OPENYOUMIYA_API_TOKEN>` header.
- Response envelope: successful responses use `data` and optional `meta`; error responses return an `error` object at the root.
- Usage visibility: Console shows API token usage so developers can understand integration activity.
- Service stability: clients should cache stable data and avoid abusive polling or concurrency that can harm shared availability.
- Data license: public data is licensed under CC BY 4.0 unless otherwise stated, and published integrations should provide attribution.

## Documentation Map

- Start: home, getting started, authentication, API reference, and errors.
- Core concepts: overview and data model hierarchy.
- Common specifications: base fields and response envelope.
- Core models: planning, roles, music and discography, events, venues, and travel.
- Community and support: data license, contributing, and funding.

## Start Here

1. Read the docs at [https://docs.youmiya.love](https://docs.youmiya.love).
2. Create an API token in the [Console](https://console.youmiya.love).
3. Call the API base at [https://open.youmiya.love](https://open.youmiya.love) with your Bearer token.
4. Use the data model hierarchy and standard key registry as the protocol dictionary for resource keys.
5. Review the data license, contribution flow, and funding page before publishing an integration.

```http
Authorization: Bearer <OPENYOUMIYA_API_TOKEN>
```

## Standard Key Registry Changes

Changes to the standard key registry must be submitted through a pull request. Edit the relevant registry file and include enough context for review:

- English registry index: `src/content/docs/en/standard-key-registry/index.md`
- Chinese registry index: `src/content/docs/zh-cn/standard-key-registry/index.md`
- Planning examples: `src/content/docs/en/standard-key-registry/planning/bang-dream.md` and `src/content/docs/zh-cn/standard-key-registry/planning/bang-dream.md`

## Documentation Roadmap

The current docs define the platform shape, stable model vocabulary, common response envelope, authentication model, service stability guidance, and community usage rules. The next useful additions are:

- Endpoint-level API reference for public routes, query parameters, and response examples.
- Cache, freshness, and versioning rules for clients that mirror or store API data.
- Source and review guidelines for data synchronized from the main OpenYoumiya site.
- More copyable examples for TypeScript, curl, and static-site integrations.
- Changelog and migration notes for future API contract changes.

## Commands

Install dependencies:

```bash
npm install
```

Run the docs site locally:

```bash
npm run dev
```

Run static checks:

```bash
npm test
```

Build the production site:

```bash
npm run build
```

The build output is:

```bash
dist
```

## Deployment

Deploy this project with Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `docs.youmiya.love`

## Debugging

Run Astro in development mode and open the printed local URL:

```bash
npm run dev
```

If a document route or generated reference is missing, first run:

```bash
npm test
npm run build
```
