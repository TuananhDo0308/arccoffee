import { useAppSelector } from "@/src/hooks/hook";
import { ProductCard } from "./ProductCard";

const ProductGrid = () => {
  const data = useAppSelector(state=>state.filteredProducts)
  const products=data.filteredProducts
  if (!products || products.length === 0) {
    return <div>Không có sản phẩm nào.</div>; // Hiển thị nếu không có sản phẩm
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
