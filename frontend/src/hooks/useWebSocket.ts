/* メッセージの受信と送信のイベント管理の実装 */
import { useCallback, useEffect, useRef, useState} from "react";

/* 送受信するデータ型の設定 */
export type MemberId = number;

export interface Member {
    id: MemberId;
    name: string;
}

export interface Payment {
    id: number;
    amount: number | "";
    paidBy: MemberId;
    paidFor: MemberId;
}

export type WsMessage = Member | Payment;

/* WebSocket接続を管理するカスタムフック */
export const useWebSocket = (url: string) => {
    const wsRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const onMessageRef = useRef<((msg: WsMessage) => void) | null>(null); 

    useEffect(() => {
        /* WebSocket接続の確立 */
        const ws = new WebSocket(url);
        wsRef.current = ws;

        /* WebSocketイベントのハンドラ */
        const handleOpen = () => {
            setIsConnected(true);
        };

        const handleClose = () => {
            setIsConnected(false);
        };

        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data) as WsMessage;
                onMessageRef.current?.(data);
            } catch (_error) {
                console.error("Failed to parse WebSocket message:", event.data);
            }
        };

        ws.addEventListener("open", handleOpen);
        ws.addEventListener("close", handleClose);
        ws.addEventListener("message", handleMessage);

        return () => {
            ws.close();
            ws.removeEventListener("open", handleOpen);
            ws.removeEventListener("close", handleClose);
            ws.removeEventListener("message", handleMessage);
        };
    }, [url]);

    /* メッセージ受信時 */
    const setOnMessage = (handler: (msg: WsMessage) => void) => {
        onMessageRef.current = handler;
    };

    /* メッセージ送信時 */
    const sendMessage = useCallback((msg: WsMessage) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not connected.");
            return;
        }
        wsRef.current.send(JSON.stringify(msg));
    }, []);

    return { isConnected, sendMessage, setOnMessage };
};