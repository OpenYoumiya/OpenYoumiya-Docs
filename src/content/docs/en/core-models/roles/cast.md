---
title: Cast
description: Roles cast relationship fields between Character and Seiyuu resources.
---

`Cast` connects one virtual `Character` and one `Seiyuu`. Only `characters.kind = "virtual"` characters can have Cast records; `kind = "real"` people do not expand into seiyuu nodes through Cast.

## Model definition

### Relationship attributes

Relationship attributes describe the Cast link itself, including seiyuu generation and current status.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `characterKey` | string | ✓ | Linked Character key. |
| `seiyuuKey` | string | ✓ | Linked Seiyuu key. |
| `generation` | number | ✓ | Seiyuu generation under the character. `1` means first generation, `2` means second generation. |
| `displayOrder` | number | ✓ | Display order under the same character. Lower values appear first. |
| `isCurrent` | boolean | ✓ | Whether this seiyuu is the current cast. Historical seiyuus can remain public with `false`. |
| `displayName` | string | ✓ | Cast relationship label. Empty string means clients may derive a label from `generation`. |

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
  "seiyuuKey": "youmiya_hina",
  "generation": 1,
  "displayOrder": 10,
  "isCurrent": true,
  "displayName": ""
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
      "seiyuuKey": "youmiya_hina",
      "generation": 1,
      "displayOrder": 10,
      "isCurrent": true,
      "displayName": ""
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
