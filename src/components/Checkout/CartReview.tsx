import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartReviewProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, change: number) => void;
  removeItem: (id: string) => void;
}

export function CartReview({
  cartItems,
  updateQuantity,
  removeItem,
}: CartReviewProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-2 shadow-lg">
      <CardHeader className="border-b border-zinc-800 text-white">
        <h4 className="text-xl font-bold">Your Cart</h4>
      </CardHeader>
      <CardBody className="space-y-4 max-h-[800px] overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 p-4 rounded-xl text-white bg-zinc-800/50"
          >
            <div className="relative h-[100px] w-[100px] border-r-1 border-black">
              <Image
                src={`${item.image}`}
                alt={item.name}
                className="object-cover rounded-lg"
                layout="fill"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-zinc-400">
                {item.price.toLocaleString()}đ
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                color="default"
                onPress={() => updateQuantity(item.productId, -1)}
              >
                <Minus color="white" size={16} />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                onPress={() => updateQuantity(item.productId, 1)}
              >
                <Plus color="white" size={16} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                onPress={() => removeItem(item.productId)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
