---
title: Response envelope
description: Shared response, pagination, and error payload structure.
---

OpenYoumiya API uses a small shared response envelope so clients can handle successful responses, list metadata such as pagination, and errors consistently.

---

## Resource JSON semantics

When an API response returns a documented resource object, the object follows these JSON response rules for type safety in edge environments such as Cloudflare Workers and D1:

- **Full-field response**: the response includes every field defined for that resource model, so clients do not need to treat documented fields as optional or undefined properties.
- **Zero-value placeholders**: when a field is allowed to be empty, the API uses that field type's empty value, such as `""`, `[]`, or `0`, instead of `null` or `undefined`.
- **Weak references**: generated public IDs are opaque. Cross-resource references use stable globally unique keys such as `franchiseKey`, `projectKey`, and `groupKey` instead of embedding complete resource objects.

Every documented HTTP route must include a JSON response example, or a JSON data payload example when the common response envelope is already documented nearby. Query views follow the same rule when a domain page defines them.

---

## Response Envelope

Every HTTP endpoint returns a root-level JSON object with the same envelope structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `data` | object \| array | Core business payload. |
| `meta` | object | List metadata. Returned only for paginated list requests. |
| `error` | object | Error payload. Returned only when the request fails. |

### Successful response example, single resource

```json
{
  "data": {
    "projectKey": "bandori",
    "displayName": "BanG Dream!",
    "updatedAt": "2026-06-01T10:00:00+09:00"
  }
}
```

## Pagination

When a request returns a list, `data` is always an array and the gateway returns cursor-based pagination metadata through `meta`:

| Field | Type | Description |
| :--- | :--- | :--- |
| `limit` | number | Requested page size. |
| `cursor` | string | Cursor position passed by the current request. |
| `nextCursor` | string \| null | Cursor for the next page. `null` means there is no next page. |
| `hasMore` | boolean | Whether another page is available. |

### Successful response example, paginated list

```json
{
  "data": [
    { "groupKey": "mygo", "displayName": "MyGO!!!!" },
    { "groupKey": "ave_mujica", "displayName": "Ave_Mujica" }
  ],
  "meta": {
    "limit": 20,
    "cursor": "eyJpZCI6MTB9",
    "nextCursor": "eyJpZCI6MzB9",
    "hasMore": true
  }
}
```

## Error

When a request fails or the status code is abnormal, the root-level response object returns only `error` and does not include `data` or `meta`. The `error` object has a strictly standardized structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| `error.code` | string | Stable, machine-readable literal error code for client branching logic. |
| `error.message` | string | Short developer-facing message. It is not recommended for direct display to end users. |
| `error.details` | object | Reserved optional structured details field. The current public API usually does not return this field. |

### Error response example

```json
{
  "error": {
    "code": "invalid_limit",
    "message": "limit 必须是数字"
  }
}
```
