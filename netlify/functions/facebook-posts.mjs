const FACEBOOK_PAGE_URL = "https://www.facebook.com/Balkan2Egypt";
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
  return {
    id: post.id,
    message: getPostText(post),
    createdTime: post.created_time,
    permalinkUrl: post.permalink_url || FACEBOOK_PAGE_URL,
    imageUrl: getPostImage(post),
    mediaType: post.attachments?.data?.[0]?.media_type || null,
  };
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

  const requested = Number.parseInt(new URL(request.url).searchParams.get("limit") || "", 10);
  const limit = Number.isNaN(requested) ? DEFAULT_LIMIT : Math.min(Math.max(requested, 1), MAX_LIMIT);

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

    const posts = (payload.data || [])
      .filter((post) => post.message || post.full_picture || post.attachments?.data?.length)
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
