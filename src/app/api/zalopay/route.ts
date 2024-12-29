import axios from "axios";
import { createHmacSignature, getCurrentTimestamp } from "@/src/utils/zalo";

// Hàm tạo chữ ký HMAC
const createHMAC = (key: string, data: string) => {
  return require("crypto").createHmac("sha256", key).update(data).digest("hex");
};

// POST handler
export async function POST(req: Request) {
  try {
    const { amount, description } = await req.json();

    const app_id = process.env.ZALOPAY_APP_ID!;
    const key1 = process.env.ZALOPAY_KEY1!;
    const endpoint = process.env.ZALOPAY_ENDPOINT!;

    const order_id = `${Date.now()}`;
    const app_user = "test_user";
    const embed_data = "{}";
    const item = "[]";

    const data = {
      app_id,
      app_trans_id: `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}_${order_id}`,
      app_user,
      app_time: getCurrentTimestamp(),
      amount,
      description,
      embed_data,
      item,
      callback_url: "<https://domain.com/callback>",
      bank_code: "zalopayapp",
      mac: ""
    };
    console.log("ZaloPay Data:", key1);
    const hmacInput = `${app_id}|${data.app_trans_id}|${app_user}|${amount}|${data.app_time}|${embed_data}|${item}`;
    data.mac = createHmacSignature(key1, hmacInput);

    const response = await axios.post(`${endpoint}/create`, data);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: any) {
    console.error("ZaloPay API Error:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({
        message: "Error creating order",
        error: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
}
