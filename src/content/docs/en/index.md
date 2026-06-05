---
title: OpenYoumiya API
description: Stable public data for fan projects, timelines, databases, analytics, and creative tools.
---

Connect passion with technology, so fan projects are no longer limited by data.

OpenYoumiya API provides stable, structured access to public data from the [main OpenYoumiya site](https://youmiya.love) for developers building fan sites, event tools, seiyuu and character databases, analytics projects, and support utilities.

You no longer need to start from fragile crawlers, inconsistent data formats, or repeated low-level plumbing.

- We handle public data synchronization, unified field conventions, service stability protections, and highly available delivery.
- You focus on the idea, the experience, and the work that connects the community.

## API base

```http
https://open.youmiya.love
```

## The Why

Accurate, stable, structured base data has always been one of the hardest parts of building fan projects or data analysis tools. In the past, developers had to spend too much effort maintaining crawlers, cleaning messy data formats, and rebuilding the same foundations from scratch.

OpenYoumiya exists to break down those data silos. We want to provide a standardized, open, and stable API that makes public data from the main site available to every developer who cares about this community.

The platform handles data synchronization and stable output at the infrastructure layer, so you can focus fully on creative product logic and user experience.

## Start here

- Get credentials: create and manage your API token in [Console](https://console.youmiya.love).
- Authenticate requests by sending a Bearer token in the request header:

```http
Authorization: Bearer <OPENYOUMIYA_API_TOKEN>
```

- Data consistency: OpenYoumiya API returns public data synchronized from the main site into the open platform data layer, balancing performance and freshness.
- Shared protocol: use the [Data Models & Hierarchy](./core-concepts/data-models-hierarchy/) and [Standard Key Registry](./standard-key-registry/) docs as the protocol dictionary for resource keys.

## Community and support

Before building or publishing an integration, review these guides:

- [Data License](./data-license/) - understand data compliance and usage boundaries.
- [Contributing](./contributing/) - join us in improving the data ecosystem.
- [Funding](./funding/) - help the platform stay available for the long term.
