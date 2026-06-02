---
title: Authentication
description: Bearer token authentication for OpenYoumiya API.
---

OpenYoumiya API requests use Bearer tokens:

```http
Authorization: Bearer <OPENYOUMIYA_API_TOKEN>
```

Tokens are shown once when created. Store them in your server-side secret manager. Do not embed tokens in public frontend code.

Token metadata may be cached briefly at the edge, but revoked tokens are invalidated by the platform and eventually rejected by the authoritative token store.
