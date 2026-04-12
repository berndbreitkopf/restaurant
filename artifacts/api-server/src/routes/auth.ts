import { Router } from "express";
import { createHmac, timingSafeEqual, randomBytes } from "crypto";

const router = Router();

function getSecret(): string {
  return process.env["SESSION_SECRET"] ?? "cafe-melody-bistro-secret-2024";
}

function generateAdminToken(): string {
  const secret = getSecret();
  const expiry = Date.now() + 48 * 60 * 60 * 1000;
  const nonce = randomBytes(8).toString("hex");
  const payload = `admin:${expiry}:${nonce}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

function validateAdminToken(token: string): boolean {
  try {
    if (!token) return false;
    const secret = getSecret();
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const lastColon = decoded.lastIndexOf(":");
    if (lastColon === -1) return false;
    const payload = decoded.substring(0, lastColon);
    const sig = decoded.substring(lastColon + 1);
    const parts = payload.split(":");
    if (parts.length < 3 || parts[0] !== "admin") return false;
    const expiry = parseInt(parts[1] ?? "0", 10);
    if (isNaN(expiry) || Date.now() > expiry) return false;
    const expectedSig = createHmac("sha256", secret).update(payload).digest("hex");
    const sigBuf = Buffer.from(sig, "hex");
    const expectedBuf = Buffer.from(expectedSig, "hex");
    if (sigBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}

export function adminAuthMiddleware(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token || !validateAdminToken(token)) {
    res.status(401).json({ error: "Nicht autorisiert" });
    return;
  }
  next();
}

router.post("/auth/login", (req, res) => {
  const { password } = req.body as { password?: string };
  const adminPassword = process.env["ADMIN_PASSWORD"];

  if (!adminPassword) {
    res.status(503).json({ error: "Admin-Passwort nicht konfiguriert. Bitte ADMIN_PASSWORD als Umgebungsvariable setzen." });
    return;
  }

  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Passwort erforderlich" });
    return;
  }

  const hmacInput = createHmac("sha256", getSecret()).update(password).digest();
  const hmacExpected = createHmac("sha256", getSecret()).update(adminPassword).digest();
  const isValid = timingSafeEqual(hmacInput, hmacExpected);

  if (!isValid) {
    res.status(401).json({ error: "Falsches Passwort" });
    return;
  }

  const token = generateAdminToken();
  res.json({ token, expiresIn: "48h" });
});

router.get("/auth/me", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token || !validateAdminToken(token)) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.json({ authenticated: true, user: "admin" });
});

router.post("/auth/logout", (_req, res) => {
  res.json({ success: true });
});

export default router;
