import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomerInformationProps {
  customerNote: string;
  setCustomerNote: (note: string) => void;
  address: string;
  setAddress: (address: string) => void;
  ward: string;
  setWard: (ward: string) => void;
  district: string;
  setDistrict: (district: string) => void;
  city: string;
  setCity: (city: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

export function CustomerInformation({
  customerNote,
  setCustomerNote,
  address,
  setAddress,
  ward,
  setWard,
  district,
  setDistrict,
  city,
  setCity,
  phoneNumber,
  setPhoneNumber,
}: CustomerInformationProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-zinc-800/30 transition-shadow">
      <CardHeader className="border-b border-zinc-800">
        <CardTitle>Thông tin khách hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="customerNote">Ghi chú</Label>
          <Input
            id="customerNote"
            placeholder="Nhập ghi chú của bạn"
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            placeholder="Nhập địa chỉ của bạn"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Thành phố</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                <SelectItem value="danang">Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">Quận/Huyện</Label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="district1">Quận 1</SelectItem>
                <SelectItem value="district2">Quận 2</SelectItem>
                <SelectItem value="district3">Quận 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward">Phường/Xã</Label>
            <Select value={ward} onValueChange={setWard}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Chọn phường/xã" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ward1">Phường 1</SelectItem>
                <SelectItem value="ward2">Phường 2</SelectItem>
                <SelectItem value="ward3">Phường 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input
            id="phoneNumber"
            placeholder="Nhập số điện thoại của bạn"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-zinc-800 border-zinc-700 focus:border-zinc-600"
          />
        </div>
      </CardContent>
    </Card>
  );
}

