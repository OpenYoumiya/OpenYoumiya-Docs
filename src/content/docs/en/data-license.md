---
title: Data License
description: License and usage rules for OpenYoumiya API public data.
---

OpenYoumiya API is committed to building an open, compliant, and active ecosystem for fan developers. We use an open data license to keep public data reusable, while maintaining reasonable rules that protect platform stability.

Unless otherwise stated, public data provided by this platform is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

As long as you fully follow the attribution requirements and API usage rules below, you may use the public data in personal, community, academic research, and commercial projects. You may also copy, cache, redistribute, adapt, or derive from that data.

## Attribution requirements

To keep the ecosystem healthy and respect maintenance work, any project using OpenYoumiya public data must include clear, visible attribution in the application, documentation, about page, or data source list.

We recommend and encourage the following formats:

- Plain text:

```plaintext
Data provided by OpenYoumiya API (https://openapi.youmiya.love)
```

- Markdown:

```md
Data Source: [OpenYoumiya API](https://openapi.youmiya.love)
```

- HTML:

```html
Data Source: <a href="https://openapi.youmiya.love" target="_blank" rel="noopener noreferrer">OpenYoumiya API</a>
```

Derived data notice: if you clean, restructure, merge, or substantially derive from OpenYoumiya's original public data, clearly state that the data is based on modified OpenYoumiya source data. This avoids misleading downstream users about the data source.

## License and disclaimer scope

- **Applicable scope**: this license applies only to structured public data officially returned by OpenYoumiya API.
- **Third-party rights**: this license does not grant, and does not represent the granting of, any third-party trademark rights, character copyrights, music copyrights, performer image rights, official event branding rights, or exclusive rights held by rights holders or agencies. OpenYoumiya acts only as an integration and synchronization channel for public factual data and does not provide any endorsement for third-party intellectual property.
- **Unpublished data protection**: private source records, logs, and backend data inside the main OpenYoumiya site, or any data not yet published through public API endpoints, are not considered public data and are not covered by this license.

## API usage and rate-limit rules

OpenYoumiya API is a community project started and maintained by fans at no charge. Because server, bandwidth, and traffic costs are fully covered by the project team, every client should follow these non-abuse principles so shared resources remain fair and highly available:

- **Rate limiting**: call endpoints only within the documented rate-limit thresholds. Clients should implement local caching for static or low-frequency data to avoid repeated high-concurrency requests.
- **Credential security**: keep your API token secure. Do not hard-code it into public client source code, frontend JavaScript, or open-source repositories, where it could be stolen and abused, creating extra traffic costs for the project.
- **Abuse prevention**: malicious concurrency, crawler polling, and attempts to bypass rate limits with multiple accounts are prohibited. Requests that may endanger platform stability or create abnormal cost pressure can trigger automatic gateway defense.

For high-frequency access or special requirements:
if your fan project, event support tool, or research analysis genuinely needs quota far beyond the normal limits, contact the maintenance team in advance. We are happy to discuss technical options such as packaged data distribution, so the ecosystem can grow without exhausting self-funded server bandwidth.
