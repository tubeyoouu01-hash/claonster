import { NextResponse } from "next/server";
import crypto from "crypto";
import { deriveKey } from "@/utils";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;



function decryptData({
  title,
  value,
  salt,
  ivTitle,
  ivValue,
  authTagTitle,
  authTagValue,
  
}: Record<string,string>, passphrase: string): Record<string,string> {
 const saltBuf = Buffer.from(salt, "hex");
  const key = deriveKey(passphrase, saltBuf);

  // --- Decrypt title ---
  const decipherTitle = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(ivTitle, "hex"));
  decipherTitle.setAuthTag(Buffer.from(authTagTitle, "hex"));
  let decryptedTitle = decipherTitle.update(Buffer.from(title, "hex"));
  decryptedTitle = Buffer.concat([decryptedTitle, decipherTitle.final()]);

  // --- Decrypt value ---
  const decipherValue = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(ivValue, "hex"));
  decipherValue.setAuthTag(Buffer.from(authTagValue, "hex"));
  let decryptedValue = decipherValue.update(Buffer.from(value, "hex"));
  decryptedValue = Buffer.concat([decryptedValue, decipherValue.final()]);

  return { title:decryptedTitle.toString(),value: decryptedValue.toString() };
}

export async function POST(req: Request) {
  try {
    const {  encrypted:data, passphrase } = await req.json();

    if (  !data || !passphrase) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    let result;
 
   
      result = decryptData(data, passphrase);


    return NextResponse.json({ result });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
