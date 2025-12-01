import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleMembers, samplePayments } from "@/data/sampleData";
import type { Member } from "@/types/member";
import { Button } from "./ui/button";

interface ExampleBillingDetailCardProps {
  paidBy: Member;
}

export default function ExampleBillingDetailCard({
  paidBy,
}: ExampleBillingDetailCardProps) {
  const payerPayments = samplePayments.filter((p) => p.paidBy === paidBy.id);

  return (
    <Card className="h-[450px] overflow-y-auto shadow-md">
      <CardHeader>
        <CardTitle>{paidBy.name}さんが受け取る金額の入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {payerPayments.map((detail, index) => {
          const isSelectable = detail.paidFor !== -1;
          return (
            <div
              key={detail.id !== -1 ? detail.id : `new-${index}`}
              className="border-b py-3 last:border-b-0"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Select
                    value={detail.paidFor === -1 ? "" : String(detail.paidFor)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="請求先" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleMembers
                        .filter((p) => p.id !== paidBy.id && p.name !== "")
                        .map((p) => (
                          <SelectItem key={p.id} value={String(p.id)}>
                            {p.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <span>さんから</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    disabled={!isSelectable}
                    placeholder="金額"
                    className="w-24"
                    value={detail.amount}
                  />
                  <span>円もらう</span>
                  <Button variant="destructive" className="cursor-pointer">
                    削除
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
