import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { setAccessToken } from "../api/tokenStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(username, password);
      console.log("Login success:", res);

      if (res.access) {
        setAccessToken(res.access); // accessTokenをメモリ保存
      }

      navigate("/members");
    } catch (err) {
      console.log(err);
      setError("ログイン失敗。ユーザー名またはパスワードを確認して下さい。");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-80 space-y-4 rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="text-center font-bold text-2xl">ログイン</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-md border p-2 focus:ring focus:ring-blue-300"
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border p-2 focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
