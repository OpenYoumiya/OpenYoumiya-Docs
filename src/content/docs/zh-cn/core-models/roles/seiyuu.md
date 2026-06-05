---
title: Seiyuu（声优）
description: Roles Seiyuu 最小公开字段。
---

`Seiyuu` 是声优本人实体。

Seiyuu 与 Agency、Character 的连接通过关系数据表达，不写进 Seiyuu 主属性。



## 模型定义

### 主属性

主属性描述 Seiyuu 自身。本轮只记录全局稳定的最小字段。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `name` | string | ✓ | 规范名称。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/seiyuus` | 列出 Seiyuus。 |
| `GET` | `/api/v1/seiyuus/{key}` | 通过 `key` 获取单个 Seiyuu。 |

列表路由支持 cursor 分页：

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | 每页数量。默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一次响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### Seiyuu `data` payload

```json
{
  "id": "seiyuu_youmiya_hina",
  "key": "youmiya_hina",
  "name": "羊宮妃那"
}
```

### Seiyuu 列表响应

```json
{
  "data": [
    {
      "id": "seiyuu_youmiya_hina",
      "key": "youmiya_hina",
      "name": "羊宮妃那"
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
