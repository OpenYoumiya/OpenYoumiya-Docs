---
title: Event
description: Event model with minimal public fields.
---

`Event` is the main public activity resource.

Project, Group, Cast, Seiyuu, Session, Venue, timeline, and setlist data are relationship or read-view data outside the Event core fields.



## Model definition

### Core attributes

Core attributes describe the Event itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `Event` `data` payload shape.

### Event `data` payload

```json
{
  "id": "event_mygo_9th",
  "key": "mygo_9th",
  "name": "MyGO!!!!! 9th LIVE"
}
```
