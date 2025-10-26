import { Link, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../utils/adminAuth";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const onLogout = () => {
    logoutAdmin();
    navigate("/admin", { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <nav style={{ margin: "12px 0" }}>
        <Link to="/admin/dashboard">Dashboard</Link>{" | "}
        <Link to="/admin/products/new">Add Product</Link>
      </nav>
      <button onClick={onLogout}>Logout</button>

      <div style={{ marginTop: 24 }}>
        <p>Stats and cards go here.</p>
      </div>
    </div>
  );
}
