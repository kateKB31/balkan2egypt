const FACEBOOK_PAGE_URL = "https://www.facebook.com/Balkan2Egypt";

function json(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

function getPostImage(post) {
  const attachment = post.attachments?.data?.[0];
  const subattachment = attachment?.subattachments?.data?.[0];

  return post.full_picture
    || attachment?.media?.image?.src
    || subattachment?.media?.image?.src
    || null;
}

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405, headers: { allow: "GET" } });
  }

  const pageId = Netlify.env.get("FACEBOOK_PAGE_ID");
  const accessToken = Netlify.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
  const graphVersion = Netlify.env.get("FACEBOOK_GRAPH_API_VERSION") || "v23.0";

  if (!pageId || !accessToken) {
    return json({
      configured: false,
      posts: [],
      pageUrl: FACEBOOK_PAGE_URL,
    }, {
      headers: { "cache-control": "public, max-age=60" },
    });
  }

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
  endpoint.searchParams.set("limit", "9");
  endpoint.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(endpoint, {
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      return json({
        configured: true,
        posts: [],
        pageUrl: FACEBOOK_PAGE_URL,
        error: "Facebook posts are temporarily unavailable.",
      }, {
        status: 502,
        headers: { "cache-control": "no-store" },
      });
    }

    const payload = await response.json();
    const posts = (payload.data || [])
      .filter((post) => post.message || post.full_picture || post.attachments?.data?.length)
      .map((post) => ({
        id: post.id,
        message: post.message || post.attachments?.data?.[0]?.description || "Discover more from Balkan2Egypt.",
        createdTime: post.created_time,
        permalinkUrl: post.permalink_url || FACEBOOK_PAGE_URL,
        imageUrl: getPostImage(post),
      }));

    return json({
      configured: true,
      posts,
      pageUrl: FACEBOOK_PAGE_URL,
    }, {
      headers: {
        "cache-control": "public, max-age=300, s-maxage=900, stale-while-revalidate=86400",
      },
    });
  } catch {
    return json({
      configured: true,
      posts: [],
      pageUrl: FACEBOOK_PAGE_URL,
      error: "Facebook posts are temporarily unavailable.",
    }, {
      status: 502,
      headers: { "cache-control": "no-store" },
    });
  }
}

export const config = {
  path: "/api/facebook-posts",
};
