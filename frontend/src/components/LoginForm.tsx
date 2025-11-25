import { useState } from "react";
import { login } from "../api/auth";

interface Props {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      onLogin();
    } catch {
      setError("ユーザー名またはパスワードが違います");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">ログイン</button>

      {error && (
        <p className="mb-3 text-center text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
      >
        ログイン
      </button>
    </form>
  );
}
