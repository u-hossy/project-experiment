import NetworkGraph from "../components/NetworkGraph";
import { data } from "../tmp/tmp_data";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NetworkPage() {
  const navigate = useNavigate();


  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">ネットワークグラフ</h2>
      <NetworkGraph debts={data} />
      <Button onClick={() => navigate("/members")} variant="outline" className="mt-4">
        最初に戻る
      </Button>
    </div>
  );
}
