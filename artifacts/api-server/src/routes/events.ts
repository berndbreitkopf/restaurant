import { Router, type IRouter } from "express";
import { db, eventsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { insertEventSchema } from "@workspace/db";

const router: IRouter = Router();

router.get("/events", async (_req, res): Promise<void> => {
  const events = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.isActive, true))
    .orderBy(eventsTable.sortOrder, eventsTable.createdAt);
  res.json(events);
});

router.post("/events", async (req, res): Promise<void> => {
  const parsed = insertEventSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: String(parsed.error) });
    return;
  }
  const [event] = await db.insert(eventsTable).values(parsed.data).returning();
  res.status(201).json(event);
});

router.delete("/events/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  await db.delete(eventsTable).where(eq(eventsTable.id, id));
  res.status(204).send();
});

export default router;
