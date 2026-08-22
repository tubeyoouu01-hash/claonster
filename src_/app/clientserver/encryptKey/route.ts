// app/clientserver/encrypt/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Encryption function
function encrypt(text: string, secretPhrase: string) {
  // Generate a random salt
  const salt = crypto.randomBytes(16);

  // Derive a key from secret phrase + salt
  const key = crypto.scryptSync(secretPhrase, salt, 32);

  // Generate random IV (Initialization Vector)
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Return everything needed for decryption
  return {
    ciphertext: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
    authTag: authTag.toString("hex"),
  };
}

// API route
export async function POST(req: NextRequest) {
  try {
    const { data:text, passphrase:secretPhrase } = await req.json();

    if (!text || !secretPhrase) {
      return NextResponse.json(
        { error: "text and secretPhrase are required" },
        { status: 400 }
      );
    }

    const result = encrypt(text, secretPhrase);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
