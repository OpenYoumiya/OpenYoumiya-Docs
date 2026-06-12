---
title: API Reference
description: 公开网关路由和 OpenAPI 文档位置。
---

OpenYoumiya 通过 OpenAPI Gateway 暴露公开数据：

```http
https://open.youmiya.love/api/v1
```

实时 OpenAPI 文档由 Gateway 生成：

```http
https://open.youmiya.love/openapi.json
```

Gateway 从 `Origin /origin/openapi.json` 获取完整内部契约，按公开 allowlist 裁剪后，只暴露第三方 API 使用者应该访问的路由。

## 当前公开路由

| Method | Path | 说明 |
| :--- | :--- | :--- |
| `GET` | `/api/v1/healthz` | 健康检查。 |
| `GET` | `/api/v1/projects` | 获取 Project 列表。 |
| `GET` | `/api/v1/projects/{key}` | 获取单个 Project。 |
| `GET` | `/api/v1/franchises` | 获取 Franchise 列表。 |
| `GET` | `/api/v1/franchises/{key}` | 获取单个 Franchise。 |
| `GET` | `/api/v1/groups` | 获取 Group 列表。 |
| `GET` | `/api/v1/groups/{key}` | 获取单个 Group。 |
| `GET` | `/api/v1/project-groups` | 获取 ProjectGroup 列表。 |
| `GET` | `/api/v1/project-groups/{key}` | 获取单个 ProjectGroup。 |
| `GET` | `/api/v1/characters` | 获取 Character 列表。 |
| `GET` | `/api/v1/characters/{key}` | 获取单个 Character。 |
| `GET` | `/api/v1/character-projects` | 获取 CharacterProject 列表。 |
| `GET` | `/api/v1/character-projects/{key}` | 获取单个 CharacterProject。 |
| `GET` | `/api/v1/character-groups` | 获取 CharacterGroup 列表。 |
| `GET` | `/api/v1/character-groups/{key}` | 获取单个 CharacterGroup。 |
| `GET` | `/api/v1/seiyuus` | 获取 Seiyuu 列表。 |
| `GET` | `/api/v1/seiyuus/{key}` | 获取单个 Seiyuu。 |
| `GET` | `/api/v1/agencies` | 获取 Agency 列表。 |
| `GET` | `/api/v1/agencies/{key}` | 获取单个 Agency。 |
| `GET` | `/api/v1/casts` | 获取 Cast 列表。 |
| `GET` | `/api/v1/casts/{key}` | 获取单个 Cast。 |
| `GET` | `/api/v1/venues` | 获取 Venue 列表。 |
| `GET` | `/api/v1/venues/{key}` | 获取单个 Venue。 |
| `GET` | `/api/v1/events` | 获取 Event 列表。 |
| `GET` | `/api/v1/events/{key}` | 获取单个 Event。 |
| `GET` | `/api/v1/events/{eventKey}/sessions` | 获取活动场次摘要列表。 |
| `GET` | `/api/v1/events/{eventKey}/timeline-items` | 获取活动 timeline items。 |
| `GET` | `/api/v1/event-cards` | 获取活动卡片读取模型。 |
| `GET` | `/api/v1/event-profiles/{eventKey}` | 获取活动详情读取模型。 |
| `GET` | `/api/v1/events/{eventKey}/sessions/{sessionKey}/profile` | 获取场次详情读取模型。 |

除健康检查外，所有公开路由都需要：

```http
Authorization: Bearer <OPENYOUMIYA_API_TOKEN>
```
