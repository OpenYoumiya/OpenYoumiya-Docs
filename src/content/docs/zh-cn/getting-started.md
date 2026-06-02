---
title: 快速开始
description: 创建 token 并调用 OpenYoumiya API。
---

OpenYoumiya API 封装并公开了主站的结构化数据。本指南将帮助你在 3 分钟内完成鉴权并成功发起第一次 API 请求。

1. 登录 [Console](https://console.youmiya.love)。
2. 进入凭证管理页面创建一个 API Token。
3. 使用 `Authorization: Bearer <OPENYOUMIYA_API_TOKEN>` 调用 API。

```bash
curl -H "Authorization: Bearer $OPENYOUMIYA_API_TOKEN" \
  "https://openapi.youmiya.love/v1/events"
```

⚠️ 安全规范

该 Token 拥有你账号的所有访问权限，且项目服务器带宽及流量成本由团队全额自费。请务必妥善保管，切勿硬编码至公开的前端源码或开源代码仓库中，以防被恶意盗刷。
