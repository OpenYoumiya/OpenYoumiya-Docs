---
title: Cast（出演关系）
description: Roles Character 与 Seiyuu 的出演关系字段。
---

`Cast` 连接一个二次元 `Character` 与一个 `Seiyuu`。只有 `characters.kind = "virtual"` 的 Character 可以建立 Cast；`kind = "real"` 的现实人物不通过 Cast 展开声优节点。

## 模型定义

### 关系属性

关系属性描述 Cast 这条连接本身，包括声优代次和当前状态。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `characterKey` | string | ✓ | 被关联的 Character key。 |
| `seiyuuKey` | string | ✓ | 被关联的 Seiyuu key。 |
| `generation` | number | ✓ | 声优代次；`1` 表示初代，`2` 表示二代。 |
| `displayOrder` | number | ✓ | 同一角色下声优展示顺序；数值越小越靠前。 |
| `isCurrent` | boolean | ✓ | 是否当前声优。历史声优仍可保持公开可见，并用 `false` 标识。 |
| `displayName` | string | ✓ | 关系展示名；为空时可按 `generation` 生成“初代 / 二代 / 三代”。 |

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
  "seiyuuKey": "youmiya_hina",
  "generation": 1,
  "displayOrder": 10,
  "isCurrent": true,
  "displayName": ""
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
      "seiyuuKey": "youmiya_hina",
      "generation": 1,
      "displayOrder": 10,
      "isCurrent": true,
      "displayName": ""
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
