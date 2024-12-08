import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { httpClient, clientLinks } from "@/src/utils";

const ProductGrid = () => {
  const [products, setProducts] = useState<any[]>([]); // State để lưu danh sách sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // State để theo dõi trạng thái tải
  const [error, setError] = useState<string | null>(null); // State để xử lý lỗi

  useEffect(() => {
    // Hàm fetch dữ liệu sản phẩm từ API
    const fetchProducts = async () => {
      try {
        const response = await httpClient.get({ url: clientLinks.homepage.product });

        // Log cấu trúc dữ liệu để kiểm tra
        console.log(response.data); // Xem dữ liệu trả về từ API

        // Kiểm tra nếu response.data là mảng sản phẩm hoặc có một thuộc tính chứa mảng sản phẩm
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Lưu vào state nếu là mảng
        } else if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data); // Trường hợp nếu sản phẩm nằm trong thuộc tính 'data'
        } else {
          setError("Dữ liệu không phải là mảng sản phẩm hợp lệ.");
        }

        setLoading(false); // Đánh dấu hoàn thành tải
      } catch (err) {
        setError("Có lỗi xảy ra khi tải sản phẩm.");
        setLoading(false);
      }
    };

    fetchProducts(); // Gọi hàm fetch khi component mount
  }, []);

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị khi đang tải
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="w-full items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-6 justify-center items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
