import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ResultPage from "./pages/AlgorithmAndResultPage";
import BillingPage from "./pages/BillingPage";
import MemberPage from "./pages/MembersPage";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center gap-8 px-2 pt-20 pb-48">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/members" replace />} />
          <Route
            path="/members"
            element={
              <MemberPage
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
            path="/algorithmAndresults"
            element={<ResultPage members={members} payments={payments} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
