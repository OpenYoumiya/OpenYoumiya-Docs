---
title: Airport（机场）
description: Travel Airport 最小公开字段。
---

`Airport` 是远征数据使用的机场资源。



## 模型定义

### 主属性

主属性描述 Airport 自身。本轮只记录全局稳定的最小字段。

| Field | Type | supported | Description |
| --- | --- | --- | --- |
| `id` | string | ✓ | 由 `key` 生成的稳定公开 ID；客户端应视为 opaque。 |
| `key` | string | ✓ | 全局唯一稳定 key，用于过滤和跨域引用。 |
| `name` | string | ✓ | 规范名称。 |

其他字段会在公开契约稳定后再补充。

## HTTP 路由

公开 OpenAPI 规范是路由契约的事实来源。本节只展示最小 `Airport` `data` payload 形态。

### Airport `data` payload

```json
{
  "id": "airport_haneda",
  "key": "haneda",
  "name": "Haneda Airport"
}
```
