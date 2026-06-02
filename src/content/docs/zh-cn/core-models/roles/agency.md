---
title: Agency（事务所）
description: Roles Agency 最小公开字段。
---

`Agency` 是声优所属事务所、经纪公司或管理组织资源。



## 模型定义

### 主属性

主属性描述 Agency 自身。本轮只记录全局稳定的最小字段。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `name` | string | ✓ | 规范名称。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `Agency` `data` payload 形态。

### Agency `data` payload

```json
{
  "id": "agency_aoni_production",
  "key": "aoni_production",
  "name": "青二プロダクション"
}
```
