import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin, getCurrentAdmin } from "../../utils/adminAuth";
import { BarChart3, Package, MessageSquare, Users, LogOut, UserCog, FileText } from "lucide-react";
import logo from '../../../imges/logo2.png'
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentAdmin();
    setCurrentUser(user);
  }, []);

  const onLogout = () => {
    logoutAdmin();
    navigate("/admin", { replace: true });
  };

  // Define all possible nav items
  const allNavItems = [
    { to: "/admin/leads-pipeline", label: "Leads", icon: Users, requireAdmin: false },
    { to: "/admin/dashboard", label: "Analytics", icon: BarChart3, requireAdmin: true },
    { to: "/admin/products", label: "Products", icon: Package, requireAdmin: false },
    { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, requireAdmin: false },
    { to: "/admin/blogs", label: "Blogs", icon: FileText, requireAdmin: false },
    { to: "/admin/staff", label: "Staff Management", icon: UserCog, requireAdmin: true },
  ];

  // Filter nav items based on user role
  const navItems = allNavItems.filter(item => {
    if (!currentUser) return false;
    
    // If item requires admin and user is not admin, hide it
    if (item.requireAdmin && currentUser.role !== 'admin') {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white text-black shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo} className="w-36"/>
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm text-gray-600">Logged in as:</span>
                <span className="font-semibold text-blue-700">
                  {currentUser.fullName || currentUser.username}
                </span>
                {currentUser.role === 'subadmin' && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    Sub-Admin
                  </span>
                )}
              </div>
            )}
          </div>
          
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
                        : "hover:bg-blue-800 hover:text-white text-black"
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
