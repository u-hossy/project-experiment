/* メッセージの受信と送信のイベント管理の実装 */

import { useCallback } from "react";
import { useWebSocket } from "./useWebSocket";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

export type WsMessage = 
  | { type: "member_added"; member: Member}
  | { type: "payment_added"; payment: Payment};



export const useChatHandler = (url: string) => {
  const ws = useWebSocket<WsMessage>(url);

  const onMessage = useCallback(
    (handlers: { onMember?: (m: Member) => void; onPayment?: (p: Payment) => void }) => {
      ws.setOnMessage((raw) => {
        if (raw.type === "member_added") handlers.onMember?.(raw.member);
        if (raw.type === "payment_added") handlers.onPayment?.(raw.payment);
      });
    },
    [ws]
  );

  return {
    isConnected: ws.isConnected,
    sendMessage: (msg: WsMessage) => ws.sendMessage(msg),
    onMessage,

  };
};
