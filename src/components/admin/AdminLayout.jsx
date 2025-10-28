import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../utils/adminAuth";
import { BarChart3, Package, MessageSquare, Users, LogOut } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const onLogout = () => {
    logoutAdmin();
    navigate("/admin", { replace: true });
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Analytics", icon: BarChart3 },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
    { to: "/admin/leads", label: "Leads", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          
          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "hover:bg-blue-800 text-gray-200"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors ml-2"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
