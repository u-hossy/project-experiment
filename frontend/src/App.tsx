import BillingTabList from "./components/BillingTabList";
import CardWrapper from "./components/CardWrapper";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import { datas } from "./tmp/tmp_datas";

function App() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-20 pb-48 px-8"
    >
      <Header />
      <CardWrapper title="メンバー 一覧">
        <MemberList />
      </CardWrapper>
      <CardWrapper title="精算">
        <BillingTabList />
      </CardWrapper>
      <CardWrapper title="計算結果">
        <p>テスト</p>
      </CardWrapper>
      <CardWrapper title="ネットワークグラフ">
        <PaymentNetwork debts={datas} />
      </CardWrapper>
    </div>
  );
}

export default App;
