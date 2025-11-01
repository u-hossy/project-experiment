import BillingTabList from "./components/BillingTabList";
import CardWrapper from "./components/CardWrapper";
import ExampleBillingTabList from "./components/ExampleBillingTabList";
import Result from "./components/ExampleResultTab";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import { sampleResult } from "./data/sampleData";
import useMemberExist from "./hooks/useMemberExist";
import { datas } from "./tmp/tmp_datas";

function App() {
  const isMemberExist = useMemberExist();

  return (
    <div className="grid grid-cols-1 gap-8 px-8 pt-20 pb-48 md:grid-cols-2">
      <Header />
      <CardWrapper title="メンバー">
        <MemberList />
      </CardWrapper>
      {isMemberExist ? (
        <CardWrapper title="精算">
          <BillingTabList />
        </CardWrapper>
      ) : (
        <CardWrapper title="精算（例）">
          <ExampleBillingTabList />
        </CardWrapper>
      )}
      {isMemberExist ? (
        <CardWrapper title="計算結果">
          <p>テスト</p>
        </CardWrapper>
      ) : (
        <CardWrapper title="計算結果（例）">
          <Result />
        </CardWrapper>
      )}
      {isMemberExist ? (
        <CardWrapper title="ネットワークグラフ">
          <PaymentNetwork debts={datas} />
        </CardWrapper>
      ) : (
        <CardWrapper title="ネットワークグラフ（例）">
          <PaymentNetwork debts={sampleResult} />
        </CardWrapper>
      )}
    </div>
  );
}

export default App;
