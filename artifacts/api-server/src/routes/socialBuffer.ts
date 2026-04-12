import { Router } from "express";

const router = Router();

interface BufferPostRequest {
  text: string;
  imageUrl?: string;
  platforms: ("instagram" | "facebook" | "tiktok")[];
  scheduledAt?: string;
}

interface BufferProfileMap {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

async function postToBuffer(payload: BufferPostRequest): Promise<{ success: boolean; results: Record<string, unknown>; errors: string[] }> {
  const token = process.env["BUFFER_ACCESS_TOKEN"];
  if (!token) {
    return { success: false, results: {}, errors: ["BUFFER_ACCESS_TOKEN not configured"] };
  }

  const profileIds: BufferProfileMap = {
    instagram: process.env["BUFFER_INSTAGRAM_PROFILE_ID"],
    facebook: process.env["BUFFER_FACEBOOK_PROFILE_ID"],
    tiktok: process.env["BUFFER_TIKTOK_PROFILE_ID"],
  };

  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  for (const platform of payload.platforms) {
    const profileId = profileIds[platform];
    if (!profileId) {
      errors.push(`No profile ID configured for ${platform}`);
      continue;
    }

    try {
      const body: Record<string, unknown> = {
        profile_ids: [profileId],
        text: payload.text,
      };

      if (payload.imageUrl) {
        body.media = { photo: payload.imageUrl };
      }

      if (payload.scheduledAt) {
        body.scheduled_at = payload.scheduledAt;
      }

      const response = await fetch("https://api.bufferapp.com/1/updates/create.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json() as Record<string, unknown>;

      if (!response.ok) {
        errors.push(`${platform}: ${data["error"] ?? response.statusText}`);
      } else {
        results[platform] = data;
      }
    } catch (err) {
      errors.push(`${platform}: Network error — ${err instanceof Error ? err.message : "Unknown"}`);
    }
  }

  return { success: errors.length === 0, results, errors };
}

router.post("/social/buffer", async (req, res) => {
  try {
    const { text, imageUrl, platforms, scheduledAt } = req.body as BufferPostRequest;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({ success: false, error: "text is required" });
    }

    if (!Array.isArray(platforms) || platforms.length === 0) {
      return res.status(400).json({ success: false, error: "at least one platform is required" });
    }

    const validPlatforms = ["instagram", "facebook", "tiktok"];
    const invalidPlatforms = platforms.filter(p => !validPlatforms.includes(p));
    if (invalidPlatforms.length > 0) {
      return res.status(400).json({ success: false, error: `Invalid platforms: ${invalidPlatforms.join(", ")}` });
    }

    const result = await postToBuffer({ text: text.trim(), imageUrl, platforms, scheduledAt });

    if (!result.success && result.errors.length > 0 && Object.keys(result.results).length === 0) {
      return res.status(502).json({ success: false, errors: result.errors });
    }

    res.json({
      success: result.success,
      message: result.success
        ? `Post erfolgreich an ${platforms.join(", ")} gesendet`
        : `Teilweise fehlgeschlagen: ${result.errors.join("; ")}`,
      results: result.results,
      errors: result.errors,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/social/buffer/status", async (req, res) => {
  const token = process.env["BUFFER_ACCESS_TOKEN"];
  const configured = {
    bufferToken: !!token,
    instagram: !!process.env["BUFFER_INSTAGRAM_PROFILE_ID"],
    facebook: !!process.env["BUFFER_FACEBOOK_PROFILE_ID"],
    tiktok: !!process.env["BUFFER_TIKTOK_PROFILE_ID"],
  };
  res.json({ configured, ready: Object.values(configured).every(Boolean) });
});

export default router;
