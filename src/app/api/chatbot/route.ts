import { NextResponse } from 'next/server';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", 
});

const generationConfig = {
  temperature: 0.95,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req) {
  try {
    const { userQuery, products } = await req.json(); 

    // Tạo prompt cung cấp dữ liệu sản phẩm cho mô hình
    const productDetails = products.map(product => `${product.name}: ${product.price} VND - ${product.description}`).join("\n");

    const prompt = `
      Dưới đây là các sản phẩm và giá của cửa hàng:
      ${productDetails}

      Khách hàng hỏi: "${userQuery}". 
      Hãy trả lời phù hợp và cung cấp danh sách các món nước nếu cần.
    `;

    // Khởi tạo phiên chat với cấu hình đã định
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],  
        },
        {
          role: "model",
          parts: [{ text: "How can I help you today?" }],
        },
      ],
    });

    const result = await chatSession.sendMessage(userQuery);

    const responseText = result.response.text();

    const filteredProducts = products.filter(product => {
      return responseText.toLowerCase().includes(product.name.toLowerCase());
    });
    const response = responseText.split(":")[0];  

    return NextResponse.json({
      response: response,
      menu: filteredProducts,  
    });

  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      error: error.message || "Có lỗi trong quá trình xử lý yêu cầu.",
    }, { status: 500 });
  }
}
