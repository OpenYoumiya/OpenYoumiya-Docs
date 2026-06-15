---
title: CharacterGroup
description: Roles relationship model between Character and Group resources.
---

`CharacterGroup` connects one `Character` and one `Group`.



## Model definition

### Relationship attributes

Relationship attributes describe the CharacterGroup link itself. Only stable endpoint keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `characterKey` | string | ✓ | Linked Character key. |
| `groupKey` | string | ✓ | Linked Group key. |
| `displayName` | string | ✓ | Character display name within this Group. Empty string means use the Character name. |
| `displayOrder` | number | ✓ | Character display order within the same Group. Lower values appear first. Returns `0` when not configured. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/character-groups` | List character/group relations. |
| `GET` | `/api/v1/character-groups/{key}` | Get one character/group relation by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### CharacterGroup `data` payload

```json
{
  "id": "character_group_takamatsu_tomori_mygo",
  "key": "takamatsu_tomori_mygo",
  "characterKey": "takamatsu_tomori",
  "groupKey": "mygo",
  "displayName": "",
  "displayOrder": 0
}
```

### CharacterGroup list response

```json
{
  "data": [
    {
      "id": "character_group_takamatsu_tomori_mygo",
      "key": "takamatsu_tomori_mygo",
      "characterKey": "takamatsu_tomori",
      "groupKey": "mygo",
      "displayName": "",
      "displayOrder": 0
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
