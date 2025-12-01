import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Member } from "@/types/member";
import type { Payment } from "@/types/payment";
import { Button } from "./ui/button";

interface BillingDetailCardProps {
  paidBy: Member;
  members: Member[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingDetailCard({
  paidBy,
  members,
  payments,
  setPayments,
}: BillingDetailCardProps) {
  const [details, setDetails] = useState<
    Array<{ id: number; paidFor: number; amount: number | "" }>
  >([{ id: -1, paidFor: -1, amount: "" }]);
  const { eventId } = useParams();

  // payerに関連するpaymentsをdetailsに反映
  useEffect(() => {
    const payerPayments = payments.filter((p) => p.paidBy === paidBy.id);

    const newDetails = [
      ...payerPayments.map((p) => ({
        id: p.id,
        paidFor: p.paidFor,
        amount: p.amount,
      })),
      { id: -1, paidFor: -1, amount: "" as number | "" },
    ];

    setDetails(newDetails);
  }, [payments, paidBy.id]);

  const handleReceiverChange = async (index: number, value: string) => {
    const newValue = value === "none" ? -1 : Number(value);
    setDetails((prev) => {
      const updated = [...prev];
      updated[index].paidFor = newValue;
      return updated;
    });

    const detail = details[index];

    if (detail.id === -1) {
      // 新規作成
      const newId =
        payments.length > 0 ? Math.max(...payments.map((p) => p.id)) + 1 : 0;
      const newPayment: Payment = {
        id: newId,
        paidBy: paidBy.id,
        paidFor: newValue,
        amount: "",
      };
      setPayments((prev) => [...prev, newPayment]);

      await fetch("http://127.0.0.1:8000/api/v1/payments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          payment_id: newPayment.id,
          paid_by: newPayment.paidBy,
          paid_for: newPayment.paidFor,
          amount: 0,
          note: "",
        }),
      });

      // detailsのidも更新
      setDetails((prev) => {
        const updated = [...prev];
        updated[index].id = newId;
        return updated;
      });
    } else {
      // 既存を更新
      setPayments((prev) =>
        prev.map((p) => (p.id === detail.id ? { ...p, paidFor: newValue } : p)),
      );
    }
  };

  const handleAmountChange = (index: number, v: number | "") => {
    setDetails((prev) => {
      const updated = [...prev];
      updated[index].amount = v;

      const last = updated[updated.length - 1];
      if (last.amount !== "" && last.paidFor !== -1) {
        updated.push({ id: -1, paidFor: -1, amount: "" });
      }

      return updated;
    });
  };

  const handleBlur = async (index: number) => {
    const detail = details[index];

    if (detail.id !== -1) {
      // 既存を更新
      setPayments((prev) =>
        prev.map((p) =>
          p.id === detail.id ? { ...p, amount: Number(detail.amount) || 0 } : p,
        ),
      );
    }

    await fetch(`http://127.0.0.1:8000/api/v1/payments/patch_by_key/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        payment_id: detail.id,
        amount: detail.amount,
        note: "",
      }),
    });

    if (
      index === details.length - 1 &&
      (detail.paidFor !== -1 || detail.amount !== "")
    ) {
      setDetails((prev) => [...prev, { id: -1, paidFor: -1, amount: "" }]);
    }
  };

  const handleDeleteBilling = async (index: number) => {
    const target = details[index];

    if (!confirm("本当に削除しますか？")) return;

    if (target.id !== -1) {
      setPayments((prev) => prev.filter((p) => p.id !== target.id));

      await fetch(
        `http://127.0.0.1:8000/api/v1/payments/delete_by_key/?event_id=${eventId}&payment_id=${target.id}`,
        {
          method: "DELETE",
        },
      );
    }

    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="h-[450px] overflow-y-auto shadow-md">
      <CardHeader>
        <CardTitle>{paidBy.name}さんが受け取る金額の入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {details.map((detail, index) => {
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
                    onValueChange={(v) => handleReceiverChange(index, v)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="請求先" />
                    </SelectTrigger>
                    <SelectContent>
                      {members
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
                    onChange={(e) =>
                      handleAmountChange(
                        index,
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    onBlur={() => handleBlur(index)}
                  />
                  <span>円もらう</span>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteBilling(index)}
                    className="cursor-pointer"
                  >
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
