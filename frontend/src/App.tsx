import { useEffect, useRef, useState } from "react";
import BillingTabList from "./components/BillingTabList";
import CardWrapper from "./components/CardWrapper";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import { Button } from "./components/ui/button";
import { sampleResult } from "./data/sampleData";
import { data } from "./tmp/tmp_data";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";
import Result from "./components/Result";

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // メンバーが存在するかチェック
  const isMemberExist = members.some((m) => m.name !== "");

  // 不用意な再読み込み、離脱を防ぐ
  useEffect(() => {
    if (!isMemberExist) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

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
    <div className="flex flex-col items-center gap-8 px-2 pt-20 pb-48">
      <Header />
      <main className="w-full min-w-80 max-w-3xl">
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

          <CardWrapper
            ref={billingSectionRef}
            title="請求の追加"
            description="次に各メンバーに請求したい金額を入力してください"
            nextButton={
              <Button
                onClick={() => scrollToSection(resultSectionRef)}
                size="lg"
                className="cursor-pointer"
                disabled={!isMemberExist || !payments}
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

          <CardWrapper
            ref={resultSectionRef}
            title="計算結果"
            description="計算結果を表示します。"
          >
            <Result />
          </CardWrapper>

          <CardWrapper
            ref={networkSectionRef}
            title="ネットワークグラフ"
            description="精算のお金の流れを視覚的に表示します。矢印の向きがお金を渡す方向になります。"
          >
            <PaymentNetwork debts={data} />
          </CardWrapper>
      </main>
    </div>
  );
}

export default App;
