import { createContext, useContext } from "react";
import { useChatHandler } from "./useChatHandler";

const WebSocketContext = createContext<ReturnType<typeof useChatHandler> | null>(null);

interface WebSocketProviderProps {
    children: React.ReactNode;
    eventId: string;
}

export function WebSocketProvider({ children, eventId }: WebSocketProviderProps) {
    const ws = useChatHandler(`ws://localhost:8000/ws/warikan/${eventId}/`);
    
    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
}

export const useSharedChatHandler = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useSharedChatHandler must be used within a WebSocketProvider");
    }
    return context;
}