---
title: 数据模型与层级
description: OpenYoumiya API 使用的模型边界、key 引用与字段放置规则。
---

OpenYoumiya API 使用统一模型字典，覆盖 API 响应、OpenAPI Schema、示例和同步事件。

OpenYoumiya 将**稳定主数据**与**动态行为数据**分开建模。主数据域定义企划、角色、歌曲、场馆、交通节点等强类型资源；动态行为模型，尤其是活动与场次，通过稳定引用连接这些资源，而不是把所有对象嵌套成一棵深树。

---

## 🏗️ 模型拓扑

### 1. 静态主数据域

静态主数据域是被其他模型引用的源资源：

* **企划**： `Franchise -> Project` 以及 `Project <- [ProjectGroup] -> Group`
* **角色与出演**：
  * `Character <- [CharacterProject] -> Project`
  * `Character <- [CharacterGroup] -> Group`
  * `Character <- [Cast] -> Seiyuu -> Agency`
* **音乐与唱片**： `Release <- [Track] -> Song`
* **场馆与地理**： `Venue` 以及 `Transport -> Airport / Station`

### 2. 动态行为域

动态行为域描述现实发生的行为，并通过引用连接主数据：

* **活动**： `Event -> [EventSession] -> Venue (引用)`
* **其他行为关联**：
  * `Event -> [EventTimelineItem]`
  * `EventSession -> [SessionSetlist] -> Song (引用)`
  * `Event -> Project / Group (引用)`
  * `Event / Session -> Casts / Seiyuux (引用)`

> ⚙️ **设计规范：关于关系资源**
> 方括号模型如 `[ProjectGroup]`、`[Cast]`、`[Track]`等，是**关系资源**，不是被弱化的子对象。
>
> 箭头表示主要引用方向，不表示一个模型只能有一个父级、参与方或查询路径。跨企划活动、嘉宾出演、多组合场次和人物检索关系都通过明确引用或关系模型表达。

以 **Project** 与 **Group** 的有意解耦为例：
一个 Group 可以出现在多个 Project 中，而且这个关系在不同 Project 里的含义可以不同
（例如，`mygo` 在 `bandori` 手游企划里可以是一个普通常驻乐队，同时又可以在独立的 `our_notes` 企划里作为核心故事组合存在）。
这不能通过在 Group 记录上存单值 `projectKey` 来建模，Project 成员关系应放在联结表中。

用 `projectKey` 与 `groupKey` 作为关系 Key：

| projectKey (主键) | groupKey (主键) |
| :--- | :--- |
| `bandori` | `mygo` |
| `our_notes` | `mygo` |
| `our_notes` | `ave_mujica` |

在物理存储中，`planning_groups` 表只应包含 Group 的主属性，不应包含单值 `project_key` 列。未来的关系专属元数据，也应直接放在这条关系记录上。

---

## 🛠️ 扩展模型字段时如何放置

新增或评审字段时，先判断这个数据属于哪类职责，再决定它应该放在哪里。这样可以保持强类型资源稳定，同时允许 HTTP API 响应提供适合页面展示的读取数据。

### 1. 主属性

主属性描述资源自身。如果某个值是该实体固有的元数据，就放在对应的强类型资源上。

* *示例*：`Project.displayName` 属于 Project；`Venue.address` 属于 Venue；`Song.durationSeconds` 属于 Song。

### 2. 关联属性

关联属性描述两个独立资源之间的连接。简单连接使用稳定引用；当连接本身有业务含义或元数据时，使用明确的关系资源。

*示例*：使用 `projectKey`、`groupKey` 等引用，不嵌入完整的 Project 或 Group 对象；
连接 Project 与 Group 时，使用 `ProjectGroup`，而不是 `Group.projectKey`。
使用 `Cast` 表达出演关系，使用 `Track` 表达收录关系。

### 3. 聚合属性

聚合属性通常是派生、统计、反规范化，或只服务于特定列表和详情视图的数据。
**不要把这类字段写入核心资源表**；它们应存在于面向读取的 HTTP 响应、读模型或可缓存的 API 输出中。

*示例*：歌曲层面的 `includedReleasesCount` 不应成为 `Song` 资源上的持久字段。
这个计数应在相关读取响应中根据 `Release` 和 `Track` 数据组装出来，避免每次发行物变化时都回写核心歌曲记录。

---

## 🔍 读模型与查询视图

部分页面需要高度聚合的数据，例如子项数量、关联资源简表、最新活动摘要或跨域统计。客户端不应通过并发发起大量基础资源请求来渲染这类页面。OpenYoumiya 将这类场景建模为**面向读取优化的查询视图**。

查询视图不是某一张强类型资源表上的物理字段。它是由稳定资源、关系资源和可缓存的边缘侧读模型组装出的反规范化 HTTP 响应结构。

具体领域只有在需要查询视图时，才在对应模型领域页面内定义。
每个查询视图路由都必须包含响应 Schema，并提供 JSON 响应示例或 JSON data payload 示例。

---

## 📝 命名规则

OpenYoumiya 在资源页面、Schema、示例和同步 Payload 中统一严格执行以下命名规则：

* 公开 JSON 字段使用 `camelCase`。
* SQL 字段使用 `snake_case`。
* 枚举值使用小写 `snake_case`。
* 时间字段使用带 UTC offset 的 ISO 8601 字符串（例如：`2026-06-01T10:00:00+09:00`）。
* 可公共缓存的响应不包含个性化 `my*` 字段（如 `myFavorite`）。

---
