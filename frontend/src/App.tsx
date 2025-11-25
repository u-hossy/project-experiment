import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { refreshToken } from "./api/auth";
import { setAccessToken } from "./api/tokenStore";
import Header from "./components/Header";
import ResultPage from "./pages/AlgorithmAndResultPage";
import BillingPage from "./pages/BillingPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MembersPage";
import ProtectedRoute from "./routes/ProtectedRoute";
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MemberPage
                  members={members}
                  setMembers={setMembers}
                  setPayments={setPayments}
                />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BillingPage
                  members={members}
                  payments={payments}
                  setPayments={setPayments}
                />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/algorithmAndresults"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ResultPage members={members} payments={payments} />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
