import { useNavigate } from "react-router-dom";
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

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <h2 className="mb-4 font-semibold text-xl">メンバーの追加</h2>

      <MemberList
        members={members}
        setMembers={setMembers}
        setPayments={setPayments}
      />

      <div className="mt-4 flex gap-4">
        <Button
          onClick={() => navigate("/billing")}
          size="lg"
          disabled={!members.length}
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
