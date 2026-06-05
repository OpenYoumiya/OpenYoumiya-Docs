---
title: Event（活动）
description: Event 是活动主资源，以及活动页面读取模型的入口说明。
---

Event 是活动主资源。它负责描述活动自身的稳定属性；列表、详情、排行需要的展示字段，应通过读取模型聚合得到。

本页采用单页结构说明 Event 相关模型：

| 模型 | 用途 | 数据性质 |
| --- | --- | --- |
| `Event` | 活动主资源。 | Core 模型 |
| `EventCard` | 活动列表、附近活动和排行榜中的活动摘要。 | 读取模型 |
| `EventCardAroundPage` | 活动列表双向分页读取结果。 | 读取模型 |
| `EventProfile` | 活动详情页初始资料。 | 读取模型 |

## 模型定义

### Event

`Event` 只保存活动本身，核心模型主属性。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `type` | string | ✓ | 活动类型，取值见 `Event.type`。 |
| `title` | string | ✓ | 活动标题。 |
| `subtitle` | string \| null | ✓ | 活动副标题；字段名统一使用 `subtitle`。 |
| `status` | string | ✓ | Core 状态，例如 `draft`、`published`、`archived`、`cancelled`。 |
| `officialUrl` | string \| null | ✓ | 官方页面 URL。 |
| `sourceCheckedAt` | string \| null | ✓ | 来源最近校验时间。 |
| `organizerName` | string \| null | ✓ | 主办方展示名；在 Organization Core 出现前先作为文本字段。 |
| `createdAt` | string | ✓ | 资源创建时间。 |
| `updatedAt` | string | ✓ | 资源更新时间。 |

#### Event.type

| Value | Description |
| --- | --- |
| `live` | 现场演出。 |
| `fan_meeting` | 粉丝见面会。 |
| `release_event` | 发售、发行或发布相关活动。 |
| `stage_play` | 舞台剧。 |
| `festival` | 音乐节、综合活动或联合活动。 |
| `broadcast` | 配信、播出或线上节目。 |
| `exhibition` | 展览。 |
| `talk` | Talk、座谈或谈话活动。 |
| `others` | 其他活动类型。 |

### EventCard

`EventCard` 是面向列表和引用场景的读取模型。它以 Event 为基础，聚合展示所需的分类、日程、地点和参与者信息。

| Field | Type | Description |
| --- | --- | --- |
| `event` | `Event` | 活动主资源字段。 |
| `classification.project` | object \| null | 项目信息，由 Event 与 Project 关系聚合得到。 |
| `classification.groups` | object[] | 团体信息，由 Event 与 Group 关系聚合得到。 |
| `participants.headline` | object[] | 主演展示对象。 |
| `location.venues` | object[] | 场馆摘要列表，由场次地点去重聚合得到。 |
| `location.venues[].area` | string \| null | 场馆所在区域。 |
| `location.venues[].city` | string \| null | 场馆所在城市。 |
| `schedule.firstStartAt` | string \| null | 首场开始时间，由 EventSession 聚合得到。 |
| `schedule.lastStartAt` | string \| null | 末场开始时间，由 EventSession 聚合得到。 |
| `schedule.nextStartAt` | string \| null | 下一场开始时间，由 EventSession 和当前时间派生。 |
| `timeline.eventPhase` | string | 活动整体阶段，由 session / timeline 与当前时间派生。 |
| `timeline.sessionPhase` | string | 场次进行阶段，由 session 与当前时间派生。 |
| `timeline.next` | object \| null | 下一条 timeline item。 |

### EventCardAroundPage

`EventCardAroundPage` 是活动列表的双向读取模型。它以 `anchorAt` 为时间锚点，一次返回锚点前、锚点中和锚点后的活动卡片，并为前后两个方向分别提供 cursor。

| Field | Type | Description |
| --- | --- | --- |
| `data.before` | `EventCard[]` | 锚点前的活动卡片。 |
| `data.current` | `EventCard[]` | 锚点时刻正在进行或覆盖锚点的活动卡片。 |
| `data.after` | `EventCard[]` | 锚点后的活动卡片。 |
| `meta.anchorAt` | string | 本次分页使用的时间锚点。 |
| `meta.before` | object | 向锚点前继续加载的 cursor meta。 |
| `meta.after` | object | 向锚点后继续加载的 cursor meta。 |

`direction=around` 返回 `before`、`current`、`after` 三段；`direction=before` 或 `direction=after` 只返回对应方向的新一页。`cursor` 绑定筛选条件、方向和 `anchorAt`，客户端不能跨筛选条件复用。

### EventProfile

