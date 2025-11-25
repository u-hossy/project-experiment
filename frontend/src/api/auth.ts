import axios from "axios";
import api from "./axios";
import { setAccessToken } from "./tokenStore";

const logoutApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export interface LoginResponse {
  access: string;
  refresh?: string;
}

export interface UserInfoResponse {
  username: string;
}

export interface RefreshResponse {
  access: string;
}

export interface LogoutResponse {
  detail: string;
}

// ログイン(CookieにJWTが保存される)
export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await api.post(
    "/api/login/",
    {
      username,
      password,
    },
    { withCredentials: true },
  );

  // access tokenをメモリへ保存
  if (res.data.access) {
    setAccessToken(res.data.access);
  }

  return res.data;
};

// 認証状態確認
export const getUserInfo = async (): Promise<UserInfoResponse> => {
  const res = await api.get("/api/user/");
  return res.data;
};

// リフレッシュ
export const refreshToken = async (): Promise<RefreshResponse> => {
  const res = await api.post("/api/refresh/", {}, { withCredentials: true });
  return res.data;
};

// ログアウト
export const logout = async (): Promise<LogoutResponse> => {
  const res = await logoutApi.post(
    "/api/logout/",
    {},
    { withCredentials: true },
  );
  setAccessToken(""); // メモリ初期化
  return res.data;
};
