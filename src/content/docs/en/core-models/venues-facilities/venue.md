---
title: Venue
description: Venue model with minimal public fields.
---

`Venue` is a physical venue or facility resource.

The common [resource JSON semantics](../../../common-specifications/response-envelope/#resource-json-semantics) define full-field responses, zero-value placeholders, and weak references for API resource objects.

## Model definition

### Core attributes

Core attributes describe the Venue itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Venue` `data` payload shape.

### Venue `data` payload

```json
{
  "id": "venue_tokyo_garden_theater",
  "key": "tokyo_garden_theater",
  "name": "Tokyo Garden Theater"
}
```
