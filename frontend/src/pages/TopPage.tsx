import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function TopPage() {
  const navigate = useNavigate();

  const handleCreateEvent = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await res.json();
    const code = data.url_end_code;

    navigate(`/${code}/members`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h1 className="mb-8 text-gray-600 text-lg">
        建て替え請求アプリのホームページ
      </h1>

      <p className="mb-8 text-gray-600 text-lg">
        頻繁に起こる建て替えを最適化します。
      </p>

      <Button onClick={handleCreateEvent} size="lg">
        イベントを追加
      </Button>
    </div>
  );
}
