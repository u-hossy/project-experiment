import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HeaderMenu } from "./HeaderMenu";
import NavBar from "./NavBar.tsx";
import StaticNavBar from "./StaticNavBar.tsx";

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
      <div className="flex h-16 w-full items-center justify-between px-4">
        <Link to="/top" className="flex cursor-pointer items-center">
          <img
            src="/wallet.svg"
            alt="割り勘アイコン"
            className="mr-2 h-6 w-6"
          />
          <span className="font-bold text-sm md:text-lg">割り勘くん</span>
        </Link>
        <div className="flex max-w-[60%] flex-1 justify-center md:max-w-none">
          {/* スマホだけ表示 */}
          <div className="block w-full md:hidden">
            <NavBar />
          </div>

          {/* PCだけ表示 */}
          <div className="hidden md:block">
            <StaticNavBar />
          </div>
        </div>

        <HeaderMenu />
      </div>
    </header>
  );
}
