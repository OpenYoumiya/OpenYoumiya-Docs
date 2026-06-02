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

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Cast` `data` payload shape.

### Cast `data` payload

```json
{
  "id": "cast_takamatsu_tomori_youmiya_hina",
  "key": "takamatsu_tomori_youmiya_hina",
  "characterKey": "takamatsu_tomori",
  "seiyuuKey": "youmiya_hina"
}
```
