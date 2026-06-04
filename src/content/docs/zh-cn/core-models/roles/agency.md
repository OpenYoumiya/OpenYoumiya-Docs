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

公开 OpenAPI 规范是路由契约的事实来源。

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/agencies` | 列出 Agencies。 |
| `GET` | `/api/v1/agencies/{key}` | 通过 `key` 获取单个 Agency。 |

列表路由支持 cursor 分页：

| Query | Type | Description |
| --- | --- | --- |
| `limit` | number | 每页数量。默认 `100`，最大 `500`。 |
| `cursor` | opaque string | 上一次响应 `meta.nextCursor` 返回的 opaque cursor。 |

列表响应包含 `meta.limit`、`meta.cursor`、`meta.nextCursor` 和 `meta.hasMore`。

### Agency `data` payload

```json
{
  "id": "agency_aoni_production",
  "key": "aoni_production",
  "name": "青二プロダクション"
}
```

### Agency 列表响应

```json
{
  "data": [
    {
      "id": "agency_aoni_production",
      "key": "aoni_production",
      "name": "青二プロダクション"
    }
  ],
  "meta": {
    "limit": 100,
    "cursor": "",
    "nextCursor": null,
    "hasMore": false
  }
}
```
