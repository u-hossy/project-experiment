import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { samplePayments } from "@/data/sampleData";
import { Button } from "./ui/button";

type ExampleBillingDetailCardProps = {
  payer: number;
};

export default function ExampleBillingDetailCard({
  payer,
}: ExampleBillingDetailCardProps) {
  const people = Array.from(
    new Set(
      samplePayments
        .map((s) => s.paidBy)
        .concat(samplePayments.map((s) => s.paidFor)),
    ),
  );

  return (
    <Card className="h-[450px] overflow-y-auto p-4 shadow-md">
      <CardHeader>
        <CardTitle>{payer}さんの送金先と金額</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {samplePayments
          .filter((b) => b.paidBy === payer)
          .map((detail, index) => {
            const isSelectable = detail.paidFor !== "";
            return (
              <div key={index} className="flex items-center gap-3">
                <Select value={detail.paidFor}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="送金先" />
                  </SelectTrigger>
                  <SelectContent>
                    {people
                      .filter((p) => p !== "")
                      .map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Input
                  readOnly
                  type="number"
                  disabled={!isSelectable}
                  placeholder="金額"
                  className="w-[120px]"
                  value={detail.amount}
                />
                <span>円</span>
                <Button className="cursor-pointer hover:bg-gray-800">
                  削除
                </Button>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
