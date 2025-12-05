import { useEffect } from "react";
import { useSharedChatHandler } from "@/hooks/WebSocketContext";
import MembersPage from "../pages/MembersPage";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface Props {
  members: Member[];
  payments?: Payment[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function MembersWrapper({
  members,
  setMembers,
  setPayments,
}: Props) {
  // const ws = useSharedChatHandler();
  // useEffect(() => {
  //   ws.onMessage({
  //     onMember: (m: Member) => setMembers((prev) => [...prev, m]),
  //     onPayment: (p: Payment) => setPayments((prev) => [...prev, p]),
  //   });
  // }, [ws, setMembers, setPayments]);

  return (
    <MembersPage
      members={members}
      setMembers={setMembers}
      setPayments={setPayments}
    />
  );
}
