import type { MemberId } from "./member";

interface Payment {
  id: MemberId;
  amount: number;
  paidBy: MemberId;
  paidFor: MemberId;
}

export type { Payment };
