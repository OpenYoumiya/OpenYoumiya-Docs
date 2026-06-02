---
title: OpenYoumiya API
description: 为二创、粉丝站点、活动 Timeline、资料库和数据分析提供稳定公开数据。
---

用技术连接热爱，让二创不再受限于数据。

OpenYoumiya API 为正在构建粉丝站点、活动、声优/角色资料库、数据分析项目及各类应援工具的开发者，提供来自[OpenYoumiya主站](https://youmiya.love)稳定、结构化的公开数据访问能力。

你无需再面对脆弱的爬虫和混乱的数据格式，更不用在每个项目里重复造轮子。

- 🛠️ 我们负责：公开数据的异步同步、统一字段规范、API Token 鉴权、流控限制与高可用输出。
- 🎨 你只需负责：挥洒创意，连接热爱。

## API base

```HTTP
https://openapi.youmiya.love
```

## 项目初衷

在进行二创或相关数据分析时，获取准确、稳定且结构化的基础数据一直是一大痛点。过去，开发者们不得不把大量精力耗费在繁琐的爬虫维护、清洗混乱的数据格式和重复的底层开发上。

OpenYoumiya 的诞生，就是为了打破这种数据孤岛。我们希望通过一套规范、开放且稳定的 API，将主站的公开数据开放给每一位热爱这个圈子的开发者。

平台在底层负责数据同步与稳定输出，让你能 100% 专注于真正有創造力的业务逻辑与产品体验。

## 从这里开始

- 获取凭证：前往 Console 页面创建和管理你的 API Token。
- 鉴权方式：请求时请在 Header 中携带 Bearer 令牌：

```HTTP
Authorization: Bearer <OPENYOUMIYA_API_TOKEN>
```

- 数据一致性：OpenYoumiya API 返回的数据由主站数据异步同步至开放平台数据层，兼顾性能与实时性。
- 统一协议：后续所有资源标识（Key）的调用，请参考[数据模型与层级](./core-concepts/data-models-and-hierarchy)和[标准注册表](./standard-key-registry)文档中的统一协议字典。

## 社区与支持

在使用和开发过程中，请参考以下指南：

- [数据使用协议](./data-license) — 了解数据合规与使用边界
- [贡献指南](./contributing) — 期待你加入我们，共同完善数据生态
- [资金支持](./funding) — 感谢你帮助平台走得更远
