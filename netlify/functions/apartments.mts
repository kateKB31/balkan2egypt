import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { apartments } from "../../db/schema.js";

export default async function handler(request: Request) {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, {
      status: 405,
      headers: { allow: "GET" },
    });
  }

  const records = await db.select().from(apartments).orderBy(desc(apartments.createdAt));

  return Response.json({
    apartments: records.map(({ title, createdAt: _createdAt, ...apartment }) => ({
      ...apartment,
      name: title,
    })),
  }, {
    headers: { "cache-control": "public, max-age=60" },
  });
}

export const config = {
  path: "/api/apartments",
};
