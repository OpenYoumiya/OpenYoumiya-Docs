---
title: Event（活动）
description: Event 最小公开字段。
---

`Event` 是活动主资源。

Project、Group、Cast、Seiyuu、Session、Venue、Timeline、Setlist 等数据属于关系或读取视图，不写进 Event 主属性。

通用的[资源 JSON 语义](../../../common-specifications/response-envelope/#资源-json-语义)定义了 API 资源对象的全字段返回、零值占位和弱引用规则。

## 模型定义

### 主属性

主属性描述 Event 自身。本轮只记录全局稳定的最小字段。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `name` | string | ✓ | 规范名称。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `Event` `data` payload 形态。

### Event `data` payload

```json
{
  "id": "event_mygo_9th",
  "key": "mygo_9th",
  "name": "MyGO!!!!! 9th LIVE"
}
```
