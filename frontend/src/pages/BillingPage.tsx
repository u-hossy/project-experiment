import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConnectAlert } from "@/components/ConnectAlert";
import { useSharedChatHandler } from "@/hooks/WebSocketContext";
import BillingTabList from "../components/BillingTabList";
import CardWrapper from "../components/CardWrapper";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface BillingPageProps {
  members: Member[];
  payments: Payment[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

interface MemberResponse {
  member_id: number;
  name: string;
  id: number;
}

interface PaymentResponse {
  payment_id: number;
  paid_by: number;
  paid_for: number;
  amount: number;
  note: string;
}

export default function BillingPage({
  members,
  payments,
  setMembers,
  setPayments,
}: BillingPageProps) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const ws = useSharedChatHandler();

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/api/v1/payments/?event_id=${eventId}`)
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setPayments(
  //         (data as PaymentResponse[]).map((p) => ({
  //           id: p.payment_id,
  //           paidBy: p.paid_by,
  //           paidFor: p.paid_for,
  //           amount: p.amount,
  //           memo: p.note,
  //         })),
  //       ),
  //     );

  //   fetch(`http://127.0.0.1:8000/api/v1/members/?event_id=${eventId}`)
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setMembers(
  //         (data as MemberResponse[]).map((p) => ({
  //           id: p.member_id,
  //           name: p.name,
  //         })),
  //       ),
  //     );
  // }, [eventId, setMembers, setPayments]);

  const fetchMembers = useCallback(() => {
      fetch(`http://127.0.0.1:8000/api/v1/members/?event_id=${eventId}`)
      .then((res) => res.json())
      .then((data) =>
        setMembers(
          (data as MemberResponse[]).map((p) => ({
            id: p.member_id,
            name: p.name,
          })),
        ),
      );
    }, [eventId, setMembers]);

    const fetchPayments = useCallback(() => {
      fetch(`http://127.0.0.1:8000/api/v1/payments/?event_id=${eventId}`)
      .then((res) => res.json())
      .then((data) =>
        setPayments(
          (data as PaymentResponse[]).map((p) => ({
            id: p.payment_id,
            paidBy: p.paid_by,
            paidFor: p.paid_for,
            amount: p.amount,
            memo: p.note,
          })),
        ),
      );
    }, [eventId, setPayments])
  
    useEffect(() => {
      ws.onMessage({
          onMember: () => fetchMembers(),
          onPayment: () => fetchPayments(),
        });
      fetchMembers();
      fetchPayments();
    }, [fetchMembers, fetchPayments]);

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <ConnectAlert isConnected={ws.isConnected} />
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
