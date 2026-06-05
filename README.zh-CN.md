# OpenYoumiya Docs

[English](./README.md)

OpenYoumiya Docs 是 OpenYoumiya API 的公开文档站。

用技术连接热爱，让二创不再受限于数据。

OpenYoumiya API 为粉丝站点、活动工具、声优与角色资料库、数据分析项目和应援工具提供来自 [OpenYoumiya 主站](https://youmiya.love)的稳定结构化公开数据。

你不再需要从脆弱的爬虫、不一致的数据格式和重复的底层接入工作开始。公开数据同步、统一字段约定、API token 认证、用量可见性、服务稳定性保护和高可用交付由平台负责；开发者可以把精力放在创意、体验、研究、可视化和真正有趣的功能上。

我们的目标很简单：让可靠的公开数据能够被每一位热爱这个社区的人使用，并让更好的工具建立在共同的基础之上。

- 主站：[https://youmiya.love](https://youmiya.love)
- 文档站：[https://docs.youmiya.love](https://docs.youmiya.love)
- API base：[https://open.youmiya.love](https://open.youmiya.love)
- 控制台：[https://console.youmiya.love](https://console.youmiya.love)
- 数据协议：CC BY 4.0
- 资金支持：[爱发电](https://ifdian.net/a/OpenYoumiya)
- 联系邮箱：[hina@youmiya.love](mailto:hina@youmiya.love)

## 可以用来做什么

- 活动 Timeline、日程、提醒和归档工具。
- 声优、出演关系、角色、组合、企划、系列资料库。
- 数据分析、排行、可视化和研究项目。
- 粉丝站点集成、轻量小组件和展示页面。
- 需要稳定公开元数据的各类应援和二创工具。

## API 契约

- 数据来源：公开数据从 OpenYoumiya 主站同步到开放平台数据层。
- 认证方式：公开数据接口需要使用 Console 创建的 API token，并在请求头中发送 `Authorization: Bearer <OPENYOUMIYA_API_TOKEN>`。
- 响应结构：成功响应使用 `data` 和可选的 `meta`；错误响应在根节点返回 `error` 对象。
- 用量可见性：Console 会展示 API token 的调用用量，方便开发者了解集成运行情况。
- 服务稳定性：客户端应缓存稳定数据，避免影响共享可用性的异常轮询或高并发调用。
- 数据协议：除非另有说明，公开数据采用 CC BY 4.0；发布集成时应提供署名。

## 文档结构

- 开始：首页、快速开始、认证、API Reference、错误处理。
- 核心概念：概览、数据模型与层级。
- 通用规范：基础字段、响应结构。
- 核心模型定义：企划、角色、音乐与唱片、活动、场馆与设施、远征。
- 社区与支持：数据使用协议、贡献指南、资金支持。

## 从这里开始

1. 阅读文档：[https://docs.youmiya.love](https://docs.youmiya.love)。
2. 在 [Console](https://console.youmiya.love) 创建 API token。
3. 使用 Bearer token 调用 API base：[https://open.youmiya.love](https://open.youmiya.love)。
4. 使用数据模型层级和标准注册表作为资源 key 的协议字典。
5. 发布集成前，请阅读数据使用协议、贡献流程和资金支持页面。

```http
Authorization: Bearer <OPENYOUMIYA_API_TOKEN>
```

## 标准注册表修改

标准注册表的修改需要通过 PR 提交。请修改对应的注册表文件，并在 PR 中提供足够的审核上下文：

- 英文注册表索引：`src/content/docs/en/standard-key-registry/index.md`
- 中文注册表索引：`src/content/docs/zh-cn/standard-key-registry/index.md`
- 企划示例：`src/content/docs/en/standard-key-registry/planning/bang-dream.md` 和 `src/content/docs/zh-cn/standard-key-registry/planning/bang-dream.md`

## 文档 Roadmap

当前文档已经定义平台形态、稳定模型词汇、通用响应结构、认证模型、服务稳定性说明和社区使用规则。下一步最值得补充的是：

- 面向公开路由、查询参数和响应示例的端点级 API Reference。
- 给客户端镜像或缓存 API 数据使用的缓存、新鲜度和版本规则。
- 主站 OpenYoumiya 数据同步使用的来源要求和审核规范。
- 更多可复制的 TypeScript、curl、静态站点集成示例。
- 后续 API 契约变化的 Changelog 和迁移说明。

## 命令

安装依赖：

```bash
npm install
```

本地运行文档站：

```bash
npm run dev
```

运行静态检查：

```bash
npm test
```

构建生产站点：

```bash
npm run build
```

构建产物目录：

```bash
dist
```

## 部署

使用 Cloudflare Pages 部署。

- 构建命令：`npm run build`
- 输出目录：`dist`
- 生产域名：`docs.youmiya.love`

## 调试

运行 Astro dev server，然后打开终端输出的本地地址：

```bash
npm run dev
```

如果文档路由或 API reference 内容不符合预期，先运行：

```bash
npm test
npm run build
```
