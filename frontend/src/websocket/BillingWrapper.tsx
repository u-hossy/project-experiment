import { useEffect } from "react";
import BillingPage from "../pages/BillingPage";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";
import { useSharedChatHandler } from "@/hooks/WebSocketContext";

interface Props {
  members: Member[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingWrapper({ members, payments, setPayments }: Props) {
  const ws = useSharedChatHandler();

  useEffect(() => {
    ws.onMessage({
      onPayment: (p) => setPayments(prev => [...prev, p]),
      onMember: (m) => console.log("member received:", m)
    });
  }, [ws, setPayments]);

  return (
    <BillingPage
      members={members}
      payments={payments}
      setPayments={setPayments}
    />
  );
}
