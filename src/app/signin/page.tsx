"use client"
import { clientLinks, httpClient } from '@/src/utils';
import { useEffect, useState } from 'react';

function ChatBot() {
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');
  const [menu, setMenu] = useState([]);
  const [products, setProducts] = useState<any[]>([]); // State để lưu danh sách sản phẩm

  useEffect(() => {
    const fetchProducts = async () => {
        const response = await httpClient.get({ url: clientLinks.homepage.product });

        // Log cấu trúc dữ liệu để kiểm tra
        console.log(response.data); // Xem dữ liệu trả về từ API
        
        setProducts(response.data.data); // Lưu vào state nếu là mảng
      };

    fetchProducts(); // Gọi hàm fetch khi component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gửi câu hỏi và danh sách sản phẩm vào API
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery, products }), // Truyền thêm sản phẩm vào body
    });

    const data = await res.json();

    setResponse(data.response);
    setMenu(data.menu);
  };

  return (
    <div className='bg-white'>
      <form className='bg-white' onSubmit={handleSubmit}>
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Hỏi về món ăn"
        />
        <button type="submit">Hỏi</button>
      </form>

      <div>
        <h3>Câu trả lời: </h3>
        <p>{response}</p>

      </div>
    </div>
  );
}

export default ChatBot;
