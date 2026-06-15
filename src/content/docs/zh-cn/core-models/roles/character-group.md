---
title: CharacterGroup（角色与组合关系）
description: Roles Character 与 Group 关系的最小公开字段。
---

`CharacterGroup` 连接一个 `Character` 与一个 `Group`。



## 模型定义

### 关系属性

关系属性描述 CharacterGroup 这条连接本身。本轮只记录稳定的端点 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `characterKey` | string | ✓ | 被关联的 Character key。 |
| `groupKey` | string | ✓ | 被关联的 Group key。 |
| `displayName` | string | ✓ | Character 在该 Group 下的展示名；空字符串表示使用 Character 本名。 |
| `displayOrder` | number | ✓ | 在同一 Group 下的角色展示顺序；数值越小越靠前。未配置时返回 `0`。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/character-groups` | 列出 Character 与 Group 关系。 |
| `GET` | `/api/v1/character-groups/{key}` | 通过 `key` 获取单条 Character 与 Group 关系。 |

列表路由支持 cursor 分页：

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | 每页数量。默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一次响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### CharacterGroup `data` payload

```json
{
  "id": "character_group_takamatsu_tomori_mygo",
  "key": "takamatsu_tomori_mygo",
  "characterKey": "takamatsu_tomori",
  "groupKey": "mygo",
  "displayName": "",
  "displayOrder": 0
}
```

### CharacterGroup 列表响应

```json
{
  "data": [
    {
      "id": "character_group_takamatsu_tomori_mygo",
      "key": "takamatsu_tomori_mygo",
      "characterKey": "takamatsu_tomori",
      "groupKey": "mygo",
      "displayName": "",
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
