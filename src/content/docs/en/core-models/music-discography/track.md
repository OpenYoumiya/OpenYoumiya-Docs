---
title: Track
description: Music relationship model between Release and Song resources.
---

`Track` connects one `Release` and one `Song`.

The common [resource JSON semantics](../../../common-specifications/response-envelope/#resource-json-semantics) define full-field responses, zero-value placeholders, and weak references for API resource objects.

## Model definition

### Relationship attributes

Relationship attributes describe the Track link itself. Only stable endpoint keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `releaseKey` | string | ✓ | Linked Release key. |
| `songKey` | string | ✓ | Linked Song key. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Track` `data` payload shape.

### Track `data` payload

```json
{
  "id": "track_meisei_meisei",
  "key": "meisei_meisei",
  "releaseKey": "meisei",
  "songKey": "meisei"
}
```
