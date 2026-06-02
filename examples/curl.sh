#!/usr/bin/env sh
curl -H "Authorization: Bearer $OPENYOUMIYA_API_TOKEN" \
  "https://openapi.youmiya.love/v1/events"
