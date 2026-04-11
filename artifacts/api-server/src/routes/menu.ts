import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, menuItemsTable } from "@workspace/db";
import {
  CreateMenuItemBody,
  UpdateMenuItemParams,
  UpdateMenuItemBody,
  DeleteMenuItemParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/menu", async (req, res): Promise<void> => {
  const items = await db.select().from(menuItemsTable).orderBy(menuItemsTable.category, menuItemsTable.name);
  res.json(items);
});

router.post("/menu", async (req, res): Promise<void> => {
  const parsed = CreateMenuItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [item] = await db.insert(menuItemsTable).values(parsed.data).returning();
  res.status(201).json(item);
});

router.patch("/menu/:id", async (req, res): Promise<void> => {
  const params = UpdateMenuItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateMenuItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== null && value !== undefined) {
      updateData[key] = value;
    }
  }

  const [item] = await db
    .update(menuItemsTable)
    .set(updateData)
    .where(eq(menuItemsTable.id, params.data.id))
    .returning();

  if (!item) {
    res.status(404).json({ error: "Menu item not found" });
    return;
  }
  res.json(item);
});

router.delete("/menu/:id", async (req, res): Promise<void> => {
  const params = DeleteMenuItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.delete(menuItemsTable).where(eq(menuItemsTable.id, params.data.id)).returning();
  if (!item) {
    res.status(404).json({ error: "Menu item not found" });
    return;
  }
  res.sendStatus(204);
});

router.get("/menu/categories", async (_req, res): Promise<void> => {
  const categories = await db
    .select({
      category: menuItemsTable.category,
      itemCount: sql<number>`count(*)::int`,
    })
    .from(menuItemsTable)
    .groupBy(menuItemsTable.category)
    .orderBy(menuItemsTable.category);
  res.json(categories);
});

export default router;
