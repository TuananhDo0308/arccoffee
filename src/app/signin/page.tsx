"use client"
import { useState } from 'react';

function ChatBot() {
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');
  const [menu, setMenu] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gửi câu hỏi đến API
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery }),
    });

    const data = await res.json();

    // Cập nhật câu trả lời và menu
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

        <h3>Danh sách món ăn:</h3>
        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price} VND: {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatBot;
