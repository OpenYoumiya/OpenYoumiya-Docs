---
title: Group
description: Planning group public fields.
---

`Group` is a unit, team, band, or group resource.

Group membership in Project is represented by `ProjectGroup`, not by a single field on Group.



## Model definition

### Core attributes

Core attributes describe the Group itself. The Core API returns database fields only; it does not return logo or other media objects.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |
| `imageColor` | string | ✓ | Group image color in `#RRGGBB` format. |

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/groups` | List groups. |
| `GET` | `/api/v1/groups/{key}` | Get one group by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### Group `data` payload

```json
{
  "id": "group_mygo",
  "key": "mygo",
  "name": "MyGO!!!!!",
  "imageColor": "#3388BB"
}
```

### Group list response

```json
{
  "data": [
    {
      "id": "group_mygo",
      "key": "mygo",
      "name": "MyGO!!!!!",
      "imageColor": "#3388BB"
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
