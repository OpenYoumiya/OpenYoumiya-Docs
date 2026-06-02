---
title: ProjectGroup
description: Planning relationship model between Project and Group resources.
---

`ProjectGroup` connects one `Project` and one `Group`.



## Model definition

### Relationship attributes

Relationship attributes describe the ProjectGroup link itself. Only stable endpoint keys are documented in this first pass.

| Field | Type | Supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | Stable public ID generated from `key`; treat it as opaque. |
| `key` | string | ✓ | Globally unique stable key used for filtering and cross-domain references. |
| `projectKey` | string | ✓ | Linked Project key. |
| `groupKey` | string | ✓ | Linked Group key. |

Additional fields can be added later after their public contract is stable.

## HTTP routes

The public OpenAPI specification is the source of truth for route contracts.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/openapi/v1/project-groups` | List project/group relations. |
| `GET` | `/openapi/v1/project-groups/{key}` | Get one project/group relation by `key`. |

List routes support cursor pagination:

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | Page size. Defaults to `100` and is capped at `500`. |
| `cursor` | opaque string | Opaque cursor from the previous response `meta.nextCursor`. |

List responses include `meta.limit`, `meta.cursor`, `meta.nextCursor`, and `meta.hasMore`.

### ProjectGroup `data` payload

```json
{
  "id": "project_group_bandori_mygo",
  "key": "bandori_mygo",
  "projectKey": "bandori",
  "groupKey": "mygo"
}
```

### ProjectGroup list response

```json
{
  "data": [
    {
      "id": "project_group_bandori_mygo",
      "key": "bandori_mygo",
      "projectKey": "bandori",
      "groupKey": "mygo"
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
