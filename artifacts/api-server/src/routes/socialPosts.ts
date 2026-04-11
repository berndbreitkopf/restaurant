import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, socialPostsTable } from "@workspace/db";
import {
  CreateSocialPostBody,
  DeleteSocialPostParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/social-posts", async (_req, res): Promise<void> => {
  const posts = await db
    .select()
    .from(socialPostsTable)
    .orderBy(sql`${socialPostsTable.createdAt} desc`);
  res.json(posts);
});

router.post("/social-posts", async (req, res): Promise<void> => {
  const parsed = CreateSocialPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const publishNow = parsed.data.publishNow ?? false;
  const status = publishNow ? "published" : "draft";
  const publishedAt = publishNow ? new Date() : null;

  const [post] = await db
    .insert(socialPostsTable)
    .values({
      content: parsed.data.content,
      imageUrl: parsed.data.imageUrl ?? null,
      platforms: parsed.data.platforms,
      status,
      publishedAt,
    })
    .returning();
  res.status(201).json(post);
});

router.delete("/social-posts/:id", async (req, res): Promise<void> => {
  const params = DeleteSocialPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [post] = await db
    .delete(socialPostsTable)
    .where(eq(socialPostsTable.id, params.data.id))
    .returning();
  if (!post) {
    res.status(404).json({ error: "Social post not found" });
    return;
  }
  res.sendStatus(204);
});

router.get("/social-posts/stats", async (_req, res): Promise<void> => {
  const posts = await db.select().from(socialPostsTable);
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const draftPosts = posts.filter((p) => p.status === "draft").length;

  let instagramPosts = 0;
  let facebookPosts = 0;
  let tiktokPosts = 0;

  for (const post of posts) {
    if (post.platforms.includes("instagram")) instagramPosts++;
    if (post.platforms.includes("facebook")) facebookPosts++;
    if (post.platforms.includes("tiktok")) tiktokPosts++;
  }

  res.json({
    totalPosts,
    publishedPosts,
    draftPosts,
    instagramPosts,
    facebookPosts,
    tiktokPosts,
  });
});

export default router;
