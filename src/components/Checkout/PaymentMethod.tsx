import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentOption {
  id: string;
  name: string;
  image?: string;
}

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  paymentOptions: PaymentOption[];
  isLoading: boolean;
}

export function PaymentMethod({ paymentMethod, setPaymentMethod, paymentOptions, isLoading }: PaymentMethodProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-zinc-800/30 transition-shadow">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle>Phương thức thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full bg-zinc-800" />
            <Skeleton className="h-12 w-full bg-zinc-800" />
            <Skeleton className="h-12 w-full bg-zinc-800" />
          </div>
        ) : (
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-2 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.name}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
}

