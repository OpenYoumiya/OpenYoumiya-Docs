---
title: Service Stability
description: Fair usage guidance for shared API infrastructure.
---

OpenYoumiya public data endpoints require a Bearer token. Normal community integrations are not framed around published request caps; the platform is designed to keep access straightforward for fan projects, research tools, and public data experiments.

To keep the shared service healthy:

- Cache stable or low-frequency data locally when your use case allows it.
- Avoid crawler-style polling, retry loops, and bursty concurrency that can disrupt other developers.
- Keep your API token private so leaked credentials cannot be abused.

Requests that endanger platform stability or look like automated abuse may trigger protective handling. If you are building a high-frequency integration for events, research, or community tooling, contact the maintenance team early so we can discuss a better delivery pattern.
