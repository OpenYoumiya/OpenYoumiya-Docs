#!/usr/bin/env sh
curl -H "Authorization: Bearer $OPENYOUMIYA_API_TOKEN" \
  "https://open.youmiya.love/api/v1/events"
