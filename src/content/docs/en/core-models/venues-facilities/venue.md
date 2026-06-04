---
title: Venue
description: Venue model with minimal public fields.
---

`Venue` is a physical venue or facility resource.



## Model definition

### Core attributes

Core attributes describe the Venue itself. Only globally stable fields are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `name` | string | ✓ | Canonical name. |

The public API derives `id` at the API boundary; internal database UUIDs are not part of the public contract.

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/venues` | List venues. |
| `GET` | `/api/v1/venues/{key}` | Get one venue by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

Detail responses include only `data` and do not include list `meta`.

### Venue `data` payload

```json
{
  "id": "venue_tokyo_garden_theater",
  "key": "tokyo_garden_theater",
  "name": "Tokyo Garden Theater"
}
```

### Venue detail response

```json
{
  "data": {
    "id": "venue_tokyo_garden_theater",
    "key": "tokyo_garden_theater",
    "name": "Tokyo Garden Theater"
  }
}
```

### Venue list response

```json
{
  "data": [
    {
      "id": "venue_tokyo_garden_theater",
      "key": "tokyo_garden_theater",
      "name": "Tokyo Garden Theater"
    }
  ],
  "meta": {
    "limit": 100,
    "cursor": "",
    "nextCursor": null,
    "hasMore": false
  }
}
```
