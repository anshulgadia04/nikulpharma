import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../../utils/api.js";

export default function AdminRoute() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    apiService.checkAdminAuth()
      .then((res) => setAuth(res.loggedIn))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;
  return auth ? <Outlet /> : <Navigate to="/admin" replace />;
}
