import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NetworkGraph from "@/components/NetworkGraph";
import SelectAlgorithm from "@/components/SelectAlgorithm";
import { downloadCsv } from "@/lib/downloadCsv";
import { fetchResult } from "@/lib/fetchResult";
import { generateCsv } from "@/lib/generateCsv";
import type { Payment } from "@/types/payment";
import CardWrapper from "../components/CardWrapper";
import ResultTab from "../components/ResultTab";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Result as ResultType } from "../types/result";

type Props = {
  payments: Payment[];
  members: Member[];
};

interface MemberResponse {
  member_id: number;
  name: string;
  id: number;
}

interface PaymentResponse {
  payment_id: number;
  paid_by: number;
  paid_for: number;
  amount: number;
  note: string;
}

export default function AlgorithmAndResultPage({ payments, members }: Props) {
  const navigate = useNavigate();
  const [algorithmId, setAlgorithmId] = useState<number | undefined>(undefined);
  const [results, setResults] = useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { eventId } = useParams();

  const [currentMembers, setCurrentMembers] = useState<Member[]>(members);
  const [currentPayments, setCurrentPayments] = useState<Payment[]>(payments);

  const handleSubmit = async () => {
    if (!algorithmId) return setError("アルゴリズムを選択してください");
    if (currentPayments.length === 0) return setError("請求を追加してください");
    if (!eventId) return setError("イベントIDが見つかりません");

    setIsLoading(true);
    setError(null);

    try {
      const fetchedResults = await fetchResult({
        algorithmId,
        payments: currentPayments,
        eventId,
      });
      setResults(fetchedResults);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "計算中にエラーが発生しました",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCsvExport = () => {
    const csv = generateCsv(currentMembers, results);
    downloadCsv(csv);
  };

  useEffect(() => {
    const loadData = async () => {
      if (!eventId) return;

      const pkToMemberId: Record<number, number> = {};
      
      // 最新のメンバー情報を取得
      try {
        const memRes = await fetch(
          `http://127.0.0.1:8000/api/v1/members/?event_id=${eventId}`,
        );
        if (memRes.ok) {
          const memData = await memRes.json();

          if (Array.isArray(memData)) {
            (memData as MemberResponse[]).forEach((p) => {
              pkToMemberId[p.id] = Number(p.member_id);
              if (pkToMemberId[p.id] === undefined)
                pkToMemberId[p.id] = Number(p.member_id);
            });

            const fetchedMembers = (memData as MemberResponse[]).map((p) => ({
              id: Number(p.member_id),
              name: p.name,
            }));
            setCurrentMembers(fetchedMembers); // 画面のメンバーリストを最新にする
          }
        }
      } catch (e) {
        console.error("メンバー情報の更新に失敗", e);
      }

      // 最新の支払い情報を取得
      try {
        const payRes = await fetch(
          `http://127.0.0.1:8000/api/v1/payments/?event_id=${eventId}`,
        );
        if (payRes.ok) {
          const payData = await payRes.json();
          if (Array.isArray(payData)) {
            const fetchedPayments = (payData as PaymentResponse[]).map((p) => {
              const paidByMapped = pkToMemberId[Number(p.paid_by)];
              const paidForMapped = pkToMemberId[Number(p.paid_for)];

              const finalPaidBy =
                paidByMapped !== undefined ? paidByMapped : Number(p.paid_by);
              const finalPaidFor =
                paidForMapped !== undefined 
                  ? paidForMapped
                  : Number(p.paid_for);

              return {
                id: Number(p.payment_id),
                paidBy: finalPaidBy,
                paidFor: finalPaidFor,
                amount: p.amount,
                memo: p.note,
              };
            });
            setCurrentPayments(fetchedPayments); // 画面の支払いリストを最新にする
          }
        }
      } catch (e) {
        console.error("支払い情報の更新に失敗", e);
      }
    };

    loadData();
  }, [eventId]);

  return (
    <div className="w-full min-w-80 max-w-3xl p-4">
      <CardWrapper
        title="アルゴリズムの選択"
        description="計算を行うアルゴリズムを選択して、「計算実行」を押すと計算が実行されます！"
        nextButton={null}
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

        <div className="mt-4 flex gap-4">
          <Button
            onClick={() => navigate(`/${eventId}/billing`)}
            variant="outline"
          >
            戻る
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || currentPayments.length === 0}
            size="lg"
          >
            {isLoading ? "計算中..." : "計算実行"}
          </Button>
        </div>
      </CardWrapper>

      <CardWrapper
        title="結果表示"
        nextButton={null} // ボタンは下で自作
      >
        <ResultTab members={currentMembers} results={results} />

        <div className="mt-4 flex gap-4">
          <Button
            onClick={() => navigate(`/${eventId}/billing`)}
            variant="outline"
          >
            戻る
          </Button>
          <Button onClick={handleCsvExport} size="lg">
            CSV出力
          </Button>
        </div>
      </CardWrapper>

      <CardWrapper title="ネットワークグラフ" nextButton={null}>
        <NetworkGraph members={currentMembers} results={results} />
        <div className="mt-4 flex gap-4">
          <Button
            onClick={() => navigate(`/${eventId}/billing`)}
            variant="outline"
          >
            戻る
          </Button>
        </div>
      </CardWrapper>
    </div>
  );
}
