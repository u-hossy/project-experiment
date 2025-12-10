import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function TopPageHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
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
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full border-b bg-background shadow-md",
        className,
      )}
      {...props}
    >
      <div className="flex h-16 w-full items-center px-4">
        <img src="/wallet.svg" alt="精算アイコン" className="mr-2 h-6 w-6" />
        <span className="font-bold text-sm md:text-lg">精算くん</span>
      </div>
      <Card
        className={cn(
          "-mt-4 mx-auto mb-5 w-[90%] max-w-md bg-gray-100 shadow-md",
          className,
        )}
      >
        <CardContent className="flex flex-col p-1">
          <div className="text-center">
            <p className="mb-4 text-black text-lg">
              頻繁に起こる建て替えを最適化します。
            </p>
            <Button
              onClick={handleCreateEvent}
              size="lg"
              className="px-10 py-6 text-xl"
            >
              イベントを追加
            </Button>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
