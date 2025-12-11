import { useCallback } from "react";
import type { Payment } from "@/types/payment";

interface FetchPaymentsProps {
  eventId?: string;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

interface PaymentResponse {
  payment_id: number;
  paid_by: number;
  paid_for: number;
  amount: number;
  note: string;
}

export const useFetchPayments = ({
  eventId,
  setPayments,
}: FetchPaymentsProps) => {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  return useCallback(() => {
    fetch(`${apiEndpoint}/api/v1/payments/?event_id=${eventId}`)
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
  }, [eventId, setPayments]);
};
