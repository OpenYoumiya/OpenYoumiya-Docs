---
title: Seiyuu
description: Roles seiyuu model with minimal public fields.
---

`Seiyuu` is the performer person entity.

Connections to Agency and Character are represented through relationship data outside the Seiyuu core fields.



## Model definition

### Core attributes

Core attributes describe the Seiyuu itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |
| `agencyKey` | string | ✓ | Linked agency key. Empty string means no agency reference is available. |
| `careerStatus` | string | ✓ | Career activity status: `active`, `retired`, `hiatus`, or `unknown`. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/seiyuus` | List seiyuus. |
| `GET` | `/api/v1/seiyuus/{key}` | Get one seiyuu by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### Seiyuu `data` payload

```json
{
  "id": "seiyuu:youmiya_hina",
  "key": "youmiya_hina",
  "name": "羊宮妃那",
  "agencyKey": "aoni_pro",
  "careerStatus": "active"
}
```

### Seiyuu list response

```json
{
  "data": [
    {
      "id": "seiyuu:youmiya_hina",
      "key": "youmiya_hina",
      "name": "羊宮妃那",
      "agencyKey": "aoni_pro",
      "careerStatus": "active"
    }
  ],
  "meta": {
    "limit": 100,
    "cursor": "",
    "nextCursor": "",
    "hasMore": false
  }
}
```
