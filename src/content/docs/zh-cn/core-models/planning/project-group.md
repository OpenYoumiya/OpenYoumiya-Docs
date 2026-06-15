---
title: ProjectGroup（企划与组合关系）
description: Planning Project 与 Group 关系的最小公开字段。
---

`ProjectGroup` 连接一个 `Project` 与一个 `Group`。



## 模型定义

### 关系属性

关系属性描述 ProjectGroup 这条连接本身。本轮只记录稳定的端点 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `projectKey` | string | ✓ | 被关联的 Project key。 |
| `groupKey` | string | ✓ | 被关联的 Group key。 |
| `displayOrder` | number | ✓ | 在同一 Project 下的展示顺序；数值越小越靠前。未配置时返回 `0`。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | 说明 |
| --- | --- | --- |
| `GET` | `/api/v1/project-groups` | 获取 ProjectGroup 列表。 |
| `GET` | `/api/v1/project-groups/{key}` | 按 `key` 获取单个 ProjectGroup。 |

列表路由支持 cursor 分页：

| Query | Type | 说明 |
| --- | --- | --- |
| `limit` | number | 每页数量；默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一页响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### ProjectGroup `data` payload

```json
{
  "id": "project_group_bandori_mygo",
  "key": "bandori_mygo",
  "projectKey": "bandori",
  "groupKey": "mygo",
  "displayOrder": 0
}
```

### ProjectGroup 列表响应

```json
{
  "data": [
    {
      "id": "project_group_bandori_mygo",
      "key": "bandori_mygo",
      "projectKey": "bandori",
      "groupKey": "mygo",
      "displayOrder": 0
    }
  ],
  "meta": {
    "limit": 100,
    "cursor": "",
    "nextCursor": "",
    "hasMore": false
  }
}
```
