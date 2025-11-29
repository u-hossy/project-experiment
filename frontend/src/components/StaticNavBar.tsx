import { useParams } from "react-router-dom";
import NavButton from "./NavButton";

export default function StaticNavBar() {
  const { eventId } = useParams();
  if (!eventId) return null;

  return (
    <nav className="hidden gap-4 md:flex">
      <NavButton
        to={`/${eventId}/members`}
        icon="/person-standing.svg"
        label="メンバーを追加"
      />
      <NavButton
        to={`/${eventId}/billing`}
        icon="/badge-japanese-yen.svg"
        label="請求を追加"
      />
      <NavButton
        to={`/${eventId}/algorithmAndresults`}
        icon="/calculator.svg"
        label="計算結果"
      />
    </nav>
  );
}
