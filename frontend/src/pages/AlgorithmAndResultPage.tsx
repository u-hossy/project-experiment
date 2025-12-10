import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConnectAlert } from "@/components/ConnectAlert";
import NetworkGraph from "@/components/NetworkGraph";
import SelectAlgorithm from "@/components/SelectAlgorithm";
import { useSharedChatHandler } from "@/hooks/WebSocketContext";
import { deleteResult } from "@/lib/deleteResult";
import { downloadCsv } from "@/lib/downloadCsv";
import { fetchResult } from "@/lib/fetchResult";
import { generateCsv } from "@/lib/generateCsv";
import { getResult } from "@/lib/getResult";
import { saveResult } from "@/lib/saveResult";
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

export default function AlgorithmAndResultPage({ payments, members }: Props) {
  const navigate = useNavigate();
  const [algorithmId, setAlgorithmId] = useState<number | undefined>(undefined);
  const [results, setResults] = useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { eventId } = useParams();
  const ws = useSharedChatHandler();

  const handleSubmit = async () => {
    if (!algorithmId) return setError("アルゴリズムを選択してください");
    if (payments.length === 0) return setError("請求を追加してください");

    setIsLoading(true);
    setError(null);

    try {
      if (eventId) {
        await deleteResult(eventId);
      }
      const fetchedResults = await fetchResult({ algorithmId, payments });
      setResults(fetchedResults);

      if (eventId) {
        await saveResult(eventId, fetchedResults);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "計算中にエラーが発生しました",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCsvExport = () => {
    const csv = generateCsv(members, results);
    downloadCsv(csv);
  };

  useEffect(() => {
    const loadSavedResults = async () => {
      if (!eventId) return;
      const saved = await getResult(eventId);
      if (saved.length > 0) {
        setResults(saved);
      }
    };
    loadSavedResults();
  }, [eventId]);

  return (
    <div className="w-full min-w-80 max-w-3xl p-4">
      <ConnectAlert isConnected={ws.isConnected} />
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
            disabled={isLoading || payments.length === 0}
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
        <ResultTab members={members} results={results} />
        {results.length === 0 ? (
          <></>
        ) : (
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
        )}
      </CardWrapper>

      <CardWrapper title="ネットワークグラフ" nextButton={null}>
        <NetworkGraph members={members} results={results} />
        {results.length === 0 ? (
          <></>
        ) : (
          <div className="mt-4 flex gap-4">
            <Button
              onClick={() => navigate(`/${eventId}/billing`)}
              variant="outline"
            >
              戻る
            </Button>
          </div>
        )}
      </CardWrapper>
    </div>
  );
}
