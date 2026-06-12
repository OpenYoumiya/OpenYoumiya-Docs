---
title: EventSession（活动场次）
description: EventSession 是活动场次资源，EventSessionProfile 是单场详情读取模型。
---

`EventSession` 表示一个 `Event` 下的一个 Session。它建模为 Event 到 Session 的一对多关系资源。

## 模型定义

### EventSession `data` payload

关系属性描述 Event 到 Session 的连接，以及场次自身的公开时间信息。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | Event 内稳定 session key，用于过滤和跨域引用。 |
| `eventKey` | string | ✓ | 所属 Event key。 |
| `name` | string | ✓ | 场次展示名。 |
| `openAt` | string | ✓ | 开场时间，使用带 UTC offset 的 ISO 8601 字符串；无值时返回空字符串。 |
| `startAt` | string | ✓ | 开始时间，使用带 UTC offset 的 ISO 8601 字符串；无值时返回空字符串。 |
| `createdAt` | string | ✓ | 资源创建时间。 |
| `updatedAt` | string | ✓ | 资源更新时间。 |

### EventSessionProfile

`EventSessionProfile` 是单个场次的详情读取模型。它以 `EventSession` 为入口，展开与该场次绑定的地点和参演者。

| Field | Type | Description |
| --- | --- | --- |
| `session` | `EventSession` | 场次主资源字段。 |
| `location` | object | 场次地点；不同场次可指向不同 venue。 |
| `participants.headline` | object[] | 场次级 headline 展示对象；为空时客户端可回退到活动级 headline；不参与活动分类归属。 |
| `participants.casts` | object[] | 场次参演者列表；字段名保留为 `casts`，来源是 session 级参演记录。 |
| `participants.casts[].performer` | object | 参演声优摘要；必有。 |
| `participants.casts[].character` | object | 角色摘要；未配置时返回空对象字段的零值。 |
| `participants.casts[].roleName` | string | 职能或担当展示名；无值时返回空字符串。 |
| `participants.casts[].group` | object | 参演所属团体摘要；未配置时返回空对象字段的零值。 |
| `participants.casts[].project` | object | 参演所属项目摘要；未配置时返回空对象字段的零值。 |

Session 级参演记录表达“声优必选，角色/团体/项目可选”。活动卡片的 `classification.projects` / `classification.groups` 只从这里显式聚合，不从角色长期归属或组合长期归属反推。

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
  "startAt": "2026-09-12T18:00:00+09:00",
  "createdAt": "2026-05-20T10:00:00+09:00",
  "updatedAt": "2026-05-20T10:00:00+09:00"
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
    "startAt": "2026-09-12T18:00:00+09:00",
    "createdAt": "2026-05-20T10:00:00+09:00",
    "updatedAt": "2026-05-20T10:00:00+09:00"
  },
  "location": {
    "venue": {
      "key": "tokyo_garden_theater",
      "name": "Tokyo Garden Theater",
      "area": "有明",
      "city": "Tokyo"
    }
  },
  "participants": {
    "headline": [
      {
        "key": "mygo",
        "name": "MyGO!!!!!",
        "kind": "group",
        "imageColor": "#3388BB"
      }
    ],
    "casts": [
      {
        "performer": {
          "id": "seiyuu:youmiya_hina",
          "key": "youmiya_hina",
          "name": "羊宮妃那"
        },
        "character": {
          "id": "character:takamatsu_tomori",
          "key": "takamatsu_tomori",
          "name": "高松燈",
          "imageColor": "#77BBDD"
        },
        "roleName": "Vo.",
        "group": {
          "id": "group:mygo",
          "key": "mygo",
          "name": "MyGO!!!!!",
          "imageColor": "#3388BB"
        },
        "project": {
          "id": "project:bandori",
          "key": "bandori",
          "name": "BanG Dream! Girls Band Party!"
        },
        "displayOrder": 10
      }
    ]
  }
}
```
