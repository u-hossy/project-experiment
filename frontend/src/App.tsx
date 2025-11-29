import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ResultPage from "./pages/AlgorithmAndResultPage";
import BillingPage from "./pages/BillingPage";
import MemberPage from "./pages/MembersPage";
import TopPage from "./pages/TopPage";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

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
