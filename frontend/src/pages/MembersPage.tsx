import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import MemberList from "../components/MemberList";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface MembersPageProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function MembersPage({ members, setMembers, setPayments }: MembersPageProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">メンバーの追加</h2>

      <MemberList members={members} setMembers={setMembers} setPayments={setPayments} />

      <div className="flex gap-4 mt-4">
        <Button onClick={() => navigate("/billing")} size="lg" disabled={!members.length}>
          次へ
        </Button>
      </div>
    </div>
  );
}
