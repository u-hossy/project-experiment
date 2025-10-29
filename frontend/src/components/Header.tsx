import { HeaderMenu } from "./HeaderMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-background shadow-md">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src="/wallet.svg"
            alt="割り勘アイコン"
            className="mr-2 h-6 w-6"
          />
          <span className="font-bold text-lg">割り勘くん</span>
        </div>
        <HeaderMenu/>
      </div>
    </header>
  );
}
