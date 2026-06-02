---
title: Station
description: Travel station model with minimal public fields.
---

`Station` is a rail, metro, bus, or transit station resource.



## Model definition

### Core attributes

Core attributes describe the Station itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Station` `data` payload shape.

### Station `data` payload

```json
{
  "id": "station_ariake",
  "key": "ariake",
  "name": "Ariake Station"
}
```
