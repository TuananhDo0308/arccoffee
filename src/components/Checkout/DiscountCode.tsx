import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface DiscountCodeProps {
  discountCode: string;
  setDiscountCode: (code: string) => void;
}

export function DiscountCode({ discountCode, setDiscountCode }: DiscountCodeProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-zinc-800/30 transition-shadow">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle>Mã giảm giá</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex gap-2">
          <Input
            placeholder="Nhập mã giảm giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
          />
          <Button
            variant="secondary"
            className="bg-zinc-800 hover:bg-zinc-700"
          >
            Áp dụng
          </Button>
        </div>
        {discountCode === "ARC10" && (
          <p className="text-green-500 text-sm">
            Giảm giá 10% đã được áp dụng!
          </p>
        )}
      </CardContent>
    </Card>
  );
}

