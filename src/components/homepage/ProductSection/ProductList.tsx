import { ProductCard } from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image:
      "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=600", // Đường dẫn tới hình ảnh sản phẩm
  },
  {
    id: 2,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image: "a", // Đường dẫn tới hình ảnh sản phẩm
  },
  {
    id: 3,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image: "https://via.placeholder.com/150", // Đường dẫn tới hình ảnh sản phẩm
  },
  {
    id: 4,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image: "https://via.placeholder.com/150", // Đường dẫn tới hình ảnh sản phẩm
  },
  {
    id: 5,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image: "https://via.placeholder.com/150", // Đường dẫn tới hình ảnh sản phẩm
  },
  {
    id: 6,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image: "https://via.placeholder.com/150", // Đường dẫn tới hình ảnh sản phẩm
  },
  {
    id: 7,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image: "https://via.placeholder.com/150", // Đường dẫn tới hình ảnh sản phẩm
  },
  {
    id: 8,
    name: "Cappucino",
    price: "12,000đ",
    stock: 10,
    image: "https://via.placeholder.com/150", // Đường dẫn tới hình ảnh sản phẩm
  },
  // Thêm các sản phẩm khác tương tự ở đây
];
const ProductGrid = () => {
  return (
    <div className=" w-full items-center justify-center">
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-6 justify-center items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
