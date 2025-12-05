import { createContext, useContext } from "react";
import { useChatHandler } from "./useChatHandler";

const WebSocketContext = createContext<ReturnType<
  typeof useChatHandler
> | null>(null);

interface WebSocketProviderProps {
  children: React.ReactNode;
  eventId: string;
}

export function WebSocketProvider({
  children,
  eventId,
}: WebSocketProviderProps) {
  const wsEndpoint = import.meta.env.VITE_WS_ENDPOINT;
  const ws = useChatHandler(`${wsEndpoint}/warikan/${eventId}/`);
  

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}

export const useSharedChatHandler = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useSharedChatHandler must be used within a WebSocketProvider",
    );
  }
  return context;
};
