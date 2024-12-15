"use client";
import { useAppDispatch } from "@/src/hooks/hook";
import { setFilteredProducts, setMessage } from "@/src/slices/filteredProductsSlice";
import { motion } from "framer-motion";
import { useState } from "react";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userQuestion: string;
  setUserQuestion: (question: string) => void;
  products: any[];
}

const SearchPopup: React.FC<SearchPopupProps> = ({
  isOpen,
  onClose,
  userQuestion,
  setUserQuestion,
  products,
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false); // Thêm state cho loading

  if (!isOpen) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Đặt isLoading thành true khi bắt đầu tìm kiếm

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuery: userQuestion, products }),
    });

    const data = await res.json();
    dispatch(setFilteredProducts(data.menu)); 
    dispatch(setMessage(data.response)) // Cập nhật sản phẩm đã lọc
    setIsLoading(false); // Đặt lại isLoading thành false khi nhận kết quả
    onClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose(); // Chỉ gọi onClose khi không đang trong trạng thái loading
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white px-6 py-4 rounded-lg w-[400px] text-center relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-4xl text-gray-500 hover:text-gray-700"
          disabled={isLoading} // Vô hiệu hóa nút đóng khi đang trong trạng thái loading
        >
          &times; {/* Biểu tượng X */}
        </button>

        <h2 className="text-xl mt-2 font-semibold mb-4">Ask Your Question</h2>
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Type your question..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <div className="mt-2 flex items-center gap-3 flex-row-reverse justify-between w-full">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 font-medium bg-yellow-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            disabled={isLoading} // Vô hiệu hóa nút tìm kiếm khi đang trong trạng thái loading
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchPopup;
