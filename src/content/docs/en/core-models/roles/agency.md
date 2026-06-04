---
title: Agency
description: Roles agency model with minimal public fields.
---

`Agency` is a seiyuu management agency, office, or organization resource.



## Model definition

### Core attributes

Core attributes describe the Agency itself. Only globally stable fields are documented in this first pass.

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
| `GET` | `/api/v1/agencies` | List agencies. |
| `GET` | `/api/v1/agencies/{key}` | Get one agency by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### Agency `data` payload

```json
{
  "id": "agency_aoni_production",
  "key": "aoni_production",
  "name": "青二プロダクション"
}
```

### Agency list response

```json
{
  "data": [
    {
      "id": "agency_aoni_production",
      "key": "aoni_production",
      "name": "青二プロダクション"
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
