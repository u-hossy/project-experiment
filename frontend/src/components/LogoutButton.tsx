import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLoggout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);

      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLoggout}
      className="rounded-md bg-red-400 px-3 py-1 text-white hover:bg-red-600"
    >
      ログアウト
    </button>
  );
}
