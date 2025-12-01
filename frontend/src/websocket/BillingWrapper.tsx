import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BillingPage from "../pages/BillingPage";
import { useChatHandler } from "../hooks/useChatHandler";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

interface Props {
  members: Member[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function BillingWrapper({ members, payments, setPayments }: Props) {
  const { eventId } = useParams();
  const ws = useChatHandler(`ws://localhost:8000/ws/warikan/${eventId}/`);

  useEffect(() => {
    ws.setOnMessage((raw: { message: Member | Payment }) => {
      const msg = raw.message;
      if ("amount" in msg) {
        setPayments((prev) => [...prev, msg]);
      }
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
