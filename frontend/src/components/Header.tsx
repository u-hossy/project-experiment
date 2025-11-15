import { cn } from "@/lib/utils";
import { HeaderMenu } from "./HeaderMenu";
import { Link } from "react-router-dom";

export default function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full border-b bg-background shadow-md",
        className,
      )}
      {...props}
    >
      <div className="flex h-20 w-full items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src="/wallet.svg"
            alt="割り勘アイコン"
            className="mr-2 h-6 w-6"
          />
          <span className="font-bold text-lg">割り勘くん</span>
        </div>
        <div className="flex items-center space-x-5">
          <Link to="/members">メンバーを追加</Link>
          <Link to="/billing">請求を追加</Link>
          <Link to="/algorithmAndresults">計算結果</Link>
          <Link to="/"></Link>
        </div>
        <HeaderMenu />
      </div>
    </header>
  );
}
