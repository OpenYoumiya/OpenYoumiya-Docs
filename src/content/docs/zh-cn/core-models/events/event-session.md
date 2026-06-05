---
title: EventSession（活动场次）
description: EventSession 是活动场次资源，EventSessionProfile 是单场详情读取模型。
---

`EventSession` 表示一个 `Event` 下的一个 Session。它建模为 Event 到 Session 的一对多关系资源。

## 模型定义

### EventSession

关系属性描述 Event 到 Session 的连接，以及场次自身的公开时间信息。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | Event 内稳定 session key，用于过滤和跨域引用。 |
| `eventKey` | string | ✓ | 所属 Event key。 |
| `name` | string | ✓ | 场次展示名。 |
| `openAt` | string \| null | ✓ | 开场时间，使用带 UTC offset 的 ISO 8601 字符串。 |
| `startAt` | string \| null | ✓ | 开始时间，使用带 UTC offset 的 ISO 8601 字符串。 |

### EventSessionProfile

`EventSessionProfile` 是单个场次的详情读取模型。它以 `EventSession` 为入口，展开与该场次绑定的地点和出演。

| Field | Type | Description |
| --- | --- | --- |
| `session` | `EventSession` | 场次主资源字段。 |
| `location` | object | 场次地点；不同场次可指向不同 venue。 |
| `participants.headline` | object[] | 场次级 headline 展示对象；为空时客户端可回退到活动级 headline。 |
| `participants.casts` | object[] | 场次出演信息。 |
| `participants.casts[].performer` | object \| null | 出演者摘要。 |
| `participants.casts[].character` | object \| null | 角色摘要。 |
| `participants.casts[].roleName` | string \| null | 职能或担当展示名。 |
| `participants.casts[].group` | object \| null | 出演所属团体摘要。 |

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只说明 EventSession 相关资源的语义边界。

| Method | Path | Response | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v1/events/{eventKey}/sessions` | `EventSession[]` | 返回活动场次摘要列表。 |
| `GET` | `/api/v1/events/{eventKey}/sessions/{sessionKey}/profile` | `EventSessionProfile` | 返回单个场次详情读取模型。 |

## Payload 示例

### EventSession

```json
{
  "id": "event_session_mygo_9th_day1",
  "key": "day1",
  "eventKey": "mygo-9th",
  "name": "DAY 1",
  "openAt": "2026-09-12T16:00:00+09:00",
  "startAt": "2026-09-12T18:00:00+09:00"
}
```

### EventSessionProfile

```json
{
  "session": {
    "id": "event_session_mygo_9th_day1",
    "key": "day1",
    "eventKey": "mygo-9th",
    "name": "DAY 1",
    "openAt": "2026-09-12T16:00:00+09:00",
    "startAt": "2026-09-12T18:00:00+09:00"
  },
  "location": {
    "venue": {
      "key": "ariake-arena",
      "name": "有明アリーナ",
      "area": "有明",
      "city": "Tokyo"
    }
  },
  "participants": {
    "headline": [
      {
        "key": "mygo",
        "name": "MyGO!!!!!",
        "kind": "group"
      }
    ],
    "casts": [
      {
        "performer": {
          "key": "youmiya-hina",
          "name": "羊宮妃那"
        },
        "character": {
          "key": "takamatsu-tomori",
          "name": "高松燈"
        },
        "roleName": "Vo.",
        "group": {
          "key": "mygo",
          "name": "MyGO!!!!!"
        },
        "displayOrder": 10
      }
    ]
  }
}
```
