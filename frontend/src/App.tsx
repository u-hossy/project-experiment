import BillingTabList from "./components/BillingTabList";
import Result from "./components/ExampleResultTab";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import { datas } from "./tmp/tmp_datas";

function App() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <MemberList />
      <BillingTabList />
      <PaymentNetwork debts={datas} />
      <Result />
    </div>
  );
}

export default App;
