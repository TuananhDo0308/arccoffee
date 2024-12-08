// app/api/chatbot/route.js

import { NextResponse } from 'next/server';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Lấy model bạn muốn sử dụng
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Chọn model bạn muốn sử dụng
});

const generationConfig = {
  temperature: 0.95,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Dữ liệu menu của nhà hàng
const menuData = [
  { name: "Pizza Margherita", price: 120000, description: "Pizza với phô mai Mozzarella và cà chua tươi." },
  { name: "Spaghetti Bolognese", price: 95000, description: "Mỳ Ý với sốt thịt bò." },
  { name: "Salad Caesar", price: 85000, description: "Salad với sốt Caesar và gà nướng." },
  { name: "Nước ép cam", price: 40000, description: "Nước ép cam tươi nguyên chất." },
];

// Hàm xử lý câu hỏi và gửi câu trả lời
export async function POST(req) {
  try {
    const { userQuery } = await req.json(); // Lấy câu hỏi từ người dùng

    // Tạo prompt cung cấp dữ liệu menu cho mô hình
    const prompt = `
      Dưới đây là menu và giá của nhà hàng:
      ${menuData.map(item => `${item.name}: ${item.price} VND - ${item.description}`).join("\n")}

      Khách hàng hỏi: "${userQuery}". 
      Hãy trả lời phù hợp và cung cấp danh sách các món ăn nếu cần.
    `;

    // Khởi tạo phiên chat với cấu hình đã định
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],  // Gửi câu hỏi và menu vào trong prompt
        },
        {
          role: "model",
          parts: [{ text: "How can I help you today?" }],
        },
      ],
    });

    // Gửi câu hỏi và lấy kết quả từ Gemini API
    const result = await chatSession.sendMessage(userQuery);

    // Lấy câu trả lời từ mô hình
    const responseText = result.response.text();

    // Kiểm tra các món ăn liên quan trong câu trả lời
    const filteredMenu = menuData.filter(item => {
      // Kiểm tra xem tên món ăn có xuất hiện trong câu trả lời hay không
      return responseText.toLowerCase().includes(item.name.toLowerCase());
    });

    // Trả về kết quả dạng JSON với câu trả lời và danh sách món ăn đã lọc
    return NextResponse.json({
      response: responseText,
      menu: filteredMenu,  // Trả về danh sách món ăn đã lọc
    });

  } catch (error) {
    console.error("Error:", error);

    // Trả về thông báo lỗi nếu có vấn đề trong quá trình xử lý
    return NextResponse.json({
      error: error.message || "Có lỗi trong quá trình xử lý yêu cầu.",
    }, { status: 500 });
  }
}
