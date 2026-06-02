---
title: 响应结构
description: 统一响应、分页和错误载荷结构。
---

OpenYoumiya API 使用较小的统一响应结构（Response Envelope），让客户端可以一致地处理成功响应、列表元信息（分页）和错误信息。

---

## 资源 JSON 语义

当 API 响应返回已文档化的资源对象时，该对象遵循以下 JSON 响应规则，以保证 Cloudflare Workers 和 D1 等边缘环境下的类型安全：

* **全字段返回**：响应包含该资源模型定义的所有字段，客户端不需要把已文档化字段当作可能缺省（Optional/Undefined）的属性处理。
* **零值占位**：当某个字段允许为空时，API 使用该字段类型对应的空值，例如 `""`、`[]` 或 `0`，不使用 `null` 或 `undefined`。
* **弱引用**：系统生成的公开 ID 是 opaque（不透明）。跨资源引用使用稳定、全局唯一的 key，例如 `franchiseKey`、`projectKey`、`groupKey`，而不是嵌入完整资源对象。

每个已文档化的 HTTP 路由都必须提供 JSON 响应示例；当通用响应结构已在附近说明时，也可以只提供 JSON data payload 示例。领域页面定义查询视图时，也遵循同一规则。

---

## Response Envelope

所有 HTTP 接口返回的根级 JSON 对象具有完全一致的外壳结构：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `data` | object \| array | 业务核心数据负载。 |
| `meta` | object | 列表元信息。仅在涉及分页的列表请求中返回。 |
| `error` | object | 错误信息。仅在请求失败时返回。 |

### 成功响应示例（单体资源）

```json
{
  "data": {
    "projectKey": "bandori",
    "displayName": "BanG Dream!",
    "updatedAt": "2026-06-01T10:00:00+09:00"
  }
}
```

## 分页

当请求的数据集为列表时，`data` 字段固定为数组，同时网关将通过 `meta` 字段输出基于游标（Cursor-based）的分页元信息：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `limit` | number | 请求上限。单页最大返回数量（Page Size）。 |
| `cursor` | string | 当前请求传入的游标位置。 |
| `nextCursor` | string \| null | 下一页游标。若无下一页则为 `null`。 |
| `hasMore` | boolean | 是否还有下一页。 |

### 成功响应示例（分页列表）

```json
{
  "data": [
    { "groupKey": "mygo", "displayName": "MyGO!!!!" },
    { "groupKey": "ave_mujica", "displayName": "Ave_Mujica" }
  ],
  "meta": {
    "limit": 20,
    "cursor": "eyJpZCI6MTB9",
    "nextCursor": "eyJpZCI6MzB9",
    "hasMore": true
  }
}
```

## 错误

当请求失败或状态码异常时，响应根级对象只返回 `error` 字段，不返回 `data` 或 `meta`。`error` 的内部结构严格标准化：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `error.code` | string | 稳定、机器可读的字面量错误码，供客户端编写分支逻辑。 |
| `error.message` | string | 面向开发者的简短说明，不建议直接展示给最终用户。 |
| `error.details` | object | 保留的可选结构化细节字段；当前公开 API 通常不返回该字段。 |

### 错误响应示例

```json
{
  "error": {
    "code": "invalid_limit",
    "message": "limit 必须是数字"
  }
}
```
