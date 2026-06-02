---
title: Character
description: Roles character model with minimal public fields.
---

`Character` is an in-universe character entity.

Connections to Project and Group are represented by `CharacterProject` and `CharacterGroup` relationship resources.



## Model definition

### Core attributes

Core attributes describe the Character itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Character` `data` payload shape.

### Character `data` payload

```json
{
  "id": "character_takamatsu_tomori",
  "key": "takamatsu_tomori",
  "name": "高松燈"
}
```
