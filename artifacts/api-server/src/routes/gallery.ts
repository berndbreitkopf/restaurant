import { Router, type IRouter } from "express";
import { db, galleryImagesTable } from "@workspace/db";
import { CreateGalleryImageBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/gallery", async (_req, res): Promise<void> => {
  const images = await db
    .select()
    .from(galleryImagesTable)
    .orderBy(galleryImagesTable.sortOrder, galleryImagesTable.createdAt);
  res.json(images);
});

router.post("/gallery", async (req, res): Promise<void> => {
  const parsed = CreateGalleryImageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [image] = await db.insert(galleryImagesTable).values(parsed.data).returning();
  res.status(201).json(image);
});

export default router;
