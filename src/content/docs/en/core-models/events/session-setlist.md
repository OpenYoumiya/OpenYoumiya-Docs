---
title: SessionSetlist
description: Session one-to-many relationship model for setlist songs.
---

`SessionSetlist` connects one `EventSession` and one `Song` in a setlist context. It replaces the older Event-level setlist model so setlists are scoped to sessions.

The common [resource JSON semantics](../../../common-specifications/response-envelope/#resource-json-semantics) define full-field responses, zero-value placeholders, and weak references for API resource objects.

## Model definition

### Relationship attributes

Relationship attributes describe the Session-to-Setlist connection. Only stable endpoint keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Session-local stable setlist item key used for filtering and cross-domain references. |
| `sessionKey` | string | ✓ | Parent EventSession key. |
| `songKey` | string | ✓ | Linked Song key. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts. This section only shows the minimal `SessionSetlist` `data` payload shape.

### SessionSetlist `data` payload

```json
{
  "id": "session_setlist_mygo_9th_day1_meisei",
  "key": "mygo_9th_day1_meisei",
  "sessionKey": "mygo_9th_day1",
  "songKey": "meisei"
}
```
