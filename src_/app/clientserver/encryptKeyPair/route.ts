import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
// Generate RSA key pair



export async function POST(req: NextRequest) {
  try {
    const { publicKey, message } = await req.json();

    if (!publicKey || !message) {
      return NextResponse.json(
        { error: "publicKey and data are required" },
        { status: 400 }
      );
    }

    // const result = encrypt(text, secretPhrase);
//     const { publicKey, privateKey } = generateKeyPairSync("rsa", {
//   modulusLength: 2048, // length of key in bits
//   publicKeyEncoding: { type: "spki", format: "pem" },
//   privateKeyEncoding: { type: "pkcs8", format: "pem" },
// });

const encrypted = publicEncrypt(publicKey, Buffer.from(message));
console.log("Encrypted (base64):", encrypted.toString("base64"));
    return NextResponse.json({encrypted:encrypted.toString("base64")});
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// console.log("Public Key:\n", publicKey);
// console.log("Private Key:\n", privateKey);

// // Message to encrypt
// const message = "Secret message for private eyes only.";

// // Encrypt with public key
// const encrypted = publicEncrypt(publicKey, Buffer.from(message));
// console.log("Encrypted (base64):", encrypted.toString("base64"));

// // Decrypt with private key
// const decrypted = privateDecrypt(privateKey, encrypted);
// console.log("Decrypted:", decrypted.toString());
