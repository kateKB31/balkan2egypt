# Showing Facebook posts in "Discover Egypt"

The **Discover Egypt** page (`discover.html`) renders the latest posts from the
[Balkan2Egypt Facebook page](https://www.facebook.com/Balkan2Egypt) as image + text
preview cards. It reads them from the Netlify function `netlify/functions/facebook-posts.mjs`,
served at `/api/facebook-posts`.

## Two display modes

| Mode | When it applies | What visitors see |
| --- | --- | --- |
| **Native previews** (preferred) | A Facebook page access token is configured | Post cards in the site's own design: photo, date, text and a link to the post |
| **Facebook page embed** (fallback) | No token, or Facebook is unreachable | Facebook's official page-timeline embed plus a "Follow on Facebook" call to action |

The fallback needs no setup, but Facebook's embed is capped at 500px wide, needs third-party
cookies, and has a history of failing to render timelines — so the native previews are worth
configuring.

## Enabling native previews

Set these environment variables on the Netlify site
(**Site configuration → Environment variables**, or `netlify env:set`):

| Variable | Required | Notes |
| --- | --- | --- |
| `FACEBOOK_PAGE_ACCESS_TOKEN` | yes | Page access token for the Balkan2Egypt page, with the `pages_read_engagement` permission |

The function fetches `/132644799924441/posts` from Meta Graph API `v26.0` and requests
`id`, `message`, `created_time`, `permalink_url`, and `full_picture`. The access token is
read only inside the server-side function and is never sent to browser code.

Never commit the token to the repository — keep it in the Netlify environment only.

### Getting the token

1. Create an app at [developers.facebook.com](https://developers.facebook.com/apps) (type: **Business**).
2. Add the **Facebook Login** product, then open the
   [Graph API Explorer](https://developers.facebook.com/tools/explorer/).
3. Pick the app, choose **Page Access Token**, select the Balkan2Egypt page and grant
   `pages_read_engagement` (plus `pages_show_list`).
4. Short-lived tokens expire in about an hour. Exchange the token for a long-lived one via the
   [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
   ("Extend Access Token") — a page token derived from a long-lived user token does not expire.

Redeploy after setting the variables. To confirm, request `/api/facebook-posts`: it returns
`"configured": true` with a populated `posts` array once the token works. If Facebook rejects
the token the endpoint returns 502, the page falls back to the embed, and the Graph error code
is written to the function log (the token itself is never included in a response).

## Caching

Successful responses are cached at the edge for 15 minutes and can be served stale for up to a
day while revalidating or if Facebook errors, so new posts appear within minutes without the
page ever going blank during an outage.
