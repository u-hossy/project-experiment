import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ResultPage from "./pages/AlgorithmAndResultPage";
import BillingPage from "./pages/BillingPage";
import MemberPage from "./pages/MembersPage";
import HomePage from "./pages/Homepage";
import Layout from "./components/Layout";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Navigate to="/homepage" replace />} />

          <Route
            path="homepage"
            element={
              <HomePage/>
            }
          />
          <Route
            path="members"
            element={
              <MemberPage
                members={members}
                setMembers={setMembers}
                setPayments={setPayments}
              />
            }
          />
          <Route
            path="billing"
            element={
              <BillingPage
                members={members}
                payments={payments}
                setPayments={setPayments}
              />
            }
          />
          <Route
            path="algorithmAndresults"
            element={<ResultPage members={members} payments={payments} />}
          />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
