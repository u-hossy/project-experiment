import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ResultPage from "./pages/AlgorithmAndResultPage";
import TopPage from "./pages/TopPage";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";
import EventRoot from "./components/EventRoot";
import MembersWrapper from "./websocket/MembersWrapper";
import BillingWrapper from "./websocket/BillingWrapper";

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/top" replace />} />

          <Route path="top" element={<TopPage />} />
          <Route path=":eventId" element={<EventRoot/>}>
          <Route
            path=":members"
            element={
              <MembersWrapper
                members={members}
                setMembers={setMembers}
                setPayments={setPayments}
               />
            }
          />
          <Route
            path="billing"
            element={
              <BillingWrapper
                members={members}
                payments={payments}
                setMembers={setMembers}
                setPayments={setPayments}
              />
            }
          />
          <Route
            path=":algorithmAndresults"
            element={<ResultPage members={members} payments={payments} />}
          />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
