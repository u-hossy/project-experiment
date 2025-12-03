import { Outlet, useParams } from "react-router-dom";
import { WebSocketProvider } from "../hooks/WebSocketContext";

export default function EventRoot() {
  const { eventId } = useParams<{ eventId: string }>();

  // eventIdがない場合はエラーハンドリング（またはリダイレクト）
  if (!eventId) {
    return <div>エラー: イベントIDが見つかりません。</div>;
  }

  return (
    <WebSocketProvider eventId={eventId}>
      <Outlet />
    </WebSocketProvider>
  );
}
