import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export const ProductCard = ({ product }: any) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative flex items-center justify-center h-[370px] w-[250px] rounded-3xl bg-white/30"
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="  w-[250px] h-[370px] bg-white rounded-2xl p-5 flex flex-col justify-start"
      >
        <div
          className="w-[210px] h-[240px] border-[1px] border-black rounded-t-xl overflow-hidden"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <img src={product.image} className="w-full h-full object-cover" />
        </div>

        <h3
          className="font-bold mt-2 text-xl text-black"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          {product.name}
        </h3>
        <p className="text-xs text-gray-500"style={{
              transform: "translateZ(15px)",
            }}>Stock: {product.stock}</p>
        <div className="flex justify-between items-center "style={{
              transform: "translateZ(20px)",
            }}>
          <p
            
            className="text-yellow-500 font-extrabold text-2xl"
          >
            {product.price}
          </p>

          <button className=" bg-black border-[1px] text-white py-2 px-4 rounded-full hover:border-black hover:bg-transparent hover:text-black"style={{
              transform: "translateZ(30px)",
            }}>
            Add +
          </button>
        </div>
      </div>
    </motion.div>
  );
};
