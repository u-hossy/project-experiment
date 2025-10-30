import BillingTabList from "./components/BillingTabList";
import CardWrapper from "./components/CardWrapper";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import { datas } from "./tmp/tmp_datas";

function App() {
  return (
    <div
      style={{
        paddingTop: "80px",
        paddingBottom: "200px",
        justifyContent: "center",
        gap: "32px",
      }}
    >
      <Header />
      <CardWrapper title="メンバー 一覧">
        <MemberList />
      </CardWrapper>
      <CardWrapper title="精算">
        <BillingTabList />
      </CardWrapper>
      <CardWrapper title="ネットワークグラフ">
        <PaymentNetwork debts={datas} />
      </CardWrapper>
    </div>
  );
}

export default App;
