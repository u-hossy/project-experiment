
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AlgorithmPage from "./pages/AlgorithmPage";
import BillingPage from "./pages/BillingPage";
import MembersPage from "./pages/MembersPage";
import ResultPage from "./pages/ResultPage";
import SidebarLinks from "./components/SideBarLinks";
import Header from "./components/Header";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";
import type { Result } from "./types/result";

export default function App() {
  const [members, setMembers] = useState<Member[]>([{ id: 1, name: "" }]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  return (
    
    <BrowserRouter>
    <div className="relative min-h-screen bg-gray-50">
      {/* メインコンテンツ部分 */}
      <main className="flex-1 p-18 pr-72">
        <div className="border border-gray-300 rounded-2xl shadow-sm bg-white p-8">
        <Header/>
      <Routes>
        {/* "/" にアクセスしたら /members にリダイレクト */}
        <Route path="/" element={<Navigate to="/members" replace />} />

        <Route
          path="/members"
          element={
            <MembersPage
              members={members}
              setMembers={setMembers}
              setPayments={setPayments}
            />
          }
        />

        <Route
          path="/billing"
          element={
            <BillingPage
              members={members}
              payments={payments}
              setPayments={setPayments}
            />
          }
        />

        <Route
          path="/algorithm"
          element={
            <AlgorithmPage
              members={members}
              payments={payments}
              setResults={setResults} // 計算結果をここで更新
            />
          }
        />

        <Route
          path="/result"
          element={
            <ResultPage
              members={members}
              results={results} // 計算結果を渡す
            />
          }
        />
      </Routes>
      </div>
      </main>
        {/* サイドバーを右側に固定 */}
        <SidebarLinks />
      </div>
    </BrowserRouter>
  );
}
