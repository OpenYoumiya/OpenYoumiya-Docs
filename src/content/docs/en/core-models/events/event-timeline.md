---
title: EventTimelineItem
description: Event one-to-many relationship model for timeline items.
---

`EventTimelineItem` represents one timeline item under one `Event`. It is modeled as a one-to-many relationship resource from Event to Timeline.



## Model definition

### Relationship attributes

Relationship attributes describe the Event-to-Timeline connection. Only stable keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Event-local stable timeline item key used for filtering and cross-domain references. |
| `eventKey` | string | ✓ | Parent Event key. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `EventTimelineItem` `data` payload shape.

### EventTimelineItem `data` payload

```json
{
  "id": "event_timeline_mygo_9th_announce",
  "key": "mygo_9th_announce",
  "eventKey": "mygo_9th"
}
```
