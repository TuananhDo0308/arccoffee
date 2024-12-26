import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const key2 = process.env.ZALOPAY_KEY2;
  const { data, mac } = req.body;

  const hmacInput = `${data.app_id}|${data.app_trans_id}|${data.app_user}|${data.amount}|${data.embed_data}|${data.item}|${data.server_time}`;
  const computedMac = crypto.createHmac("sha256", key2).update(hmacInput).digest("hex");

  if (mac !== computedMac) {
    return res.status(400).json({ message: "Invalid MAC" });
  }

  // Xử lý giao dịch hợp lệ
  console.log("Transaction valid:", data);

  res.status(200).json({ return_code: 1, return_message: "success" });
}
