---
title: Rate Limits
description: Request quota and retry behavior.
---

OpenYoumiya public data endpoints require a Bearer token. The gateway applies a two-layer rate limiting strategy:

- **Requests that fail authentication**: rate limited by client IP using the `anonymous` quota. This protects the service from missing-token or invalid-token abuse.
- **Requests that authenticate successfully**: rate limited by the effective API token quota. User-specific quota overrides take precedence when configured; otherwise the token's tier default is used.

Default quotas:

| tier | Quota |
| :--- | :--- |
| `anonymous` | 30 requests / 60s |
| `default` | 60 requests / 60s |
| `plus` | 300 requests / 60s |

When the API returns `429`, use the response headers to decide when to retry:

- `Retry-After`: returned only on `429`, in seconds.
- `X-RateLimit-Limit`: request limit for the current window.
- `X-RateLimit-Remaining`: remaining requests in the current window.
- `X-RateLimit-Reset`: current window reset time as a Unix seconds timestamp.

Clients should honor `Retry-After` first, use backoff, and avoid retry loops.
