import { useNavigate, useParams } from "react-router-dom";
import BillingTabList from "../components/BillingTabList";
import CardWrapper from "../components/CardWrapper";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";
import { useEffect } from "react";

interface BillingPageProps {
  members: Member[];
  payments: Payment[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingPage({
  members,
  payments,
  setMembers,
  setPayments,
}: BillingPageProps) {
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/payments/?event_id=${eventId}`)
      .then((res) => res.json())
      .then((data) => setPayments(
        data.map((p: any) => ({
          id: p.payment_id,
          paidBy: p.paid_by,
          paidFor: p.paid_for,
          amount: p.amount,
        }))
      ));
    
    fetch(`http://127.0.0.1:8000/api/v1/members/?event_id=${eventId}`)
      .then((res) => res.json())
      .then((data) => setMembers(
        data.map((p: any) => ({
          id: p.member_id,
          name: p.name,
        }))
      ));
  }, [eventId]);

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
          <Button
            onClick={() => navigate(`/${eventId}/members`)}
            variant="outline"
          >
            戻る
          </Button>
          <Button
            onClick={() => navigate(`/${eventId}/algorithmAndresults`)}
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
