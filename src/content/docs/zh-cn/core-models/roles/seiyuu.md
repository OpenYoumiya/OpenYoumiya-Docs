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

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `Seiyuu` `data` payload 形态。

### Seiyuu `data` payload

```json
{
  "id": "seiyuu_youmiya_hina",
  "key": "youmiya_hina",
  "name": "羊宮妃那"
}
```
