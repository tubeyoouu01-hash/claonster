import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const ALGO = "aes-256-gcm";

// helper
function encryptData(data: string, passphrase: string) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(passphrase, salt, 32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return {
    ciphertext:encrypted,
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
    authTag,
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data, passphrase } = req.body;
  if (!data || !passphrase) {
    return res.status(400).json({ error: "Missing data or passphrase" });
  }

  const result = encryptData(data, passphrase);
  res.status(200).json(result);
}
