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

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `CharacterGroup` `data` payload 形态。

### CharacterGroup `data` payload

```json
{
  "id": "character_group_takamatsu_tomori_mygo",
  "key": "takamatsu_tomori_mygo",
  "characterKey": "takamatsu_tomori",
  "groupKey": "mygo"
}
```
