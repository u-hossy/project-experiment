import { useRef } from "react";
import BillingTabList from "./components/BillingTabList";
import CardWrapper from "./components/CardWrapper";
import ExampleBillingTabList from "./components/ExampleBillingTabList";
import Result from "./components/ExampleResultTab";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import { Button } from "./components/ui/button";
import { sampleResult } from "./data/sampleData";
import useMemberExist from "./hooks/useMemberExist";
import { data } from "./tmp/tmp_data";

function App() {
  const isMemberExist = useMemberExist();

  // 各セクションへの参照
  const memberSectionRef = useRef<HTMLDivElement>(null);
  const billingSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const networkSectionRef = useRef<HTMLDivElement>(null);

  // スクロール関数
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex flex-col gap-8 px-8 pt-20 pb-48">
      <Header />

      <CardWrapper
        ref={memberSectionRef}
        title="メンバー"
        nextButton={
          isMemberExist && (
            <Button
              onClick={() => scrollToSection(billingSectionRef)}
              size="lg"
            >
              次へ
            </Button>
          )
        }
      >
        <MemberList />
      </CardWrapper>

      {isMemberExist ? (
        <CardWrapper
          ref={billingSectionRef}
          title="精算"
          nextButton={
            <Button onClick={() => scrollToSection(resultSectionRef)} size="lg">
              次へ
            </Button>
          }
        >
          <BillingTabList />
        </CardWrapper>
      ) : (
        <CardWrapper ref={billingSectionRef} title="精算(例)">
          <ExampleBillingTabList />
        </CardWrapper>
      )}

      {isMemberExist ? (
        <CardWrapper
          ref={resultSectionRef}
          title="計算結果"
          nextButton={
            <Button
              onClick={() => scrollToSection(networkSectionRef)}
              size="lg"
            >
              次へ
            </Button>
          }
        >
          <p>テスト</p>
        </CardWrapper>
      ) : (
        <CardWrapper ref={resultSectionRef} title="計算結果">
          <Result />
        </CardWrapper>
      )}

      {isMemberExist ? (
        <CardWrapper ref={networkSectionRef} title="ネットワークグラフ">
          <PaymentNetwork debts={data} />
        </CardWrapper>
      ) : (
        <CardWrapper ref={networkSectionRef} title="ネットワークグラフ(例)">
          <PaymentNetwork debts={sampleResult} />
        </CardWrapper>
      )}
    </div>
  );
}

export default App;
