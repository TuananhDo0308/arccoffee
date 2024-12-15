import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { changeStatus } from "@/src/slices/UIcomponentSlice/cartUiSlice";
import ProductList from "./ListProduct";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,

  } from "@nextui-org/react";
  import Icon from "@/src/assets/BagIcon.png";
import Image from "next/image";

export default function CartDrawer(){
  const open = useAppSelector((state) => state.cartUi.value);
  const dispatch = useAppDispatch();

  return (
    <>
    <Drawer backdrop={"opaque"} className="w-[400px]" isOpen={open} size="sm" onOpenChange={()=>dispatch(changeStatus())}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex items-center justify-center w-full gap-1">
                Cart
              </DrawerHeader>
              <DrawerBody>
                <ProductList/>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <button
          onClick={()=>{dispatch(changeStatus())}}
          className="fixed bottom-10 z-[50] right-10 h-16 w-16 border-2 justify-around items-center flex flex-wrap rounded-full border-dashed border-gray-800 bg-white transition-all duration-300 hover:shadow-[4px_4px_0px_gray-800] hover:translate-x-[-4px] hover:translate-y-[-4px]"
        >
          <Image src={Icon} alt="bagIcon" className="h-8 w-8" />
        </button>
      </>
  );
};

