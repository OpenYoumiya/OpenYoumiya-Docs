---
title: Transport
description: Travel transport model with minimal public fields.
---

`Transport` is a route-oriented travel or transport resource.



## Model definition

### Core attributes

Core attributes describe the Transport itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Transport` `data` payload shape.

### Transport `data` payload

```json
{
  "id": "transport_yurikamome",
  "key": "yurikamome",
  "name": "Yurikamome"
}
```
