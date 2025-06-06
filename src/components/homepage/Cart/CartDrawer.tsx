import ProductList from "./ListProduct";
import Icon from "@/src/assets/BagIcon.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { changeStatus } from "@/src/slices/UIcomponentSlice/cartUiSlice";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function CartDrawer() {
  const open = useAppSelector((state) => state.cartUi.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 border-1 border-black  w-[400px] bg-gray-100 bg-opacity-95 rounded-medium",
        }}
        isOpen={open}
        onOpenChange={() => dispatch(changeStatus())}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 items-center justify-start inset-x-0 z-50 flex flex-row gap-2 px-3 py-3 ">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
              </DrawerHeader>
              <DrawerHeader className="flex items-center justify-center w-full gap-1 border-b-1 border-neutral-800">
                <p className="text-xl font-bold text-yel">Your Cart</p>
              </DrawerHeader>
              <DrawerBody>
                <ProductList />
              </DrawerBody>
              <DrawerFooter>
                <Link href="./Checkout">
                  <Tooltip content="Check out">
                    <div
                      onClick={() => dispatch(changeStatus())}
                      className="bg-black rounded-full text-white w-[60px] h-[60px] flex items-center justify-center cursor-pointer hover:bg-gray-600"
                    >
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 122.88 112.75"
                        xmlSpace="preserve"
                        width={25}
                        height={25}
                      >
                        <style>{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
                        <g>
                          <path
                            className="st0"
                            d="M19.78,16.38h47.97c-0.64,2.13-1.05,4.35-1.22,6.65l-4.71-0.01h0l4.81,19.99h5.34 c1.28,1.85,2.76,3.55,4.4,5.08h-8.51l4.08,16.99l11.76-1.6h0l-2.86-11.92c2.39,1.52,5,2.73,7.77,3.56l1.79,7.44l0.85-0.12 c5.31-0.76,4.95,0.45,5.37-4.55l0.12-1.48c0.27,0.01,0.55,0.01,0.83,0.01c2,0,3.95-0.19,5.84-0.55l-0.53,6.82 c-0.52,6.16-0.08,4.67-6.61,5.6l-59.96,7.63l3.17,9.21c26.01,0,38.59,0,64.59,0c0.88,3.27,2.06,8.59,2.94,12.24H96.26l-1.03-3.73 c-21.67,0-29.93,0-51.61,0c-11.84-0.2-10.65,3-13.49-7.22L9.77,12.46H0V5.37h17.13C17.93,8.35,19.04,13.37,19.78,16.38L19.78,16.38 z M97.56,0c13.98,0,25.32,11.34,25.32,25.32c0,13.98-11.34,25.32-25.32,25.32c-13.98,0-25.32-11.34-25.32-25.32 C72.24,11.34,83.58,0,97.56,0L97.56,0z M86.36,25.99c0.34-1.97,2.59-3.07,4.36-2c0.16,0.1,0.31,0.21,0.46,0.34l0.01,0.01 c0.8,0.76,1.69,1.56,2.57,2.34l0.76,0.68l9-9.44c0.54-0.56,0.93-0.93,1.74-1.11c2.76-0.61,4.7,2.77,2.75,4.83L96.79,33.43 c-1.06,1.13-2.95,1.23-4.08,0.15c-0.65-0.6-1.36-1.22-2.07-1.84c-1.24-1.08-2.5-2.18-3.53-3.26 C86.48,27.86,86.21,26.84,86.36,25.99L86.36,25.99L86.36,25.99z M46.92,96.19c4.57,0,8.28,3.71,8.28,8.29 c0,4.58-3.71,8.28-8.28,8.28c-4.58,0-8.29-3.71-8.29-8.28C38.63,99.9,42.34,96.19,46.92,96.19L46.92,96.19z M81.09,96.19 c4.57,0,8.28,3.71,8.28,8.29c0,4.58-3.71,8.28-8.28,8.28c-4.58,0-8.29-3.71-8.29-8.28C72.8,99.9,76.51,96.19,81.09,96.19 L81.09,96.19z M26.92,43.01h13.19l-4.79-20.02c-4.71,0-9.37-0.01-13.92-0.01l1.61,5.99l0.05-0.01L26.92,43.01L26.92,43.01 L26.92,43.01z M42.22,23l4.79,20.01h12.71l-4.81-20L42.22,23L42.22,23L42.22,23z M65.24,66l-4.3-17.9l-12.71,0l4.69,19.59L65.24,66 L65.24,66L65.24,66z M46.22,68.59l-4.9-20.5H28.32l6.08,22.11L46.22,68.59L46.22,68.59z"
                          />
                        </g>
                      </svg>{" "}
                    </div>
                  </Tooltip>
                </Link>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <button
        onClick={() => {
          dispatch(changeStatus());
        }}
        className="fixed bottom-10 z-[50] right-10 h-16 w-16 border-2 justify-around items-center flex flex-wrap rounded-full border-dashed border-gray-800 bg-white transition-all duration-300 hover:shadow-[4px_4px_0px_gray-800] hover:translate-x-[-4px] hover:translate-y-[-4px]"
      >
        <Image src={Icon} alt="bagIcon" className="h-8 w-8" />
      </button>
    </>
  );
}
