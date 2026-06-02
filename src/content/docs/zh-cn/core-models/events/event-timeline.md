---
title: EventTimelineItem（活动时间线条目）
description: Event 到 Timeline item 的一对多关系模型。
---

`EventTimelineItem` 表示一个 `Event` 下的一个 timeline item。它建模为 Event 到 Timeline 的一对多关系资源。

## 模型定义

### 关系属性

关系属性描述 Event 到 Timeline 的连接。本轮只记录稳定 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | Event 内稳定 timeline item key，用于过滤和跨域引用。 |
| `eventKey` | string | ✓ | 所属 Event key。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `EventTimelineItem` `data` payload 形态。

### EventTimelineItem `data` payload

```json
{
  "id": "event_timeline_mygo_9th_announce",
  "key": "mygo_9th_announce",
  "eventKey": "mygo_9th"
}
```
