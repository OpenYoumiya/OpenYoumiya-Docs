---
title: Base fields
description: Common resource fields shared by OpenYoumiya API models.
---

Date and time fields use ISO 8601 strings with UTC offset, for example `2026-06-01T10:00:00+09:00`.
UTC values must use an explicit offset such as `2026-06-01T01:00:00+00:00`. The offset is part of the timestamp string instead of a separate time zone field.

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Stable public ID. Planning model IDs are generated from `key` and should still be treated as opaque. |
| `sourceId` | string | Optional source-system ID. |
| `slug` | string | Human-readable URL key. |
| `key` | string | Globally unique stable key. |
| `resourceType` | string | Resource type for sync and invalidation. |
| `resourceId` | string | Resource ID for sync and invalidation. |
| `version` | number | Resource version for sync and cache busting. |
| `status` | string | Resource status enum. |
| `createdAt` | string | Creation time as a DateTimeString. |
| `updatedAt` | string | Last update time as a DateTimeString. |
| `publishedAt` | string | Public publication time as a DateTimeString. |
| `deletedAt` | string | Tombstone or soft-delete time as a DateTimeString. |
| `name` | string | Canonical short name. |
| `displayName` | string | Display name. |
| `title` | string | Content title. |
| `subtitle` | string | Content subtitle. |
| `summary` | string | Short summary. |
| `description` | string | Long description. |
| `officialUrl` | string | Official URL. |
| `sourceUrl` | string | Source URL. |
| `sortOrder` | number | Manual sort order. |
| `tags` | string[] | Tags. |
| `metadata` | object | Optional non-core metadata. |
