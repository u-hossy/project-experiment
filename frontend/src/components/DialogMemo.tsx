import { DialogDescription } from "@radix-ui/react-dialog";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Payment } from "@/types/payment";

interface DialogMemoProps {
  index: number;
  disabled: boolean;
  details: Array<{
    id: number;
    paidFor: number;
    amount: number | "";
    memo: string;
  }>;
  setDetails: React.Dispatch<
    React.SetStateAction<
      Array<{ id: number; paidFor: number; amount: number | ""; memo: string }>
    >
  >;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export function DialogMemo({
  index,
  disabled,
  details,
  setDetails,
  setPayments,
}: DialogMemoProps) {
  const { eventId } = useParams();
  const handleMemoChange = (index: number, v: string) => {
    setDetails((prev) => {
      const updated = [...prev];
      updated[index].memo = v;

      const last = updated[updated.length - 1];
      if (last.amount !== "" && last.paidFor !== -1) {
        updated.push({ id: -1, paidFor: -1, amount: "", memo: "" });
      }

      return updated;
    });
  };

  const handleMemoBlur = async (index: number) => {
    const detail = details[index];

    if (detail.id !== -1) {
      // 既存を更新
      setPayments((prev) =>
        prev.map((p) =>
          p.id === detail.id
            ? { ...p, amount: Number(detail.amount) || 0, memo: detail.memo }
            : p,
        ),
      );
    }

    await fetch(`http://127.0.0.1:8000/api/v1/payments/patch_by_key/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        payment_id: detail.id,
        note: detail.memo,
      }),
    });

    if (
      index === details.length - 1 &&
      (detail.paidFor !== -1 || detail.amount !== "")
    ) {
      setDetails((prev) => [
        ...prev,
        { id: -1, paidFor: -1, amount: "", memo: "" },
      ]);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`cursor-pointer select-none rounded-full p-2 transition ${disabled ? "pointer-events-none opacity-40" : "hover:bg-gray-200"}
          `}
        >
          <img
            src="/notebook-text.svg"
            alt="割り勘アイコン"
            className="mr-2 ml-2 h-9 w-9"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>メモ</DialogTitle>
          <DialogDescription>
            入力後に閉じると自動で保存されます。
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="string"
              placeholder=""
              value={details[index].memo}
              onChange={(e) => handleMemoChange(index, e.target.value)}
              onBlur={() => handleMemoBlur(index)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
