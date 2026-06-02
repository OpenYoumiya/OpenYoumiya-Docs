---
title: Track（收录关系）
description: Music Release 与 Song 关系的最小公开字段。
---

`Track` 连接一个 `Release` 与一个 `Song`。



## 模型定义

### 关系属性

关系属性描述 Track 这条连接本身。本轮只记录稳定的端点 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `releaseKey` | string | ✓ | 被关联的 Release key。 |
| `songKey` | string | ✓ | 被关联的 Song key。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `Track` `data` payload 形态。

### Track `data` payload

```json
{
  "id": "track_meisei_meisei",
  "key": "meisei_meisei",
  "releaseKey": "meisei",
  "songKey": "meisei"
}
```
