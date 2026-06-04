---
title: Cast
description: Roles relationship model between Character and Seiyuu resources.
---

`Cast` connects one `Character` and one `Seiyuu`.



## Model definition

### Relationship attributes

Relationship attributes describe the Cast link itself. Only stable endpoint keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `characterKey` | string | ✓ | Linked Character key. |
| `seiyuuKey` | string | ✓ | Linked Seiyuu key. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/casts` | List character/seiyuu relations. |
| `GET` | `/api/v1/casts/{key}` | Get one character/seiyuu relation by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### Cast `data` payload

```json
{
  "id": "cast_takamatsu_tomori_youmiya_hina",
  "key": "takamatsu_tomori_youmiya_hina",
  "characterKey": "takamatsu_tomori",
  "seiyuuKey": "youmiya_hina"
}
```

### Cast list response

```json
{
  "data": [
    {
      "id": "cast_takamatsu_tomori_youmiya_hina",
      "key": "takamatsu_tomori_youmiya_hina",
      "characterKey": "takamatsu_tomori",
      "seiyuuKey": "youmiya_hina"
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
