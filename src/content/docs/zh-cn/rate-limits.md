---
title: 限流
description: 请求配额和重试行为。
---

OpenYoumiya 公开数据接口需要使用 Bearer token。网关使用双层限流策略：

- **未通过认证的请求**：按客户端 IP 使用 `anonymous` 配额限流，用于防止无 token 或错误 token 请求被滥用。
- **认证成功的请求**：按 API token 的有效配额限流。若维护者为用户配置了专属配额，则优先使用用户配额；否则使用 token 所属 tier 的默认配额。

默认配额如下：

| tier | 配额 |
| :--- | :--- |
| `anonymous` | 30 requests / 60s |
| `default` | 60 requests / 60s |
| `plus` | 300 requests / 60s |

当 API 返回 `429` 时，请根据响应头判断何时重试：

- `Retry-After`：仅在 `429` 响应中返回，表示建议等待的秒数。
- `X-RateLimit-Limit`：当前窗口的请求上限。
- `X-RateLimit-Remaining`：当前窗口剩余可用请求数。
- `X-RateLimit-Reset`：当前窗口重置时间，格式为 Unix seconds timestamp。

客户端应优先遵守 `Retry-After`，并使用退避策略，避免无限重试。
