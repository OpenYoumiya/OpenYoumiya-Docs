---
title: Standard Key Registry
description: Canonical Planning keys reserved for public OpenYoumiya resources.
---

The Standard Key Registry is the normative list of public `key` values used by OpenYoumiya. It reserves stable keys for high-visibility ACG franchises and their resources so API clients, contributors, and downstream datasets do not invent incompatible names for the same entity.

Key dictionaries are maintained in the Chinese documentation as fenced `csv` blocks. English registry pages may provide context or navigation, but the Chinese Markdown pages are the canonical source for registry data.

Contributions are welcome. Open a GitHub pull request to add missing keys, fix incorrect fields, or improve source context.

## Registry rules

- Keys are lowercase ASCII `snake_case`.
- Keys are stable public identifiers. Do not rename a registered key when the display name, localization, or official styling changes.
- Public references use registered keys such as `franchiseKey`, `projectKey`, and `groupKey`, not generated `id` values.
- A registered key is not an ownership claim over the source work. It is a data interoperability contract inside OpenYoumiya.
- Add aliases and localized names to the resource record. Do not encode aliases into the key itself.
- New entries must declare their model/domain and resource level before they are accepted.

## Planning hierarchy

```text
Franchise -> Project
Project <- [ProjectGroup] -> Group
```

The hierarchy describes reference direction, not object nesting. A `Project` can point to a parent `Franchise` with `franchiseKey`. A `Group` does not point to one parent Project with `projectKey`; Project membership belongs in `ProjectGroup` relationship data outside this key registry. Each registered resource remains an independent strongly typed resource.

## Adding or changing a key

Open a GitHub pull request that edits the matching Chinese Markdown `csv` block with the proposed key, display name, model/domain, resource level, and source context. Reviewers check collisions, naming consistency, and whether the entry belongs in the target key dictionary.

Accepted keys should not be renamed. If a name changes, update `name`, `displayName`, and `aliases` on the resource record while keeping the registered key stable.
