---
title: Seiyuu
description: Roles seiyuu model with minimal public fields.
---

`Seiyuu` is the performer person entity.

Connections to Agency and Character are represented through relationship data outside the Seiyuu core fields.

The common [resource JSON semantics](../../../common-specifications/response-envelope/#resource-json-semantics) define full-field responses, zero-value placeholders, and weak references for API resource objects.

## Model definition

### Core attributes

Core attributes describe the Seiyuu itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Seiyuu` `data` payload shape.

### Seiyuu `data` payload

```json
{
  "id": "seiyuu_youmiya_hina",
  "key": "youmiya_hina",
  "name": "羊宮妃那"
}
```
