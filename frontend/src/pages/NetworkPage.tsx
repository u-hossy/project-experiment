import { useNavigate, useParams } from "react-router-dom";
import NetworkGraph from "../components/NetworkGraph";
import { Button } from "../components/ui/button";
import { data } from "../data/tmp_data";

export default function NetworkPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <h2 className="mb-4 font-semibold text-xl">ネットワークグラフ</h2>
      <NetworkGraph debts={data} />
      <Button
        onClick={() => navigate(`/${eventId}/members`)}
        variant="outline"
        className="mt-4"
      >
        最初に戻る
      </Button>
    </div>
  );
}
