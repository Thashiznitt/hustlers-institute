import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
// Fallback key for development. In production, SESSION_SECRET should be defined in .env
const SECRET_KEY = process.env.SESSION_SECRET 
  ? crypto.createHash('sha256').update(process.env.SESSION_SECRET).digest()
  : crypto.createHash('sha256').update("sovereign-millionaires-secret-key-2026").digest();

const IV_LENGTH = 16;

export function encryptSession(data: { email: string; userId: string }): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decryptSession(cookieValue: string): { email: string; userId: string } | null {
  try {
    const parts = cookieValue.split(":");
    if (parts.length !== 2) return null;
    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = Buffer.from(parts[1], "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString("utf8"));
  } catch (e) {
    return null;
  }
}
