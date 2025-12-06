import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConnectAlert } from "@/components/ConnectAlert";
import { useFetchMembers } from "@/hooks/useFetchMembers";
import { useFetchPayments } from "@/hooks/useFetchPayments";
import { useSharedChatHandler } from "@/hooks/WebSocketContext";
import CardWrapper from "../components/CardWrapper";
import MemberList from "../components/MemberList";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface MembersPageProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function MembersPage({
  members,
  setMembers,
  setPayments,
}: MembersPageProps) {
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
        title="メンバーの追加"
        description="まずは建て替え精算を行うメンバーを追加してください"
        nextButton={null} // ボタンは下で自作
      >
        <MemberList
          members={members}
          setMembers={setMembers}
          setPayments={setPayments}
        />

        <div className="mt-4 flex gap-4">
          <Button
            onClick={() => navigate(`/${eventId}/billing`)}
            size="lg"
            disabled={!members.length}
          >
            次へ
          </Button>
        </div>
      </CardWrapper>
    </div>
  );
}
