import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, dailyMenuItemsTable } from "@workspace/db";
import {
  GetDailyMenuItemsQueryParams,
  CreateDailyMenuItemBody,
  DeleteDailyMenuItemParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

router.get("/daily-menu", async (req, res): Promise<void> => {
  const query = GetDailyMenuItemsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const date = query.data.date ?? getTodayDate();
  const items = await db
    .select()
    .from(dailyMenuItemsTable)
    .where(eq(dailyMenuItemsTable.date, date))
    .orderBy(dailyMenuItemsTable.createdAt);
  res.json(items);
});

router.post("/daily-menu", async (req, res): Promise<void> => {
  const parsed = CreateDailyMenuItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const date = parsed.data.date ?? getTodayDate();
  const [item] = await db
    .insert(dailyMenuItemsTable)
    .values({ ...parsed.data, date })
    .returning();
  res.status(201).json(item);
});

router.delete("/daily-menu/:id", async (req, res): Promise<void> => {
  const params = DeleteDailyMenuItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db
    .delete(dailyMenuItemsTable)
    .where(eq(dailyMenuItemsTable.id, params.data.id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Daily menu item not found" });
    return;
  }
  res.sendStatus(204);
});

router.get("/daily-menu/today", async (_req, res): Promise<void> => {
  const today = getTodayDate();
  const items = await db
    .select()
    .from(dailyMenuItemsTable)
    .where(eq(dailyMenuItemsTable.date, today))
    .orderBy(dailyMenuItemsTable.createdAt);

  const veganCount = items.filter((i) => i.isVegan).length;
  const vegetarianCount = items.filter((i) => i.isVegetarian).length;

  res.json({
    date: today,
    items,
    totalItems: items.length,
    veganCount,
    vegetarianCount,
  });
});

export default router;
