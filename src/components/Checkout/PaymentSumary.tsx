import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  onPaymentClick: () => void;
}

export function PaymentSummary({ subtotal, shipping, discount, total, onPaymentClick }: PaymentSummaryProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-zinc-800/30 transition-shadow">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle>Tổng thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{shipping.toLocaleString()}đ</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Giảm giá</span>
            <span>-{discount.toLocaleString()}đ</span>
          </div>
        )}
        <Separator className="bg-zinc-800" />
        <div className="flex justify-between font-medium text-lg">
          <span>Tổng cộng</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors"
          size="lg"
          onClick={onPaymentClick}
        >
          Thanh toán ngay
        </Button>
      </CardFooter>
    </Card>
  );
}

