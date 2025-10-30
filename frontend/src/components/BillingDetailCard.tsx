import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Billing } from "@/type/billing";
import type { Person } from "@/type/person";
import { Button } from "./ui/button";

type BillingDetailCardProps = {
  payer: Person;
};

export default function BillingDetailCard({ payer }: BillingDetailCardProps) {
  const [people, setPeople] = useState<Person[]>([]);
  const [details, setDetails] = useState([
    { id: crypto.randomUUID(), receiverId: "", amount: "" as number | "" },
  ]);

  useEffect(() => {
    const loadData = async () => {
      const resPeople = await fetch("http://localhost:3001/members");
      const resBilling = await fetch("http://localhost:3001/billings");

      const peopleData = await resPeople.json();
      const billingData = await resBilling.json();

      setPeople(peopleData);

      const payerBilling = billingData.filter(
        (b: Billing) => b.payerId === payer.id,
      );

      const newDetails = [
        ...payerBilling.map((b: Billing) => ({
          id: b.id,
          receiverId: b.receiverId,
          amount: b.amount,
        })),
        { id: crypto.randomUUID(), receiverId: "", amount: "" },
      ];

      setDetails(newDetails);
    };

    loadData();
  }, [payer.id]);

  const handleReceiverChange = async (index: number, value: string) => {
    const newValue = value === "none" ? "" : value;
    setDetails((prev) => {
      const updated = [...prev];
      updated[index].receiverId = newValue;
      return updated;
    });

    const d = details[index];
    const billing: Billing = {
      id: d.id,
      payerId: payer.id,
      receiverId: newValue,
      amount: Number(d.amount),
    };

    const res = await fetch(`http://localhost:3001/billings/${d.id}`);
    const methohd = res.ok ? "PATCH" : "POST";
    const url = res.ok
      ? `http://localhost:3001/billings/${d.id}`
      : `http://localhost:3001/billings`;

    await fetch(url, {
      method: methohd,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billing),
    });
  };

  const handleAmountChange = (index: number, v: number | "") => {
    setDetails((prev) => {
      const updated = [...prev];
      updated[index].amount = v;

      const last = updated[updated.length - 1];
      if (last.amount !== "") {
        updated.push({ id: crypto.randomUUID(), receiverId: "", amount: "" });
      }

      return updated;
    });
  };

  const handleBlur = async (index: number) => {
    const d = details[index];

    const billing: Billing = {
      id: d.id,
      payerId: payer.id,
      receiverId: d.receiverId,
      amount: Number(d.amount),
    };

    const res = await fetch(`http://localhost:3001/billings/${d.id}`);
    const method = res.ok ? "PATCH" : "POST";
    const url = res.ok
      ? `http://localhost:3001/billings/${d.id}`
      : `http://localhost:3001/billings`;

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billing),
    });

    if (index === details.length - 1) {
      setDetails((prev) => [
        ...prev,
        { id: crypto.randomUUID(), receiverId: "", amount: "" },
      ]);
    }
  };

  const handleDeleteBilling = async (index: number) => {
    const target = details[index];

    if (!confirm("本当に削除しますか？")) return;

    await fetch(`http://localhost:3001/billings/${target.id}`, {
      method: "DELETE",
    });

    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-4 shadow-md overflow-y-auto h-[450px]">
      <CardHeader>
        <CardTitle>{payer.name}さんの送金先と金額</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {details.map((detail, index) => {
          const isSelectable = detail.receiverId !== "";
          return (
            <div key={index} className="flex items-center gap-3">
              <Select
                value={detail.receiverId}
                onValueChange={(v) => handleReceiverChange(index, v)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="送金先" />
                </SelectTrigger>
                <SelectContent>
                  {people
                    .filter((p) => p.id !== payer.id && p.name !== "")
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                disabled={!isSelectable}
                placeholder="金額"
                className="w-[120px]"
                value={detail.amount}
                onChange={(e) =>
                  handleAmountChange(
                    index,
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                onBlur={() => handleBlur(index)}
              />
              <span>円</span>
              <Button onClick={() => handleDeleteBilling(index)}>削除</Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
