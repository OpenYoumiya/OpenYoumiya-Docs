---
title: CharacterProject
description: Roles relationship model between Character and Project resources.
---

`CharacterProject` connects one `Character` and one `Project`.



## Model definition

### Relationship attributes

Relationship attributes describe the CharacterProject link itself. Only stable endpoint keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `characterKey` | string | ✓ | Linked Character key. |
| `projectKey` | string | ✓ | Linked Project key. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/character-projects` | List character/project relations. |
| `GET` | `/api/v1/character-projects/{key}` | Get one character/project relation by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### CharacterProject `data` payload

```json
{
  "id": "character_project_takamatsu_tomori_bandori",
  "key": "takamatsu_tomori_bandori",
  "characterKey": "takamatsu_tomori",
  "projectKey": "bandori"
}
```

### CharacterProject list response

```json
{
  "data": [
    {
      "id": "character_project_takamatsu_tomori_bandori",
      "key": "takamatsu_tomori_bandori",
      "characterKey": "takamatsu_tomori",
      "projectKey": "bandori"
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
