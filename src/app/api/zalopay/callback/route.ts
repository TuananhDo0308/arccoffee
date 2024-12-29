import { NextResponse } from "next/server";
import { createHmac } from "crypto";

// Hàm kiểm tra chữ ký từ callback
const verifyCallback = (data: string, mac: string, key: string) => {
  const hmac = createHmac("sha256", key).update(data).digest("hex");
  return hmac === mac;
};

export async function POST(req: Request) {
  try {
    const key2 = process.env.ZALOPAY_KEY2!;
    const body = await req.json();

    const { data, mac } = body;
    const isValid = verifyCallback(JSON.stringify(data), mac, key2);

    if (!isValid) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // Xử lý dữ liệu callback
    console.log("ZaloPay Callback Data:", data);

    return NextResponse.json({ message: "Callback processed successfully" });
  } catch (error: any) {
    console.error("Callback processing error:", error.message);
    return NextResponse.json({ message: "Error processing callback" }, { status: 500 });
  }
}
