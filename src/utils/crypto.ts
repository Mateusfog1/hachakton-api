import "dotenv/config";
import CryptoJS from "crypto-js";

const encodeMessage = (message: string) => {
  return CryptoJS.AES.encrypt(message, process.env.ENCODING_KEY!).toString();
};

const decodeMessage = (message: string) => {
  return CryptoJS.AES.decrypt(message, process.env.ENCODING_KEY!).toString(CryptoJS.enc.Utf8);
};

const encondeBase64 = (message: string) => {
  return Buffer.from(message).toString("base64url");
};

const decodeBase64 = (message: string) => {
  return Buffer.from(message, "base64url").toString("utf-8");
};

export { encodeMessage, decodeMessage, encondeBase64, decodeBase64 };
