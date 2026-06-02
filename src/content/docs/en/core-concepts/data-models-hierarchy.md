---
title: Data Models & Hierarchy
description: Model boundaries, key references, and field placement rules used by OpenYoumiya API.
---

OpenYoumiya API uses a shared model dictionary across API responses, OpenAPI Schema, examples, and synchronization events.

OpenYoumiya separates **stable master data** from **dynamic behavior data**. Master-data domains define strongly typed resources such as projects, characters, songs, venues, and travel nodes. Dynamic behavior models, especially events and sessions, connect those resources through stable references instead of embedding every object into a deep tree.

---

## Model topology

### 1. Static master-data domains

Static master-data domains are the source resources referenced by other models:

- **Planning**: `Franchise -> Project` and `Project <- [ProjectGroup] -> Group`
- **Roles and casting**:
  - `Character <- [CharacterProject] -> Project`
  - `Character <- [CharacterGroup] -> Group`
  - `Character <- [Cast] -> Seiyuu -> Agency`
- **Music and discography**: `Release <- [Track] -> Song`
- **Venues and geography**: `Venue` and `Transport -> Airport / Station`

### 2. Dynamic behavior domains

Dynamic behavior domains describe real-world occurrences and connect master data by reference:

- **Events**: `Event -> [EventSession] -> Venue (reference)`
- **Other behavior relationships**:
  - `Event -> [EventTimelineItem]`
  - `EventSession -> [SessionSetlist] -> Song (reference)`
  - `Event -> Project / Group (reference)`
  - `Event / Session -> Casts / Seiyuu (reference)`

> **Design rule: relationship resources**
> Bracketed models such as `[ProjectGroup]`, `[Cast]`, and `[Track]` are **relationship resources**, not weakened child objects.
>
> Arrows show the primary reference direction. They do not mean that a model has only one parent, participant, or query path. Cross-project events, guest appearances, multi-group sessions, and people-search relationships are represented through explicit references or relationship models.

Use the intentional decoupling of **Project** and **Group** as an example:
a Group can appear in more than one Project, and the meaning of that relationship can differ by Project.
For example, `mygo` can be a regular permanent band in the `bandori` game project, while also being a central story group in an independent `our_notes` project.
This cannot be modeled by storing a single `projectKey` on the Group record. Project membership belongs in a join table.

Use `projectKey` and `groupKey` as relationship keys:

| projectKey (primary key) | groupKey (primary key) |
| :--- | :--- |
| `bandori` | `mygo` |
| `our_notes` | `mygo` |
| `our_notes` | `ave_mujica` |

In physical storage, the `planning_groups` table should contain only Group core attributes. It should not contain a single-value `project_key` column. Future relationship-specific metadata should be placed directly on the relationship record.

---

## Extending model fields

When adding or reviewing fields, classify the new data before choosing where it belongs. This keeps typed resources stable while still allowing HTTP API responses to expose convenient view data.

### 1. Core attributes

Core attributes describe the resource itself. If the value is intrinsic metadata for that entity, place it on the typed resource.

- Example: `Project.displayName` belongs to Project; `Venue.address` belongs to Venue; `Song.durationSeconds` belongs to Song.

### 2. Relationship attributes

Relationship attributes describe a link between independent resources. Use stable references for simple links, or an explicit relationship resource when the link has its own meaning or metadata.

Example: use references such as `projectKey` or `groupKey` instead of embedding complete Project or Group objects.
When connecting Projects and Groups, use `ProjectGroup` rather than `Group.projectKey`.
Use `Cast` to represent casting relationships, and use `Track` to represent release inclusion relationships.

### 3. Aggregate attributes

Aggregate attributes are usually derived, counted, denormalized, or only useful for a specific list or detail view.
**Do not write these fields into core resource tables.** They should live in read-focused HTTP responses, read models, or cacheable API output.

Example: a song-level `includedReleasesCount` should not become a persistent field on the `Song` resource.
The count should be assembled for the relevant read response from `Release` and `Track` data, so the core song record does not need to be rewritten whenever a release changes.

---

## Read models and query views

Some pages need highly aggregated data, such as child counts, compact related-resource lists, latest event summaries, or cross-domain statistics. Clients should not render those pages by issuing many small base-resource requests in parallel. OpenYoumiya models these use cases as **read-optimized query views**.

Query views are not physical fields on a single typed resource table. They are denormalized HTTP response shapes assembled from stable resources, relationship resources, and cacheable edge-side read models.

Domain-specific query views are documented inside each model domain page when they are needed.
Each query-view route must include its response Schema and a JSON response example or JSON data payload example.

---

## Naming rules

OpenYoumiya strictly applies the same naming rules across resource pages, Schema, examples, and sync Payload:

- Public JSON fields use `camelCase`.
- SQL fields use `snake_case`.
- Enum values use lowercase `snake_case`.
- Time fields use ISO 8601 strings with UTC offset, for example `2026-06-01T10:00:00+09:00`.
- Publicly cacheable responses do not include personalized `my*` fields such as `myFavorite`.

---
