/* メッセージの受信と送信のイベント管理の実装 */

import { useCallback } from "react";
import { useWebSocket } from "./useWebSocket";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";

export type WsMessage = Member | Payment;

interface RawWsMessage {
  message: WsMessage;
}

export const useChatHandler = (url: string) => {
  const ws = useWebSocket<RawWsMessage>(url);

  const onMessage = useCallback(
    (handlers: { onMember?: (m: Member) => void; onPayment?: (p: Payment) => void }) => {
      ws.setOnMessage((raw) => {
        const msg = raw.message;
        if ("name" in msg) handlers.onMember?.(msg as Member);
        if ("amount" in msg) handlers.onPayment?.(msg as Payment);
      });
    },
    [ws]
  );

  return {
    isConnected: ws.isConnected,
    sendMessage: ws.sendMessage,
    onMessage,
    setOnMessage: ws.setOnMessage, 
  };
};
