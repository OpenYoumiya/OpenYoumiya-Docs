---
title: CharacterProject（角色与企划关系）
description: Roles Character 与 Project 关系的最小公开字段。
---

`CharacterProject` 连接一个 `Character` 与一个 `Project`。



## 模型定义

### 关系属性

关系属性描述 CharacterProject 这条连接本身。本轮只记录稳定的端点 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `characterKey` | string | ✓ | 被关联的 Character key。 |
| `projectKey` | string | ✓ | 被关联的 Project key。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/character-projects` | 列出 Character 与 Project 关系。 |
| `GET` | `/api/v1/character-projects/{key}` | 通过 `key` 获取单条 Character 与 Project 关系。 |

列表路由支持 cursor 分页：

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | 每页数量。默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一次响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### CharacterProject `data` payload

```json
{
  "id": "character_project_takamatsu_tomori_bandori",
  "key": "takamatsu_tomori_bandori",
  "characterKey": "takamatsu_tomori",
  "projectKey": "bandori"
}
```

### CharacterProject 列表响应

```json
{
  "data": [
    {
      "id": "character_project_takamatsu_tomori_bandori",
      "key": "takamatsu_tomori_bandori",
      "characterKey": "takamatsu_tomori",
      "projectKey": "bandori"
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
