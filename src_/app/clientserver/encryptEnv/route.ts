// app/clientserver/encrypt/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { deriveKey } from "@/utils";

// Encryption function
function encrypt(obj: Record<string, string>, secretPhrase: string) {
  // Generate a random salt
  const salt = crypto.randomBytes(16);

  // Derive a key from secret phrase + salt
  const key = deriveKey(secretPhrase, salt);

  // Extract key-value
  const title = obj.title;
  const value = obj.value;

  // Generate random IV for each field
  const iv1 = crypto.randomBytes(16);
  const iv2 = crypto.randomBytes(16);

  // Encrypt title
  const cipher1 = crypto.createCipheriv("aes-256-gcm", key, iv1);
  const encryptedTitle = Buffer.concat([
    cipher1.update(title, "utf8"),
    cipher1.final(),
  ]);
  const authTag1 = cipher1.getAuthTag();

  // Encrypt value
  const cipher2 = crypto.createCipheriv("aes-256-gcm", key, iv2);
  const encryptedValue = Buffer.concat([
    cipher2.update(value, "utf8"),
    cipher2.final(),
  ]);
  const authTag2 = cipher2.getAuthTag();

  return {
    title: encryptedTitle.toString("hex"),
    value: encryptedValue.toString("hex"),
    salt: salt.toString("hex"),
    ivTitle: iv1.toString("hex"),
    ivValue: iv2.toString("hex"),
    authTagTitle: authTag1.toString("hex"),
    authTagValue: authTag2.toString("hex"),
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
