import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";


export default function HomePage(){

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
            <h1 className="text-lg text-gray-600 mb-8">
                建て替え請求アプリのホームページ
            </h1>

            <p className="text-lg text-gray-600 mb-8">
                頻繁に起こる建て替えを最適化します。
            </p>

            <Button
            onClick={() => navigate("/members")}
            size="lg"
            >イベントを追加</Button>
        </div>
    )
}


