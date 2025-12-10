import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { refreshToken } from "./api/auth";
import { setAccessToken } from "./api/tokenStore";
import Header from "./components/Header";
import useWebSocket from "react-use-websocket";
import Layout from "./components/Layout";
import ResultPage from "./pages/AlgorithmAndResultPage";
import BillingPage from "./pages/BillingPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MembersPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import TopPage from "./pages/TopPage";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 px-2 pt-20 pb-48">
      <Header />
      {children}
    </div>
  );
}

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await refreshToken();
        setAccessToken(res.access); // Cookieから復元
      } catch {
        console.log("未ログインかrefresh token失効");
      }
    };
    init();
  }, []);
  // WebSocket設定
  // テスト用に固定ID。本来はURLパラメータやログイン情報から取得
  const groupId = "test_group";
  const socketUrl = `ws://127.0.0.1:8000/ws/warikan/${groupId}/`;

  const { lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket接続"),
    shouldReconnect: () => true, // 切断されても自動再接続
  });

  // サーバーからメッセージが届いた時の処理
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        const serverMessage = data.message;

        console.log("サーバーからの通知:", serverMessage);

        // サーバーからどんなデータが来たかで更新し分ける
        // サーバーが「最新のpaymentsリスト」を送ってきた場合
        if (serverMessage.payments) {
          setPayments(serverMessage.payments);
        }

        // サーバーが「最新のmembersリスト」を送ってきた場合
        if (serverMessage.members) {
          setMembers(serverMessage.members);
        }
      } catch (e) {
        console.error("メッセージの解析に失敗:", e);
      }
    }
  }, [lastMessage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/top" replace />} />

          <Route path="top" element={<TopPage />} />
          <Route
            path=":eventId/members"
            element={
              <MemberPage
                members={members}
                setMembers={setMembers}
                setPayments={setPayments}
              />
            }
          />
          <Route
            path=":eventId/billing"
            element={
              <BillingPage
                members={members}
                payments={payments}
                setMembers={setMembers}
                setPayments={setPayments}
              />
            }
          />
          <Route
            path=":eventId/algorithmAndresults"
            element={<ResultPage members={members} payments={payments} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
