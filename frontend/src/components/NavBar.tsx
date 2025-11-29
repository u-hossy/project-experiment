import { useParams } from "react-router-dom";
import NavButton from "./NavButton";

const links = [
  { to: "members", label: "メンバーを追加", icon: "/person-standing.svg" },
  { to: "billing", label: "請求を追加", icon: "/badge-japanese-yen.svg" },
  { to: "algorithmAndresults", label: "計算結果", icon: "/calculator.svg" },
];

export default function NavBar() {
  const { eventId } = useParams();
  return (
    <div className="scrollbar-none w-full touch-pan-x overflow-x-auto whitespace-nowrap">
      <div className="flex gap-4 px-1 py-2">
        {links.map((l, i) => (
          <NavButton
            key={i}
            to={`/${eventId}/${l.to}`}
            icon={l.icon}
            label={l.label}
          />
        ))}
      </div>
    </div>
  );
}
