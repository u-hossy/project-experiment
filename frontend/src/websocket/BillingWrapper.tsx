import { useEffect } from "react";
import { useSharedChatHandler } from "@/hooks/WebSocketContext";
import BillingPage from "../pages/BillingPage";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface Props {
  members: Member[];
  payments: Payment[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingWrapper({
  members,
  payments,
  setMembers,
  setPayments,
}: Props) {
  const ws = useSharedChatHandler();

  useEffect(() => {
    ws.onMessage({
      onPayment: (p) => setPayments((prev) => [...prev, p]),
      onMember: (m) => console.log("member received:", m),
    });
  }, [ws, setPayments]);

  return (
    <BillingPage
      members={members}
      payments={payments}
      setMembers={setMembers}
      setPayments={setPayments}
    />
  );
}
