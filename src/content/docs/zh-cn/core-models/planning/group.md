---
title: Group（组合）
description: Planning Group 最小公开字段。
---

`Group` 是组合、团体、小队或乐队资源。

Group 与 Project 的成员关系由 `ProjectGroup` 表达，不写在 Group 主记录的单值字段上。



## 模型定义

### 主属性

主属性描述 Group 自身。本轮只记录全局稳定的最小字段。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `name` | string | ✓ | 规范名称。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | 说明 |
| --- | --- | --- |
| `GET` | `/openapi/v1/groups` | 获取 Group 列表。 |
| `GET` | `/openapi/v1/groups/{key}` | 按 `key` 获取单个 Group。 |

列表路由支持 cursor 分页：

| Query | Type | 说明 |
| --- | --- | --- |
| `limit` | number | 每页数量；默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一页响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### Group `data` payload

```json
{
  "id": "group_mygo",
  "key": "mygo",
  "name": "MyGO!!!!!"
}
```

### Group 列表响应

```json
{
  "data": [
    {
      "id": "group_mygo",
      "key": "mygo",
      "name": "MyGO!!!!!"
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
