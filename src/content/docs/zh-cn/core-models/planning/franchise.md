---
title: Franchise（多媒体企划）
description: Planning Franchise 最小公开字段。
---

`Franchise` 是最高层多媒体企划或版权系列资源。



## 模型定义

### 主属性

主属性描述 Franchise 自身。本轮只记录全局稳定的最小字段。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `name` | string | ✓ | 规范名称。 |

公开 API 在 API 边界派生 `id`；内部数据库 UUID 不属于公开契约。

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | 说明 |
| --- | --- | --- |
| `GET` | `/api/v1/franchises` | 获取 Franchise 列表。 |
| `GET` | `/api/v1/franchises/{key}` | 按 `key` 获取单个 Franchise。 |

列表路由支持 cursor 分页：

| Query | Type | 说明 |
| --- | --- | --- |
| `limit` | number | 每页数量；默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一页响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### Franchise `data` payload

```json
{
  "id": "franchise_bang_dream",
  "key": "bang_dream",
  "name": "BanG Dream!"
}
```

### Franchise 列表响应

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
    "nextCursor": "",
    "hasMore": false
  }
}
```
