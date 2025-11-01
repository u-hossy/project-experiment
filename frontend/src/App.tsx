import { useRef, useState } from "react";
import BillingTabList from "./components/BillingTabList";
import CardWrapper from "./components/CardWrapper";
import ExampleBillingTabList from "./components/ExampleBillingTabList";
import Result from "./components/ExampleResultTab";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import { Button } from "./components/ui/button";
import { sampleResult } from "./data/sampleData";
import { data } from "./tmp/tmp_data";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // メンバーが存在するかチェック
  const isMemberExist = members.some((m) => m.name !== "");

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
    <div className="flex flex-col items-center gap-8 px-8 pt-20 pb-48">
      <Header />
      <main className="w-full min-w-80 max-w-4xl">
        <CardWrapper
          ref={memberSectionRef}
          title="メンバーの追加"
          description="まずは建て替え精算を行うメンバーを追加してください"
          nextButton={
            <Button
              onClick={() => scrollToSection(billingSectionRef)}
              size="lg"
              disabled={!isMemberExist}
              className="cursor-pointer"
            >
              次へ
            </Button>
          }
        >
          <MemberList
            members={members}
            setMembers={setMembers}
            setPayments={setPayments}
          />
        </CardWrapper>

        {isMemberExist ? (
          <CardWrapper
            ref={billingSectionRef}
            title="請求の追加"
            description="次に各メンバーに請求したい金額を入力してください"
            nextButton={
              <Button
                onClick={() => scrollToSection(resultSectionRef)}
                size="lg"
                className="cursor-pointer"
              >
                次へ
              </Button>
            }
          >
            <BillingTabList
              members={members}
              payments={payments}
              setPayments={setPayments}
            />
          </CardWrapper>
        ) : (
          <CardWrapper
            ref={billingSectionRef}
            title="精算(例)"
            description="これは精算の入力例です。実際に使用する場合は、まずメンバーを追加してください。"
          >
            <ExampleBillingTabList />
          </CardWrapper>
        )}

        {isMemberExist ? (
          <CardWrapper
            ref={resultSectionRef}
            title="計算結果"
            description="最適化された精算結果を表示します。送金回数と送金金額が最小になるように計算されています。"
            nextButton={
              <Button
                onClick={() => scrollToSection(networkSectionRef)}
                size="lg"
                className="cursor-pointer"
              >
                次へ
              </Button>
            }
          >
            <p>テスト</p>
          </CardWrapper>
        ) : (
          <CardWrapper
            ref={resultSectionRef}
            title="計算結果"
            description="これは計算結果の表示例です。実際のデータを入力すると、ここに最適化された精算結果が表示されます。"
          >
            <Result />
          </CardWrapper>
        )}

        {isMemberExist ? (
          <CardWrapper
            ref={networkSectionRef}
            title="ネットワークグラフ"
            description="精算のお金の流れを視覚的に表示します。矢印の向きが送金の方向、太さが金額を表しています。"
          >
            <PaymentNetwork debts={data} />
          </CardWrapper>
        ) : (
          <CardWrapper
            ref={networkSectionRef}
            title="ネットワークグラフ(例)"
            description="これはネットワークグラフの表示例です。お金の流れを視覚的に確認できます。"
          >
            <PaymentNetwork debts={sampleResult} />
          </CardWrapper>
        )}
      </main>
    </div>
  );
}

export default App;
