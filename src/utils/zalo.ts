import { createHmac } from "crypto";

export const createHmacSignature = (key: string, data: string) => {
  return createHmac("sha256", key).update(data).digest("hex");
};

export const getCurrentTimestamp = () => {
  return new Date().getTime();
};
