import crypto from "crypto";

export const createHmac = (key:any, data:any) => {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
};

export const getCurrentTimestamp = () => {
  return Date.now();
};
