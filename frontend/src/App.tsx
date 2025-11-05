import { useEffect, useRef, useState } from "react";
import BillingTabList from "./components/BillingTabList";
import CardWrapper from "./components/CardWrapper";
import Header from "./components/Header";
import MemberList from "./components/MemberList";
import PaymentNetwork from "./components/NetworkGraph";
import Result from "./components/Result";
import SelectAlgorithm from "./components/SelectAlgorithm";
import { Button } from "./components/ui/button";
import { fetchResult } from "./lib/fetchResult";
import { data } from "./tmp/tmp_data";
import type { Member } from "./types/member";
import type { Payment } from "./types/payment";
import type { Result as ResultType } from "./types/result";

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [algorithmId, setAlgorithmId] = useState<number | undefined>(undefined);
  const [results, setResults] = useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // メンバーが存在するかチェック
  const isMemberExist = members.some((m) => m.name !== "");

  // 不用意な再読み込み、離脱を防ぐ
  useEffect(() => {
    if (!isMemberExist) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  // 各セクションへの参照
  const memberSectionRef = useRef<HTMLDivElement>(null);
  const billingSectionRef = useRef<HTMLDivElement>(null);
  const selectAlgorithmSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const networkSectionRef = useRef<HTMLDivElement>(null);

  // スクロール関数
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 計算結果を取得する関数
  const handleSubmit = async () => {
    if (algorithmId === undefined) {
      setError("アルゴリズムを選択してください");
      return;
    }

    if (payments.length === 0) {
      setError("請求を追加してください");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedResults = await fetchResult({
        algorithmId,
        payments,
      });
      setResults(fetchedResults);
      // 結果セクションまでスクロール
      scrollToSection(resultSectionRef);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "計算中にエラーが発生しました";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
              onClick={() => scrollToSection(selectAlgorithmSectionRef)}
              size="lg"
              className="cursor-pointer"
              disabled={!isMemberExist || payments.length === 0}
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
          ref={selectAlgorithmSectionRef}
          title="アルゴリズムの選択"
          description="計算を行うアルゴリズムを選択して、「計算実行」を押すと計算が実行されます！"
          nextButton={
            <Button
              onClick={handleSubmit}
              size="lg"
              className="cursor-pointer"
              disabled={
                !isMemberExist ||
                payments.length === 0 ||
                algorithmId === undefined ||
                isLoading
              }
            >
              {isLoading ? "計算中..." : "計算実行"}
            </Button>
          }
        >
          <SelectAlgorithm
            algorithmId={algorithmId}
            setAlgorithmId={setAlgorithmId}
          />
          {error && (
            <div className="mt-4 rounded-md bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}
        </CardWrapper>

        <CardWrapper
          ref={resultSectionRef}
          title="計算結果"
          description="計算結果を表示します。"
        >
          <Result members={members} results={results} />
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
