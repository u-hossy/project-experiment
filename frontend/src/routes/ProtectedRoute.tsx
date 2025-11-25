import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../api/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserInfo();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}
