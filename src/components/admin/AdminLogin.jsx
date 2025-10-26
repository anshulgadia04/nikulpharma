import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../utils/api";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.loginAdmin(id.trim(), pw);
      if (res.success) {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (error) {
      setErr("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "64px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <label>Login ID</label>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="admin email" style={{ width: "100%", margin: "8px 0" }} />
        <label>Password</label>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} style={{ width: "100%", margin: "8px 0" }} />
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <button type="submit" style={{ width: "100%" }}>Login</button>
      </form>
    </div>
  );
}
