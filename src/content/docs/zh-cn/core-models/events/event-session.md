---
title: EventSession（活动场次）
description: Event 到 Session 的一对多关系模型。
---

`EventSession` 表示一个 `Event` 下的一个 Session。它建模为 Event 到 Session 的一对多关系资源。

## 模型定义

### 关系属性

关系属性描述 Event 到 Session 的连接。本轮只记录稳定 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | Event 内稳定 session key，用于过滤和跨域引用。 |
| `eventKey` | string | ✓ | 所属 Event key。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `EventSession` `data` payload 形态。

### EventSession `data` payload

```json
{
  "id": "event_session_mygo_9th_day1",
  "key": "mygo_9th_day1",
  "eventKey": "mygo_9th"
}
```
