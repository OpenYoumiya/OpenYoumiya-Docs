---
title: EventSession
description: EventSession core resource and session profile read model.
---

`EventSession` represents one session under one `Event`. `EventSessionProfile` expands session-level location, headline, and participants for detail pages.

## Model definition

### EventSession `data` payload

Relationship attributes describe the Event-to-Session connection and the public timing fields.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Event-local stable session key used for filtering and cross-domain references. |
| `eventKey` | string | ✓ | Parent Event key. |
| `name` | string | ✓ | Session display name. |
| `openAt` | string | ✓ | Door-open time as an ISO 8601 string with UTC offset; returns an empty string when unavailable. |
| `startAt` | string | ✓ | Start time as an ISO 8601 string with UTC offset; returns an empty string when unavailable. |
| `createdAt` | string | ✓ | Resource creation time. |
| `updatedAt` | string | ✓ | Resource update time. |

### EventSessionProfile

| Field | Type | Description |
| --- | --- | --- |
| `session` | `EventSession` | Session core resource fields. |
| `location` | object | Session venue. Different sessions can point to different venues. |
| `participants.headline` | object[] | Session headline display objects. Empty arrays can fall back to event-level headline on the client. They do not define classification. |
| `participants.casts` | object[] | Session participant list. The field name remains `casts`, but the source is session participant records. |
| `participants.casts[].character` | object | Character summary. Required. |
| `participants.casts[].seiyuu` | object | Seiyuu summary. Returns a zero-value object when not configured (e.g. for real 3D performers). |
| `participants.casts[].roleName` | string | Role or part display name; returns an empty string when unavailable. |
| `participants.casts[].group` | object | Group summary. Returns a zero-value object when not configured. |
| `participants.casts[].project` | object | Project summary. Returns a zero-value object when not configured. |

Session participant records mean "character required; seiyuu, group, and project optional." EventCard `classification.projects` and `classification.groups` are explicitly aggregated from those records, not inferred from long-term character or group membership.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Response | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/events/{eventKey}/sessions` | `EventSession[]` | Return event session summaries. |
| `GET` | `/api/v1/events/{eventKey}/sessions/{sessionKey}/profile` | `EventSessionProfile` | Return one session profile read model. |

## Payload example

### EventSession

```json
{
  "id": "event_session_mygo_9th_day1",
  "key": "day1",
  "eventKey": "mygo-9th",
  "name": "DAY 1",
  "openAt": "2026-09-12T16:00:00+09:00",
  "startAt": "2026-09-12T18:00:00+09:00",
  "createdAt": "2026-05-20T10:00:00+09:00",
  "updatedAt": "2026-05-20T10:00:00+09:00"
}
```

### EventSessionProfile

```json
{
  "session": {
    "id": "event_session_mygo_9th_day1",
    "key": "day1",
    "eventKey": "mygo-9th",
    "name": "DAY 1",
    "openAt": "2026-09-12T16:00:00+09:00",
    "startAt": "2026-09-12T18:00:00+09:00",
    "createdAt": "2026-05-20T10:00:00+09:00",
    "updatedAt": "2026-05-20T10:00:00+09:00"
  },
  "location": {
    "venue": {
      "key": "tokyo_garden_theater",
      "name": "Tokyo Garden Theater",
      "area": "有明",
      "city": "Tokyo"
    }
  },
  "participants": {
    "headline": [
      {
        "key": "mygo",
        "name": "MyGO!!!!!",
        "kind": "group",
        "imageColor": "#3388BB"
      }
    ],
    "casts": [
      {
        "character": {
          "id": "character:takamatsu_tomori",
          "key": "takamatsu_tomori",
          "name": "高松燈",
          "imageColor": "#77BBDD"
        },
        "seiyuu": {
          "id": "seiyuu:youmiya_hina",
          "key": "youmiya_hina",
          "name": "羊宮妃那"
        },
        "roleName": "Vo.",
        "group": {
          "id": "group:mygo",
          "key": "mygo",
          "name": "MyGO!!!!!",
          "imageColor": "#3388BB"
        },
        "project": {
          "id": "project:bandori",
          "key": "bandori",
          "name": "BanG Dream! Girls Band Party!"
        },
        "displayOrder": 10
      }
    ]
  }
}
```
