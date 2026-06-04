---
title: Venue（场馆）
description: Venue 最小公开字段。
---

`Venue` 是物理场馆或设施资源。



## 模型定义

### 主属性

主属性描述 Venue 自身。本轮只记录全局稳定的最小字段。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `name` | string | ✓ | 规范名称。 |

公开 API 会在接口边界生成 `id`；内部数据库 UUID 不属于公开契约。

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/venues` | 获取 Venue 列表。 |
| `GET` | `/api/v1/venues/{key}` | 按 `key` 获取单个 Venue。 |

列表路由支持 cursor 分页：

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | 单页数量，默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一页响应 `meta.nextCursor` 返回的不透明 cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

详情响应只包含 `data`，不包含列表 `meta`。

### Venue `data` payload

```json
{
  "id": "venue_tokyo_garden_theater",
  "key": "tokyo_garden_theater",
  "name": "Tokyo Garden Theater"
}
```

### Venue 详情响应

```json
{
  "data": {
    "id": "venue_tokyo_garden_theater",
    "key": "tokyo_garden_theater",
    "name": "Tokyo Garden Theater"
  }
}
```

### Venue 列表响应

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
