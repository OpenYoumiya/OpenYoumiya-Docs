---
title: Project
description: Planning project model with minimal public fields.
---

`Project` is a distinct franchise branch, product line, or fictional world.

Franchise relationship data and expanded fields can be added after the public contract is stable.

The common [resource JSON semantics](../../../common-specifications/response-envelope/#resource-json-semantics) define full-field responses, zero-value placeholders, and weak references for API resource objects.

## Model definition

### Core attributes

Core attributes describe the Project itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/openapi/v1/projects` | List projects. |
| `GET` | `/openapi/v1/projects/{key}` | Get one project by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### Project `data` payload

```json
{
  "id": "project_bandori",
  "key": "bandori",
  "name": "BanG Dream! Girls Band Party!"
}
```

### Project list response

```json
{
  "data": [
    {
      "id": "project_bandori",
      "key": "bandori",
      "name": "BanG Dream! Girls Band Party!"
    }
  ],
  "meta": {
    "limit": 100,
    "cursor": "",
    "nextCursor": null,
    "hasMore": false
  }
}
```
