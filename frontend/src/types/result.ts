import type { MemberId } from "./member";

interface Result {
  id: MemberId;
  amount: number;
  paidBy: MemberId;
  paidFor: MemberId;
}

export type { Result };
