---
title: Airport
description: Travel airport model with minimal public fields.
---

`Airport` is an airport resource used by travel data.



## Model definition

### Core attributes

Core attributes describe the Airport itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Airport` `data` payload shape.

### Airport `data` payload

```json
{
  "id": "airport_haneda",
  "key": "haneda",
  "name": "Haneda Airport"
}
```
