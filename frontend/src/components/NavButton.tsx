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
      className={`flex w-40 items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-200 active:bg-gray-300 ${className}
      `}
    >
      <img src={icon} className="h-6 w-6" />
      <span className="flex-1 whitespace-nowrap text-center">{label}</span>
    </Link>
  );
}
