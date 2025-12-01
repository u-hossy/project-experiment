import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MembersPage from "../pages/MembersPage";
import { useChatHandler, type WsMessage } from "../hooks/useChatHandler";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface Props {
  members: Member[];
  payments: Payment[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function MembersWrapper({ members,  setMembers, setPayments }: Props) {
  const { eventId } = useParams();
  const ws = useChatHandler(`ws://localhost:8000/ws/warikan/${eventId}/`);

  useEffect(() => {
    ws.setOnMessage((raw: { message: WsMessage }) => {
      const msg = raw.message;

      if ("name" in msg) setMembers((prev) => [...prev, msg]);
      if ("amount" in msg) setPayments((prev) => [...prev, msg]);
    });
  }, [ws, setMembers, setPayments]);

  return (
    <MembersPage
      members={members}
      setMembers={setMembers}
      setPayments={setPayments}
    />
  );
}
