---
title: CharacterProject（角色与企划关系）
description: Roles Character 与 Project 关系的最小公开字段。
---

`CharacterProject` 连接一个 `Character` 与一个 `Project`。

通用的[资源 JSON 语义](../../../common-specifications/response-envelope/#资源-json-语义)定义了 API 资源对象的全字段返回、零值占位和弱引用规则。

## 模型定义

### 关系属性

关系属性描述 CharacterProject 这条连接本身。本轮只记录稳定的端点 key。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `characterKey` | string | ✓ | 被关联的 Character key。 |
| `projectKey` | string | ✓ | 被关联的 Project key。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `CharacterProject` `data` payload 形态。

### CharacterProject `data` payload

```json
{
  "id": "character_project_takamatsu_tomori_bandori",
  "key": "takamatsu_tomori_bandori",
  "characterKey": "takamatsu_tomori",
  "projectKey": "bandori"
}
```
