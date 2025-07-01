import crypto from "crypto";

const keyFromPassword = (password: string) => {
  return crypto.createHash("sha256").update(password).digest(); // 32 bytes
};

const secretKey = keyFromPassword("123456"); // 👈 Your short key hashed
const iv = crypto.randomBytes(16); // Initialization vector

const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(text, "utf-8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

const decrypt = (encrypted: string) => {
  const [ivHex, encryptedData] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decrypted = decipher.update(Buffer.from(encryptedData, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf-8");
};

export { encrypt, decrypt };
