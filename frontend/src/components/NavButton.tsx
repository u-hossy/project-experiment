// NavButton.tsx
import { Link } from "react-router-dom";

export default function NavButton({
  to,
  icon,
  label,
  className = "",
}: {
  to: string;
  icon: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-4 py-2
        rounded-lg text-gray-700 font-medium
        hover:bg-gray-200 active:bg-gray-300
        transition
        w-40 justify-center
        ${className}
      `}
    >
      <img src={icon} className="w-6 h-6" />
      <span className="flex-1 text-center whitespace-nowrap">{label}</span>
    </Link>
  );
}
