---
title: Song
description: Music song model with minimal public fields.
---

`Song` is a musical work resource.



## Model definition

### Core attributes

Core attributes describe the Song itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Song` `data` payload shape.

### Song `data` payload

```json
{
  "id": "song_meisei",
  "key": "meisei",
  "name": "迷星叫"
}
```
