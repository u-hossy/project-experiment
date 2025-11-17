import NavButton from "./NavButton";

export default function StaticNavBar() {
  return (
    <nav className="hidden gap-4 md:flex">
      <NavButton
        to="/members"
        icon="/person-standing.svg"
        label="メンバーを追加"
      />
      <NavButton
        to="/billing"
        icon="/badge-japanese-yen.svg"
        label="請求を追加"
      />
      <NavButton
        to="/algorithmAndresults"
        icon="/calculator.svg"
        label="計算結果"
      />    
    </nav>
  );
}
