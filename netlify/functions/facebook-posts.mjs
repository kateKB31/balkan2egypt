const FACEBOOK_PAGE_URL = "https://www.facebook.com/Balkan2Egypt";
const FACEBOOK_PAGE_ID = "132644799924441";
const GRAPH_API_VERSION = "v26.0";
const POST_FIELDS = "id,message,created_time,permalink_url,full_picture";
const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 24;

function json(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

function normalisePost(post) {
  return {
    id: post.id,
    message: post.message || "Discover more from Balkan2Egypt.",
    createdTime: post.created_time,
    permalinkUrl: post.permalink_url || FACEBOOK_PAGE_URL,
    imageUrl: post.full_picture || null,
  };
}

function newestFirst(left, right) {
  return Date.parse(right.created_time || "") - Date.parse(left.created_time || "");
}

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405, headers: { allow: "GET" } });
  }

  const accessToken = Netlify.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");

  if (!accessToken) {
    return json({
      configured: false,
      posts: [],
      pageUrl: FACEBOOK_PAGE_URL,
    }, {
      headers: { "cache-control": "public, max-age=60" },
    });
  }

  const requested = Number.parseInt(new URL(request.url).searchParams.get("limit") || "", 10);
  const limit = Number.isNaN(requested) ? DEFAULT_LIMIT : Math.min(Math.max(requested, 1), MAX_LIMIT);

  const endpoint = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${FACEBOOK_PAGE_ID}/posts`);
  endpoint.searchParams.set("fields", POST_FIELDS);
  endpoint.searchParams.set("limit", String(limit));
  endpoint.searchParams.set("access_token", accessToken);

  const failure = (reason) => json({
    configured: true,
    posts: [],
    pageUrl: FACEBOOK_PAGE_URL,
    error: reason,
  }, {
    status: 502,
    headers: { "cache-control": "no-store" },
  });

  try {
    const response = await fetch(endpoint, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload) {
      // Graph error messages can be verbose; keep the public response generic but log the cause.
      console.warn("Facebook Graph request failed", response.status, payload?.error?.code, payload?.error?.type);
      return failure("Facebook posts are temporarily unavailable.");
    }

    const posts = (Array.isArray(payload.data) ? payload.data : [])
      .filter((post) => post?.id)
      .sort(newestFirst)
      .map(normalisePost);

    return json({
      configured: true,
      posts,
      pageUrl: FACEBOOK_PAGE_URL,
    }, {
      headers: {
        // Keep serving the last good response while revalidating, and after an upstream error.
        "cache-control": "public, max-age=300, s-maxage=900, stale-while-revalidate=86400, stale-if-error=86400",
      },
    });
  } catch (error) {
    console.warn("Facebook Graph request threw", error?.name || "Error");
    return failure("Facebook posts are temporarily unavailable.");
  }
}

export const config = {
  path: "/api/facebook-posts",
};
