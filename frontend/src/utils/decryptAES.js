const ENCRYPTION_KEY_HEX = import.meta.env.VITE_ENCRYPTION_KEY;

if (!ENCRYPTION_KEY_HEX) {
  throw new Error("Missing VITE_ENCRYPTION_KEY in .env");
}
// === AES-256-GCM DECRYPT USING Web Crypto API ===
async function decryptAES(encrypted) {
  try {
    const [ivHex, authTagHex, ciphertextHex] = encrypted.split(":");
    if (!ivHex || !authTagHex || !ciphertextHex) return encrypted;

    const keyData = hexToArrayBuffer(ENCRYPTION_KEY_HEX);
    const iv = hexToArrayBuffer(ivHex);
    const authTag = hexToArrayBuffer(authTagHex);
    const ciphertext = hexToArrayBuffer(ciphertextHex);

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
        additionalData: new ArrayBuffer(0),
        tagLength: 128,
      },
      key,
      concatArrayBuffers(ciphertext, authTag)
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    console.warn("Decryption failed:", encrypted, err);
    return encrypted;
  }
}

// Helper: Hex string → ArrayBuffer
function hexToArrayBuffer(hex) {
  const match = hex.match(/.{1,2}/g);
  return new Uint8Array(match.map((byte) => parseInt(byte, 16))).buffer;
}

// Helper: Concat two ArrayBuffers
function concatArrayBuffers(a, b) {
  const tmp = new Uint8Array(a.byteLength + b.byteLength);
  tmp.set(new Uint8Array(a), 0);
  tmp.set(new Uint8Array(b), a.byteLength);
  return tmp.buffer;
}

// Safe decrypt (async)
export const safeDecrypt = async (value) => {
  if (typeof value !== "string") return value;
  return await decryptAES(value);
};
