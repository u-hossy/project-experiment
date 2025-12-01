import type { MemberId } from "./member";

interface Payment {
  id: MemberId;
  amount: number | "";
  paidBy: MemberId;
  paidFor: MemberId;
  memo: string;
}

export type { Payment };
