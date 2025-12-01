/* 接続、再接続、切断のライフサイクル管理の実装 */

import { useCallback, useEffect, useRef, useState } from "react";

interface UseWebSocketOptions {
  reconnect?: boolean;
  reconnectInterval?: number;
}

export function useWebSocket<T = unknown>(
  url: string,
  options: UseWebSocketOptions = {}
) {
  const { reconnect = true, reconnectInterval = 3000 } = options;

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageHandlerRef = useRef<((data: T) => void) | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (socketRef.current) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[WebSocket] Connected:", url);
      setIsConnected(true);

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };

    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as T;
        messageHandlerRef.current?.(parsed);
      } catch (_err) {
        console.error("[WebSocket] Failed to parse message:", event.data);
      }
    };

    socket.onclose = () => {
      console.log("[WebSocket] Disconnected:", url);
      setIsConnected(false);
      socketRef.current = null;

      if (reconnect) {
        reconnectTimerRef.current = setTimeout(connect, reconnectInterval);
      }
    };

    socket.onerror = (err) => {
      console.error("[WebSocket] Error:", err);
      socket.close();
    };
  }, [url, reconnect, reconnectInterval]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      socketRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((message: T) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("[WebSocket] Cannot send message. Not connected.");
    }
  }, []);

  const setOnMessage = useCallback((handler: (data: T) => void) => {
    messageHandlerRef.current = handler;
  }, []);

  return {
    isConnected,
    sendMessage,
    setOnMessage,
  };
}
