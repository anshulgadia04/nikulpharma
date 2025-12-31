import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import apiService from "../../utils/api";
import { setCurrentAdmin } from "../../utils/adminAuth";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();

  // Block after 5 failed attempts for 15 minutes
  useEffect(() => {
    const blockedUntil = localStorage.getItem('adminLoginBlocked');
    if (blockedUntil && Date.now() < parseInt(blockedUntil)) {
      setBlocked(true);
      const remaining = Math.ceil((parseInt(blockedUntil) - Date.now()) / 60000);
      setErr(`Too many attempts. Try again in ${remaining} minutes.`);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (blocked) return;
    
    setErr("");
    setLoading(true);
    
    try {
      const res = await apiService.loginAdmin(id.trim(), pw);
      if (res.success) {
        // Reset attempts on success
        setAttempts(0);
        localStorage.removeItem('adminLoginBlocked');
        
        setCurrentAdmin(res.user);
        
        if (res.user.role === 'admin') {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/admin/products", { replace: true });
        }
      } else {
        handleFailedAttempt();
        setErr(res.message || "Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      handleFailedAttempt();
      setErr("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleFailedAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    if (newAttempts >= 5) {
      const blockedUntil = Date.now() + 15 * 60 * 1000; // 15 minutes
      localStorage.setItem('adminLoginBlocked', blockedUntil.toString());
      setBlocked(true);
      setErr("Too many failed attempts. Account locked for 15 minutes.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Nikul Pharma</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Secure admin access portal" />
      </Helmet>

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
                <label htmlFor="admin-id" className="block text-sm font-medium text-gray-700">Login ID</label>
                <input
                  id="admin-id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="username"
                  required
                  disabled={blocked}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="admin-pw" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="admin-pw"
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={blocked}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>

            {err && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || blocked}
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
    </>
  );
}
