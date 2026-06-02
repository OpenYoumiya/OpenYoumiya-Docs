---
title: 错误
description: 错误响应格式。
---

错误响应使用稳定的 JSON 结构：

```json
{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded"
  }
}
```

常见错误码：

- `unauthorized`
- `invalid_token`
- `rate_limited`
- `not_found`
- `internal_error`
