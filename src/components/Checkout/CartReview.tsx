import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';

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

export function CartReview({ cartItems, updateQuantity, removeItem }: CartReviewProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-zinc-800/30 transition-shadow">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle>Giỏ hàng của bạn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[800px] overflow-y-auto pt-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
          >
            <div className="h-20 w-20 bg-zinc-700 rounded-lg overflow-hidden">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-zinc-400">
                {item.price.toLocaleString()}đ
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700"
                onClick={() => updateQuantity(item.productId, -1)}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700"
                onClick={() => updateQuantity(item.productId, 1)}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                onClick={() => removeItem(item.productId)}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

