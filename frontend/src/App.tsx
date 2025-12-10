import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EventRoot from "./components/EventRoot";
import Layout from "./components/Layout";
import AlgorithmAndResultPage from "./pages/AlgorithmAndResultPage";
import BillingPage from "./pages/BillingPage";
import MembersPage from "./pages/MembersPage";
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
          <Route path=":eventId" element={<EventRoot />}>
            <Route
              path=":members"
              element={
                <MembersPage
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
                  setMembers={setMembers}
                  setPayments={setPayments}
                />
              }
            />
            <Route
              path="algorithmAndresults"
              element={
                <AlgorithmAndResultPage members={members} payments={payments} />
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
