import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectAlgorithm from "../components/SelectAlgorithm";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Payment } from "../types/payment";
import type { Result } from "../types/result";

type Props = {
  members: Member[];
  payments: Payment[];
  setResults: (results: Result[]) => void;
};

export default function AlgorithmPage({
  members,
  payments,
  setResults,
}: Props) {
  const navigate = useNavigate();
  const [algorithmId, setAlgorithmId] = useState<number | undefined>(undefined);

  const handleSubmit = () => {
    if (!algorithmId || payments.length === 0) return;

    // ダミー計算（実際は API 呼び出しなど）
    const results: Result[] = payments.map((p, i) => ({
      id: i + 1,
      paidBy: p.paidBy,
      paidFor: p.paidFor,
      amount: p.amount,
    }));

    setResults(results);
    navigate("/result");
  };

  return (
    <div className="w-full min-w-80 max-w-3xl p-4">
      <h2 className="mb-4 font-semibold text-xl">アルゴリズムの選択</h2>
      <SelectAlgorithm
        algorithmId={algorithmId}
        setAlgorithmId={setAlgorithmId}
      />

      <div className="mt-4 flex gap-4">
        <Button onClick={() => navigate("/billing")} variant="outline">
          戻る
        </Button>
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={!algorithmId || payments.length === 0}
        >
          計算実行
        </Button>
      </div>
    </div>
  );
}
