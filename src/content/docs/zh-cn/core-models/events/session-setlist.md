---
title: SessionSetlist（场次歌单关系）
description: Session 到 setlist song 的一对多关系模型。
---

`SessionSetlist` 在歌单上下文中连接一个 `EventSession` 与一个 `Song`。它替代旧的 Event 级 setlist 模型，使歌单归属到具体场次。

通用的[资源 JSON 语义](../../../common-specifications/response-envelope/#资源-json-语义)定义了 API 资源对象的全字段返回、零值占位和弱引用规则。

## 模型定义

### 关系属性

关系属性描述 Session 到 Setlist 的连接。本轮只记录稳定端点 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | Session 内稳定 setlist item key，用于过滤和跨域引用。 |
| `sessionKey` | string | ✓ | 所属 EventSession key。 |
| `songKey` | string | ✓ | 被关联的 Song key。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `SessionSetlist` `data` payload 形态。

### SessionSetlist `data` payload

```json
{
  "id": "session_setlist_mygo_9th_day1_meisei",
  "key": "mygo_9th_day1_meisei",
  "sessionKey": "mygo_9th_day1",
  "songKey": "meisei"
}
```
