---
title: Franchise
description: Planning franchise model with minimal public fields.
---

`Franchise` is the top-level multimedia franchise or copyright series resource.

The common [resource JSON semantics](../../../common-specifications/response-envelope/#resource-json-semantics) define full-field responses, zero-value placeholders, and weak references for API resource objects.

## Model definition

### Core attributes

Core attributes describe the Franchise itself. Only globally stable fields are documented in this first pass.

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
| `GET` | `/openapi/v1/franchises` | List franchises. |
| `GET` | `/openapi/v1/franchises/{key}` | Get one franchise by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### Franchise `data` payload

```json
{
  "id": "franchise_bang_dream",
  "key": "bang_dream",
  "name": "BanG Dream!"
}
```

### Franchise list response

```json
{
  "data": [
    {
      "id": "franchise_bang_dream",
      "key": "bang_dream",
      "name": "BanG Dream!"
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
