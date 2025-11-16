import { useNavigate } from "react-router-dom";
import BillingTabList from "../components/BillingTabList";
import CardWrapper from "../components/CardWrapper";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface BillingPageProps {
  members: Member[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingPage({
  members,
  payments,
  setPayments,
}: BillingPageProps) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <CardWrapper
        title="請求の追加"
        description="各メンバーに請求したい金額を入力してください"
        nextButton={null} // ボタンは下で自作
      >
        <BillingTabList
          members={members}
          payments={payments}
          setPayments={setPayments}
        />

        <div className="mt-4 flex gap-4">
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
      </CardWrapper>
    </div>
  );
}
