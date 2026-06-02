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

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `Cast` `data` payload 形态。

### Cast `data` payload

```json
{
  "id": "cast_takamatsu_tomori_youmiya_hina",
  "key": "takamatsu_tomori_youmiya_hina",
  "characterKey": "takamatsu_tomori",
  "seiyuuKey": "youmiya_hina"
}
```
