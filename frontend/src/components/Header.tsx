import { cn } from "@/lib/utils";
import StaticNavBar from "./StaticNavBar.tsx";
import { HeaderMenu } from "./HeaderMenu";
import NavBar from "./NavBar.tsx";

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
      <div className="flex h-16 w-full items-center justify-between px-1">
        <div className="flex items-center">
          <img
            src="/wallet.svg"
            alt="割り勘アイコン"
            className="mr-2 h-6 w-6"
          />
          <span className="font-bold text-sm md:text-lg">割り勘くん</span>
        </div>
<div className="flex-1 flex justify-center max-w-[60%] md:max-w-none">

  {/* スマホだけ表示 */}
  <div className="block md:hidden w-full">
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
