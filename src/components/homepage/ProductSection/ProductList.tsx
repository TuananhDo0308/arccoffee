import { useAppSelector } from "@/src/hooks/hook";
import { ProductCard } from "./ProductCard";

const ProductGrid = () => {
  const data = useAppSelector(state => state.filteredProducts)
  const products = data.filteredProducts

  if (!products || products.length === 0) {
    return <div className="text-center py-10 text-lg">Không có sản phẩm nào.</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center">
        {products.map((product,index) => (
          <div key={index} className="w-full max-w-[250px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
