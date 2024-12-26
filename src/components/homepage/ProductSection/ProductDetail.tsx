import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ProductDetailPopupProps {
  product: any;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductDetailPopup: React.FC<ProductDetailPopupProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
             
          <div className="w-full md:w-1/2  h-[400px]  aspect-square relative rounded-2xl overflow-hidden">
            <Image
              src={product.image}
              layout="fill"
              objectFit="cover"
            
              alt={product.name}
              quality={50}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
              <div className="flex items-center justify-between mb-6">
                <p className="text-3xl font-bold text-yellow-500">{product.price}</p>
                <button
                  onClick={onAddToCart}
                  className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
           
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailPopup;
