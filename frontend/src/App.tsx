import BillingTabList from "./components/BillingTabList";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/PaymentNetwork";
import { datas } from "./tmp/tmp_datas";

function App() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <MemberList />
      <BillingTabList />
      <PaymentNetwork debts={datas} />
    </div>
  );
}

export default App;