`EventProfile` 是活动详情页的初始读取模型。它可以复用 `EventCard` 的摘要信息，并返回活动级票种和场次摘要；与具体场次绑定的地点和出演通过 `EventSessionProfile` 读取。

| Field | Type | Description |
| --- | --- | --- |
| `card` | `EventCard` | 活动摘要。 |
| `ticketTypes` | object[] | 活动票种摘要。 |
| `ticketTypes[].faceValue` | number \| null | 票面价格。 |
| `schedule.sessions` | `EventSession[]` | 活动场次摘要列表。 |

## Payload 示例

### Event

```json
{
  "id": "event_mygo_9th",
  "key": "mygo-9th",
  "type": "live",
  "title": "MyGO!!!!!「つなぎ目の向こうに」",
  "subtitle": "MyGO!!!!! 9th LIVE「つなぎ目の向こうに」",
  "status": "published",
  "officialUrl": "https://bang-dream.com/events/mygo_9th/",
  "sourceCheckedAt": "2026-05-20T10:00:00+09:00",
  "organizerName": "株式会社ブシロードミュージック",
  "createdAt": "2026-05-20T10:00:00+09:00",
  "updatedAt": "2026-05-20T10:00:00+09:00"
}
```

### EventCard

```json
{
  "event": {
    "id": "event_mygo_9th",
    "key": "mygo-9th",
    "type": "live",
    "title": "MyGO!!!!!「つなぎ目の向こうに」",
    "subtitle": "MyGO!!!!! 9th LIVE「つなぎ目の向こうに」",
    "status": "published",
    "officialUrl": "https://bang-dream.com/events/mygo_9th/",
    "sourceCheckedAt": "2026-05-20T10:00:00+09:00",
    "organizerName": "株式会社ブシロードミュージック",
    "createdAt": "2026-05-20T10:00:00+09:00",
    "updatedAt": "2026-05-20T10:00:00+09:00"
  },
  "classification": {
    "project": {
      "key": "bang-dream",
      "name": "BanG Dream!"
    },
    "groups": [
      {
        "key": "mygo",
        "name": "MyGO!!!!!"
      }
    ]
  },
  "participants": {
    "headline": [
      {
        "key": "mygo",
        "name": "MyGO!!!!!",
        "kind": "group"
      }
    ]
  },
  "location": {
    "venues": [
      {
        "key": "ariake-arena",
        "name": "有明アリーナ",
        "area": "有明",
        "city": "Tokyo"
      }
    ]
  },
  "schedule": {
    "firstStartAt": "2026-09-12T18:00:00+09:00",
    "lastStartAt": "2026-09-13T17:00:00+09:00",
    "nextStartAt": "2026-09-12T18:00:00+09:00"
  },
  "timeline": {
    "eventPhase": "upcoming",
    "sessionPhase": "pre_live",
    "next": {
      "id": "event_timeline_mygo_9th_general_sale",
      "key": "general-sale",
      "eventKey": "mygo-9th",
      "title": "一般発売",
      "startsAt": "2026-08-10T12:00:00+09:00",
      "endsAt": null,
      "allDay": false,
      "sourceUrl": "https://bang-dream.com/events/mygo_9th/",
      "displayOrder": 30
    }
  }
}
```

### EventProfile

