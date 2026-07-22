---
title: SessionSetlist（场次歌单关系）
description: Session 到 setlist song 的一对多关系模型。
---

`SessionSetlist` 在歌单上下文中连接一个 `EventSession` 与一个 `Song`。它替代旧的 Event 级 setlist 模型，使歌单归属到具体场次。



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

## Setlist Database

Atlas 使用只读的 Setlist Database 索引展示所有已发布且存在歌单的 `EventSession`。索引复用现有 Session 与 Setlist 数据，不引入新的数据库实体。

| Method | Path | Response | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/setlist-database` | `SetlistDatabaseSession[]` | 按场次开始时间从早到晚返回歌单目录，并提供 venue 定位所需的坐标。 |

`SetlistDatabaseSession` 的 `eventKey` 与 `sessionKey` 共同构成稳定选择引用；点击目录项后，客户端继续使用 `/api/v1/events/{eventKey}/setlist` 读取该活动的章节和曲目详情。

```json
{
  "eventKey": "mygo-9th",
  "eventTitle": "MyGO!!!!! 9th LIVE",
  "sessionKey": "day1",
  "sessionName": "DAY 1",
  "startAt": "2026-09-12T09:00:00Z",
  "venueKey": "tokyo_garden_theater",
  "venueName": "Tokyo Garden Theater",
  "venueCity": "Tokyo",
  "venueLatitude": 35.6467,
  "venueLongitude": 139.7931,
  "songCount": 18
}
```

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
