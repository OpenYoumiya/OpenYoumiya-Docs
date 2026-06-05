---
title: Overview
description: How OpenYoumiya API data is sourced and organized.
---

OpenYoumiya API provides highly available structured public data from the main site for the fan-creation community.

This page explains the open platform architecture, data flow, and documentation structure so you can integrate with the system more effectively.

## Architecture and data flow

Understanding the data lifecycle helps you build more robust client applications. OpenYoumiya open platform is designed around these boundaries:

- Single source of truth: the main OpenYoumiya site is the only factual and physical source for public data.
- Edge proxy layer: the API gateway reverse-proxies requests through Cloudflare's global network. Client requests first arrive at Cloudflare edge nodes, pass compliance and service-stability checks, then fetch raw data from the main site.
- Freshness guarantee: because the platform uses direct origin fetches, API responses stay fully synchronized with the data shown on the main site frontend, without asynchronous lag.
- Console responsibility: Console is only the authentication center for managing API tokens and viewing API usage. It does not maintain or modify data.

## Documentation structure

| Section | Purpose |
| :--- | :--- |
| Start pages | Explain authentication, service stability guidance, and unified error handling. |
| Core concepts | Describe the current data model hierarchy and the underlying architecture. |
| Common specifications | Define base fields and the standard response structure shared by all API responses. |
| Core model definitions | Document the concrete JSON field structures for stable public resources such as projects, seiyuu, and live setlists. |
