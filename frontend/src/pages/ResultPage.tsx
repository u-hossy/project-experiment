import { useNavigate } from "react-router-dom";
import Result from "../components/Result";
import { Button } from "../components/ui/button";
import type { Member } from "../types/member";
import type { Result as ResultType } from "../types/result";

type Props = {
  members: Member[];
  results: ResultType[];
};

export default function ResultPage({ members, results }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full min-w-80 max-w-3xl p-4">
      <h2 className="text-xl font-semibold mb-4">結果表示</h2>
      <Result members={members} results={results} />

      <div className="flex gap-4 mt-4">
        <Button onClick={() => navigate("/algorithm")} variant="outline">
          戻る
        </Button>
        <Button onClick={() => navigate("/network")} size="lg">
          ネットワークを表示
        </Button>
      </div>
    </div>
  );
}
