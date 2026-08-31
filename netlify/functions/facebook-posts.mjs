const FACEBOOK_PAGE_URL = "https://www.facebook.com/Balkan2Egypt";
const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 24;
const SUCCESS_CACHE_CONTROL = "public, max-age=300, s-maxage=900, stale-while-revalidate=86400, stale-if-error=86400";

function json(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

function pickImage(attachment) {
  const subattachment = attachment?.subattachments?.data?.[0];

  return attachment?.media?.image?.src
    || subattachment?.media?.image?.src
    || null;
}

function getPostImage(post) {
  return post.full_picture || pickImage(post.attachments?.data?.[0]) || null;
}

function getPostText(post) {
  const attachment = post.attachments?.data?.[0];

  return post.message
    || attachment?.title
    || attachment?.description
    || "Discover more from Balkan2Egypt.";
}

function normalisePost(post) {
  if (!post?.id || !post.created_time) return null;

  const attachment = post.attachments?.data?.[0];
  const hasContent = post.message || post.full_picture || attachment;
  if (!hasContent) return null;

  const imageUrl = getPostImage(post);
  const message = getPostText(post);

  return {
    id: post.id,
    message,
    createdTime: post.created_time,
    permalinkUrl: post.permalink_url || FACEBOOK_PAGE_URL,
    imageUrl,
    mediaType: post.attachments?.data?.[0]?.media_type || null,
  };
}

function getLimit(requestUrl) {
  const requested = Number.parseInt(new URL(requestUrl).searchParams.get("limit") || "", 10);
  return Number.isNaN(requested) ? DEFAULT_LIMIT : Math.min(Math.max(requested, 1), MAX_LIMIT);
}

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405, headers: { allow: "GET" } });
  }

  const accessToken = Netlify.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
  // The page id is optional: a page access token already identifies its own page.
  const pageId = Netlify.env.get("FACEBOOK_PAGE_ID") || "me";
  const graphVersion = Netlify.env.get("FACEBOOK_GRAPH_API_VERSION") || "v23.0";

  if (!accessToken) {
    return json({
      configured: false,
      posts: [],
      pageUrl: FACEBOOK_PAGE_URL,
    }, {
      headers: { "cache-control": "public, max-age=60" },
    });
  }

  const limit = getLimit(request.url);

  const fields = [
    "id",
    "message",
    "created_time",
    "permalink_url",
    "full_picture",
    "attachments{media_type,media,target,title,description,subattachments{media,target}}",
  ].join(",");
  const endpoint = new URL(`https://graph.facebook.com/${graphVersion}/${encodeURIComponent(pageId)}/posts`);
  endpoint.searchParams.set("fields", fields);
  endpoint.searchParams.set("limit", String(limit));

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
      headers: {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      signal: AbortSignal.timeout(8000),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload) {
      // Graph error messages can be verbose; keep the public response generic but log the cause.
      console.warn("Facebook Graph request failed", response.status, payload?.error?.code, payload?.error?.type);
      return failure("Facebook posts are temporarily unavailable.");
    }

    const posts = (Array.isArray(payload.data) ? payload.data : [])
      .map(normalisePost)
      .filter(Boolean);

    return json({
      configured: true,
      posts,
      pageUrl: FACEBOOK_PAGE_URL,
    }, {
      headers: {
        // Keep serving the last good response while revalidating, and after an upstream error.
        "cache-control": SUCCESS_CACHE_CONTROL,
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
