"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "./windowsize";
import { clientLinks, httpClient } from "@/src/utils";

const VerticalAccordion = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get({
          url: clientLinks.voucher.voucher,
        });
        const data =  response.data.data.data;
        setVouchers(data); // Lưu dữ liệu voucher vào state
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  if (loading) {
    return <VoucherSkeleton />;
  }

  return (
    <div className="py-5 items-center flex justify-center">
      <div className="container flex items-center justify-between">
        <div className="container text-white">
          <motion.h1
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-20 text-4xl font-black uppercase text-zinc-50"
          >
            Hot deals
          </motion.h1>
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
          >
            <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden">
              {vouchers.map((voucher) => (
                <Panel
                  key={voucher.id}
                  open={open}
                  setOpen={setOpen}
                  id={voucher.id}
                  title={voucher.code}
                  imgSrc="/default-image.jpg" // Thay bằng hình ảnh mặc định nếu không có
                  description={voucher.description}
                  minValue={voucher.minOrderValue.toLocaleString()}
                  maxDiscount={voucher.maxDiscount.toLocaleString()}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Panel = ({ open, setOpen, id, title, imgSrc, description,minValue, maxDiscount }: any) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180 text-black"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-yellow-500 flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              <p>{description}</p>
              <p>Code: {title}</p>
              <p>Min order value: {minValue} VND</p>
              <p>Max discount: {maxDiscount} VND </p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerticalAccordion;

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};


const VoucherSkeleton = () => {
  return (
    <div className="py-5 items-center flex justify-center animate-pulse">
      <div className="container flex items-center justify-between">
        <div className="container text-white">
          <div className="h-12 w-1/3 bg-gray-300 rounded mb-20"></div>
          <div className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9">
            <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-300 h-full w-full lg:w-1/4"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};