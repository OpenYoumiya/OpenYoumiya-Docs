---
title: Event
description: Event core resource and event read-model entry points.
---

`Event` is the main activity resource. It describes stable properties of the activity itself; list, detail, and ranking display data are assembled through read models.

This page summarizes the public Event-related models:

| Model | Purpose | Data nature |
| --- | --- | --- |
| `Event` | Main activity resource. | Core model |
| `EventCard` | Activity summary used by lists, nearby views, and rankings. | Read model |
| `EventCardAroundPage` | Bidirectional event-list page. | Read model |
| `EventProfile` | Initial event detail page data. | Read model |

## Model definition

### Event

`Event` stores activity-level fields only.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `type` | string | ✓ | Event type. |
| `title` | string | ✓ | Event title. |
| `subtitle` | string | ✓ | Event subtitle; returns an empty string when unavailable. |
| `status` | string | ✓ | Core status such as `draft`, `published`, `archived`, or `cancelled`. |
| `officialUrl` | string | ✓ | Official event URL; returns an empty string when unavailable. |
| `sourceCheckedAt` | string | ✓ | Last source verification time; returns an empty string when unavailable. |
| `organizerName` | string | ✓ | Organizer display name until Organization Core exists. |
| `createdAt` | string | ✓ | Resource creation time. |
| `updatedAt` | string | ✓ | Resource update time. |

### EventCard

`EventCard` is a read model for list and reference contexts. It starts from `Event` and aggregates classification, schedule, location, and participant data for display.

| Field | Type | Description |
| --- | --- | --- |
| `event` | `Event` | Main event resource fields. |
| `classification.projects` | object[] | Project resources explicitly aggregated from session participant `projectKey`. |
| `classification.groups` | object[] | Group resources explicitly aggregated from session participant `groupKey`; includes `imageColor`. |
| `participants.headline` | object[] | Headline display objects; they are display-only and do not define classification. |
| `location.venues` | object[] | Deduplicated venue summaries from sessions. |
| `schedule.firstStartAt` | string | First session start time; returns an empty string when unavailable. |
| `schedule.lastStartAt` | string | Last session start time; returns an empty string when unavailable. |
| `schedule.nextStartAt` | string | Next session start time derived from sessions and current time. |

EventCard classification uses only explicit session participant `projectKey` / `groupKey` values. Headline relations only affect display, and long-term Core relations such as `character_groups`, `project_groups`, and `casts` are not used to infer event classification.

### EventProfile

`EventProfile` is the initial event detail read model. It reuses `EventCard` and adds event-level ticket type and session summaries.

| Field | Type | Description |
| --- | --- | --- |
| `card` | `EventCard` | Event summary. |
| `ticketTypes` | object[] | Event ticket type summaries. |
| `schedule.sessions` | `EventSession[]` | Event session summaries. |

## Payload example

### Event `data` payload

```json
{
  "id": "event_mygo_9th",
  "key": "mygo-9th",
  "type": "live",
  "title": "MyGO!!!!!「つなぎ目の向こうに」",
  "subtitle": "MyGO!!!!! 9th LIVE「つなぎ目の向こうに」",
  "status": "published",
  "officialUrl": "https://bang-dream.com/events/mygo_9th/",
  "sourceCheckedAt": "2026-05-20T10:00:00+09:00",
  "organizerName": "株式会社ブシロードミュージック",
  "createdAt": "2026-05-20T10:00:00+09:00",
  "updatedAt": "2026-05-20T10:00:00+09:00"
}
```

### EventCard

```json
{
  "event": {
    "id": "event_mygo_9th",
    "key": "mygo-9th",
    "type": "live",
    "title": "MyGO!!!!!「つなぎ目の向こうに」",
    "subtitle": "MyGO!!!!! 9th LIVE「つなぎ目の向こうに」",
    "status": "published",
    "officialUrl": "https://bang-dream.com/events/mygo_9th/",
    "sourceCheckedAt": "2026-05-20T10:00:00+09:00",
    "organizerName": "株式会社ブシロードミュージック",
    "createdAt": "2026-05-20T10:00:00+09:00",
    "updatedAt": "2026-05-20T10:00:00+09:00"
  },
  "classification": {
    "projects": [
      {
        "id": "project:bandori",
        "key": "bandori",
        "name": "BanG Dream! Girls Band Party!"
      }
    ],
    "groups": [
      {
        "id": "group:mygo",
        "key": "mygo",
        "name": "MyGO!!!!!",
        "imageColor": "#3388BB"
      }
    ]
  },
  "participants": {
    "headline": [
      {
        "key": "mygo",
        "name": "MyGO!!!!!",
        "kind": "group",
        "imageColor": "#3388BB"
      }
    ]
  }
}
```

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Response | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/events` | `Event[]` | Return Event model fields. |
| `GET` | `/api/v1/events/{key}` | `Event` | Return one Event. |
| `GET` | `/api/v1/events/{eventKey}/sessions` | `EventSession[]` | Return event session summaries. |
| `GET` | `/api/v1/events/{eventKey}/sessions/{sessionKey}/profile` | `EventSessionProfile` | Return one session profile read model. |
| `GET` | `/api/v1/event-cards` | `EventCardAroundPage` | Return the bidirectional event list read model. |
| `GET` | `/api/v1/event-profiles/{eventKey}` | `EventProfile` | Return the event detail read model. |
