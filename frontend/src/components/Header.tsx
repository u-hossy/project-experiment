export default function Header() {
  return (
    <header className="border-b bg-background fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="w-full flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
            <img src="/wallet.svg" alt="" className="w-6 h-6 mr-2" />
            <span className="text-lg font-bold">
            割り勘くん
            </span>
        </div>
     </div>
    </header>
  )
}
