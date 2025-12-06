import {  useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConnectAlert } from "@/components/ConnectAlert";
import { useFetchMembers } from "@/hooks/useFetchMembers";
import { useFetchPayments } from "@/hooks/useFetchPayments";
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

export default function BillingPage({
  members,
  payments,
  setMembers,
  setPayments,
}: BillingPageProps) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const ws = useSharedChatHandler();

  const fetchMembers = useFetchMembers({ eventId, setMembers });
  const fetchPayments = useFetchPayments({ eventId, setPayments });

  useEffect(() => {
    ws.onMessage({
      onMember: () => fetchMembers,
      onPayment: () => fetchPayments,
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
