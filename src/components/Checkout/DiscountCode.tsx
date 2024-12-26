import { Input } from "@/components/ui/input";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

interface DiscountCodeProps {
  discountCode: string;
  setDiscountCode: (code: string) => void;
  onApplyDiscount: () => void;

}

const DiscountCode = ({ discountCode, setDiscountCode, onApplyDiscount }:DiscountCodeProps) => {
  
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-xl text-white hover:shadow-zinc-800/30 p-2  transition-shadow">
      <CardHeader className="border-b border-zinc-800">
        <h4 className="font-bold text-xl">Mã giảm giá</h4>
      </CardHeader>
      <CardBody className="space-y-4 pt-6">
        <div className="flex gap-2">
          <Input
            placeholder="Nhập mã giảm giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
          />
          <Button
            onPress={onApplyDiscount}
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Apply
          </Button>
        </div>
        {discountCode === "ARC10" && (
          <p className="text-green-500 text-sm">
            Giảm giá 10% đã được áp dụng!
          </p>
        )}
      </CardBody>
    </Card>
  );
}

export default DiscountCode;