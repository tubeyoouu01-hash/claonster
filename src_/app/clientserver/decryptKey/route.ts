import { NextResponse } from "next/server";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;
// function deriveKey(passphrase: string, salt: Buffer) {
//   return crypto.scryptSync(passphrase, salt, 32);
// }


function decryptData(encryptedData: Record<string,string>, passphrase: string): string {
  let {salt:saltHex, iv:ivHex, authTag:tagHex, encrypted} = encryptedData;
  encrypted =encrypted||encryptedData?.key
console.log(saltHex,"eeeeeeeee")
const salt = Buffer.from(saltHex, "hex");
const iv = Buffer.from(ivHex, "hex");
const tag = Buffer.from(tagHex, "hex");


const key = crypto.scryptSync(passphrase, salt, 32);
const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

decipher.setAuthTag(tag);

let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
// return tagHex

  return decrypted;
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
