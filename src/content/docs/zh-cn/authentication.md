---
title: 认证
description: OpenYoumiya API 的 Bearer token 认证方式。
---

OpenYoumiya API 请求使用 Bearer token：

```http
Authorization: Bearer <OPENYOUMIYA_API_TOKEN>
```

Token 只会在创建时显示一次。请把 token 保存在服务端密钥管理系统中，不要嵌入公开前端代码。

Token metadata 可能会在边缘短暂缓存；撤销 token 后，平台会主动失效缓存，并最终由权威 token 存储拒绝旧 token。
