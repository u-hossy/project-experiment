import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import BillingTabList from "../components/BillingTabList";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface BillingPageProps {
  members: Member[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingPage({ members, payments, setPayments }: BillingPageProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">請求の追加</h2>

      <BillingTabList members={members} payments={payments} setPayments={setPayments} />

      <div className="flex gap-4 mt-4">
        <Button onClick={() => navigate("/members")} variant="outline">
          戻る
        </Button>
        <Button
          onClick={() => navigate("/algorithm")}
          disabled={payments.length === 0}
          size="lg"
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