```json
{
  "card": {
    "event": {
      "id": "event_mygo_9th",
      "key": "mygo-9th",
      "type": "live",
      "title": "MyGO!!!!!「つなぎ目の向こうに」",
      "subtitle": "MyGO!!!!! 9th LIVE「つなぎ目の向こうに」",
      "status": "published",
      "officialUrl": "https://bang-dream.com/events/mygo_9th/",
      "sourceCheckedAt": "2026-05-20T10:00:00+09:00",
      "organizerName": "株式会社ブシロードミュージック",
      "createdAt": "2026-05-20T10:00:00+09:00",
      "updatedAt": "2026-05-20T10:00:00+09:00"
    },
    "classification": {
      "project": {
        "key": "bang-dream",
        "name": "BanG Dream!"
      },
      "groups": [
        {
          "key": "mygo",
          "name": "MyGO!!!!!"
        }
      ]
    },
    "participants": {
      "headline": [
        {
          "key": "mygo",
          "name": "MyGO!!!!!",
          "kind": "group"
        }
      ]
    },
    "location": {
      "venues": [
        {
          "key": "ariake-arena",
          "name": "有明アリーナ",
          "area": "有明",
          "city": "Tokyo"
        }
      ]
    },
    "schedule": {
      "firstStartAt": "2026-09-12T18:00:00+09:00",
      "lastStartAt": "2026-09-13T17:00:00+09:00",
      "nextStartAt": "2026-09-12T18:00:00+09:00"
    },
    "timeline": {
      "eventPhase": "upcoming",
      "sessionPhase": "pre_live",
      "next": {
        "id": "event_timeline_mygo_9th_general_sale",
        "key": "general-sale",
        "eventKey": "mygo-9th",
        "title": "一般発売",
        "startsAt": "2026-08-10T12:00:00+09:00",
        "endsAt": null,
        "allDay": false,
        "sourceUrl": "https://bang-dream.com/events/mygo_9th/",
        "displayOrder": 30
      }
    }
  },
  "ticketTypes": [
    {
      "name": "一般指定席",
      "faceValue": 9900,
      "currency": "JPY"
    },
    {
      "name": "一般指定席(特製グッズ付き)",
      "faceValue": 15400,
      "currency": "JPY"
    },
    {
      "name": "プレミアムシート(特製グッズ付き)",
      "faceValue": 22000,
      "currency": "JPY"
    }
  ],
  "schedule": {
    "sessions": [
      {
        "id": "event_session_mygo_9th_day1",
        "key": "day1",
        "eventKey": "mygo-9th",
        "name": "DAY 1",
        "openAt": "2026-09-12T16:00:00+09:00",
        "startAt": "2026-09-12T18:00:00+09:00"
      },
      {
        "id": "event_session_mygo_9th_day2",
        "key": "day2",
        "eventKey": "mygo-9th",
        "name": "DAY 2",
        "openAt": "2026-09-13T15:00:00+09:00",
        "startAt": "2026-09-13T17:00:00+09:00"
      }
    ]
  }
}
```

### EventCardAroundPage

```json
{
  "data": {
    "before": [],
    "current": [],
    "after": [
      {
        "event": {
          "id": "event_mygo_9th",
          "key": "mygo-9th",
          "type": "live",
          "title": "MyGO!!!!!「つなぎ目の向こうに」",
          "subtitle": "MyGO!!!!! 9th LIVE「つなぎ目の向こうに」",
          "status": "published",
          "officialUrl": "https://bang-dream.com/events/mygo_9th/",
          "sourceCheckedAt": "2026-05-20T10:00:00+09:00",
          "organizerName": "株式会社ブシロードミュージック",
          "createdAt": "2026-05-20T10:00:00+09:00",
          "updatedAt": "2026-05-20T10:00:00+09:00"
        },
        "classification": {
          "project": {
            "key": "bang-dream",
            "name": "BanG Dream!"
          },
          "groups": [
            {
              "key": "mygo",
              "name": "MyGO!!!!!"
            }
          ]
        },
        "participants": {
          "headline": [
            {
              "key": "mygo",
              "name": "MyGO!!!!!",
              "kind": "group"
            }
          ]
        },
        "location": {
          "venues": [
            {
              "key": "ariake-arena",
              "name": "有明アリーナ",
              "area": "有明",
              "city": "Tokyo"
            }
          ]
        },
        "schedule": {
          "firstStartAt": "2026-09-12T18:00:00+09:00",
          "lastStartAt": "2026-09-13T17:00:00+09:00",
          "nextStartAt": "2026-09-12T18:00:00+09:00"
        },
        "timeline": {
          "eventPhase": "upcoming",
          "sessionPhase": "pre_live",
          "next": null
        }
      }
    ]
  },
  "meta": {
    "anchorAt": "2026-06-01T10:00:00+09:00",
    "before": {
      "limit": 30,
      "nextCursor": null,
      "hasMore": false
    },
    "after": {
      "limit": 30,
      "nextCursor": "opaque-cursor",
      "hasMore": true
    }
  }
}
```

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只说明 Event 相关资源的语义边界。

| Method | Path | Response | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/events` | `Event[]` | 只返回 Event 模型字段。 |
| `GET` | `/api/v1/events/{key}` | `Event` | 返回单个 Event。 |
| `GET` | `/api/v1/events/{eventKey}/sessions` | `EventSession[]` | 返回活动场次摘要列表。 |
| `GET` | `/api/v1/events/{eventKey}/sessions/{sessionKey}/profile` | `EventSessionProfile` | 返回单个场次详情读取模型。 |
| `GET` | `/api/v1/event-cards` | `EventCardAroundPage` | 返回支持双向加载的活动列表读取模型。 |
| `GET` | `/api/v1/event-profiles/{eventKey}` | `EventProfile` | 返回活动详情读取模型。 |

`/api/v1/events` 不返回页面卡片字段；需要页面展示时使用 `EventCard` 或 `EventProfile`。
