---
title: 标准 Key 注册表
description: OpenYoumiya 公开 Planning 资源使用的标准 key 注册表。
---

标准 Key 注册表是 OpenYoumiya 公开 `key` 值的规范清单。它为高可见度 ACG 企划及其 Planning 资源保留稳定 key，避免 API 客户端、贡献者和下游数据集为同一实体发明互不兼容的名称。

Key 字典直接在本文档中以 fenced `csv` 代码块维护。注册表页面会在构建时把这些代码块渲染成表格，因此可以在 GitHub 中 review，也可以直接复制到数据工具中。

欢迎通过 GitHub pull request 增加缺失 key、修复错误字段，或补充来源上下文。

## 注册规则

- Key 使用小写 ASCII `snake_case`。
- Key 是稳定公开标识。展示名、本地化名称或官方样式变化时，不重命名已注册 key。
- 公开引用使用已注册的 `franchiseKey`、`projectKey`、`groupKey` 等 key，不使用系统生成的 `id`。
- 已注册 key 不是对原作的权利声明，只是 OpenYoumiya 内部的数据互操作契约。
- 别名和本地化名称放进资源记录，不编码进 key 本身。
- 新增条目必须声明模型、领域和资源层级，审核后才能进入注册表。

## Planning 层级

```text
Franchise -> Project
Project <- [ProjectGroup] -> Group
```

这个层级描述引用方向，不表示对象嵌套。`Project` 可以通过 `franchiseKey` 指向上级 `Franchise`。`Group` 不再通过单值 `projectKey` 指向某个上级 Project；Project 成员关系属于 key 注册表之外的 `ProjectGroup` 关系数据。每个已注册资源仍然是独立的强类型资源。

## 新增或修改 key

提交贡献请求时，需要修改对应 Markdown 页面里的 `csv` 代码块，并提供目标 key、展示名称、模型、领域、资源层级和来源上下文。审核会检查冲突、命名一致性，以及该条目是否属于目标 key 字典。

已接受的 key 不应重命名。如果名称发生变化，应更新资源记录中的 `name`、`displayName` 和 `aliases`，并保持已注册 key 稳定。
