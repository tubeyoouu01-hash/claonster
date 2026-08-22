import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const ALGO = "aes-256-gcm";

// helper
function decryptData(encrypted: string, passphrase: string, ivHex: string, saltHex: string, authTagHex: string) {
  const salt = Buffer.from(saltHex, "hex");
  const key = crypto.scryptSync(passphrase, salt, 32);
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { encrypted, passphrase, iv, salt, authTag } = req.body;
  if (!encrypted || !passphrase || !iv || !salt || !authTag) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const decrypted = decryptData(encrypted, passphrase, iv, salt, authTag);
    res.status(200).json({ decrypted });
  } catch (err) {
    res.status(400).json({ error: "Failed to decrypt" });
  }
}
