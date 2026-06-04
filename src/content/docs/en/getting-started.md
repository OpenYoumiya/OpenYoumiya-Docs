---
title: Getting Started
description: Create a token and call the OpenYoumiya API.
---

OpenYoumiya API wraps and exposes structured data from the main OpenYoumiya site. This guide helps you complete authentication and send your first API request in about three minutes.

1. Sign in to the [Console](https://console.youmiya.love).
2. Open credential management and create an API token.
3. Call the API with `Authorization: Bearer <OPENYOUMIYA_API_TOKEN>`.

```bash
curl -H "Authorization: Bearer $OPENYOUMIYA_API_TOKEN" \
  "https://open.youmiya.love/api/v1/events"
```

## Security note

This token grants access under your account, and project bandwidth and traffic costs are covered by the team. Keep it private. Do not hard-code it into public frontend source code or open-source repositories, where it could be stolen and abused.
