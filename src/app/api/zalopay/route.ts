import axios from "axios";
import { createHmac, getCurrentTimestamp } from "@/src/utils/zalo";

// Định nghĩa hàm xử lý HTTP POST
export async function POST(req: Request) {
  try {
    const { amount, description } = await req.json();

    const app_id = process.env.ZALOPAY_APP_ID;
    const key1 = process.env.ZALOPAY_KEY1;
    const endpoint = process.env.ZALOPAY_ENDPOINT;

    const order_id = `${Date.now()}`;
    const app_user = "test_user"; // Thay bằng user ID thực tế nếu cần
    const embed_data = "{}"; // Dữ liệu bổ sung nếu cần
    const item = "[]"; // Danh sách sản phẩm

    const data = {
      app_id,
      app_trans_id: `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}_${order_id}`,
      app_user,
      app_time: getCurrentTimestamp(),
      amount,
      description,
      embed_data,
      item,
      bank_code: "zalopayapp",
    };

    // Tạo chữ ký HMAC
    const hmacInput = `${app_id}|${data.app_trans_id}|${app_user}|${amount}|${data.app_time}|${embed_data}|${item}`;
    data.mac = createHmac(key1, hmacInput);
    console.log("HMAC:", data);
    // Gửi yêu cầu tới API ZaloPay
    const response = await axios.post(`${endpoint}/create`, data);

    // Trả về phản hồi JSON
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

// Định nghĩa HTTP method khác nếu cần
