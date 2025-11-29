import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h1 className="mb-8 text-gray-600 text-lg">
        建て替え請求アプリのホームページ
      </h1>

      <p className="mb-8 text-gray-600 text-lg">
        頻繁に起こる建て替えを最適化します。
      </p>

      <Button onClick={() => navigate("/members")} size="lg">
        イベントを追加
      </Button>
    </div>
  );
}
