---
title: Cast（出演关系）
description: Roles Character 与 Seiyuu 关系的最小公开字段。
---

`Cast` 连接一个 `Character` 与一个 `Seiyuu`。



## 模型定义

### 关系属性

关系属性描述 Cast 这条连接本身。本轮只记录稳定的端点 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `characterKey` | string | ✓ | 被关联的 Character key。 |
| `seiyuuKey` | string | ✓ | 被关联的 Seiyuu key。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/casts` | 列出 Character 与 Seiyuu 关系。 |
| `GET` | `/api/v1/casts/{key}` | 通过 `key` 获取单条 Character 与 Seiyuu 关系。 |

列表路由支持 cursor 分页：

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | 每页数量。默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一次响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### Cast `data` payload

```json
{
  "id": "cast_takamatsu_tomori_youmiya_hina",
  "key": "takamatsu_tomori_youmiya_hina",
  "characterKey": "takamatsu_tomori",
  "seiyuuKey": "youmiya_hina"
}
```

### Cast 列表响应

```json
{
  "data": [
    {
      "id": "cast_takamatsu_tomori_youmiya_hina",
      "key": "takamatsu_tomori_youmiya_hina",
      "characterKey": "takamatsu_tomori",
      "seiyuuKey": "youmiya_hina"
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
