---
title: Errors
description: Error response format.
---

Errors use a stable JSON structure:

```json
{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded"
  }
}
```

Common codes:

- `unauthorized`
- `invalid_token`
- `rate_limited`
- `not_found`
- `internal_error`
