import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../utils/api";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await apiService.loginAdmin(id.trim(), pw);
      if (res.success) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setErr(res.message || "Invalid credentials");
      }
    } catch {
      setErr("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 text-2xl">
              🔐
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">Admin Login</h2>
            <p className="mt-1 text-sm text-gray-500">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Login ID</label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="admin@example.com"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              />
            </div>

            {err && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Only authorized admins can access this area.
          </p>
        </div>
      </div>
    </div>
  );
}
