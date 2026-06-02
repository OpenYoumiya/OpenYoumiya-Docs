---
title: 基础字段
description: OpenYoumiya API 模型共享的通用资源字段。
---

公开时间字段统一使用带 UTC offset 的 ISO 8601 字符串，例如 `2026-06-01T10:00:00+09:00`。
UTC 时间也必须显式写成 offset，例如 `2026-06-01T01:00:00+00:00`。offset 是时间字符串的一部分，不再单独拆分时区字段。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 公开稳定 ID。Planning 模型 ID 由 `key` 自动生成，但客户端仍应视为 opaque。 |
| `sourceId` | string | 可选来源系统 ID。 |
| `slug` | string | 人类可读 URL key。 |
| `key` | string | 全局唯一稳定 key。 |
| `resourceType` | string | 同步和失效使用的资源类型。 |
| `resourceId` | string | 同步和失效使用的资源 ID。 |
| `version` | number | 同步和缓存失效使用的资源版本。 |
| `status` | string | 资源状态枚举。 |
| `createdAt` | string | 创建时间，DateTimeString。 |
| `updatedAt` | string | 更新时间，DateTimeString。 |
| `publishedAt` | string | 公开发布时间，DateTimeString。 |
| `deletedAt` | string | tombstone 或软删除时间，DateTimeString。 |
| `name` | string | 规范短名称。 |
| `displayName` | string | 展示名称。 |
| `title` | string | 内容标题。 |
| `subtitle` | string | 内容副标题。 |
| `summary` | string | 短摘要。 |
| `description` | string | 长描述。 |
| `officialUrl` | string | 官方 URL。 |
| `sourceUrl` | string | 来源 URL。 |
| `sortOrder` | number | 手动排序权重。 |
| `tags` | string[] | 标签。 |
| `metadata` | object | 可选非核心元数据。 |
