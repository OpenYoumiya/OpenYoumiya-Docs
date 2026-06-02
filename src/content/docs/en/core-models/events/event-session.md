---
title: EventSession
description: Event one-to-many relationship model for sessions.
---

`EventSession` represents one Session under one `Event`. It is modeled as a one-to-many relationship resource from Event to Session.

The common [resource JSON semantics](../../../common-specifications/response-envelope/#resource-json-semantics) define full-field responses, zero-value placeholders, and weak references for API resource objects.

## Model definition

### Relationship attributes

Relationship attributes describe the Event-to-Session connection. Only stable keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Event-local stable session key used for filtering and cross-domain references. |
| `eventKey` | string | ✓ | Parent Event key. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `EventSession` `data` payload shape.

### EventSession `data` payload

```json
{
  "id": "event_session_mygo_9th_day1",
  "key": "mygo_9th_day1",
  "eventKey": "mygo_9th"
}
```
