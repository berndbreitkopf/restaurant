import { Router } from "express";
import { db } from "@workspace/db";
import { reservationsTable } from "@workspace/db";
import { adminAuthMiddleware } from "./auth";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const router = Router();

const CreateReservationSchema = z.object({
  vorname: z.string().min(1).max(100),
  nachname: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(1).max(50),
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.number().int().min(1).max(50),
  message: z.string().max(1000).optional(),
});

router.post("/reservations", async (req, res) => {
  const parsed = CreateReservationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  try {
    const [item] = await db
      .insert(reservationsTable)
      .values({ ...parsed.data, status: "pending" })
      .returning();
    res.status(201).json({ success: true, reservation: item });
  } catch (err) {
    res.status(500).json({ error: "Reservierung konnte nicht gespeichert werden" });
  }
});

router.get("/reservations", adminAuthMiddleware, async (_req, res) => {
  try {
    const items = await db
      .select()
      .from(reservationsTable)
      .orderBy(desc(reservationsTable.createdAt));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Laden der Reservierungen" });
  }
});

router.patch("/reservations/:id/status", adminAuthMiddleware, async (req, res) => {
  const id = parseInt(req.params["id"] ?? "0", 10);
  const { status } = req.body as { status?: string };
  if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
    res.status(400).json({ error: "Ungültiger Status" });
    return;
  }
  const [item] = await db
    .update(reservationsTable)
    .set({ status })
    .where(eq(reservationsTable.id, id))
    .returning();
  if (!item) {
    res.status(404).json({ error: "Reservierung nicht gefunden" });
    return;
  }
  res.json(item);
});

export default router;
