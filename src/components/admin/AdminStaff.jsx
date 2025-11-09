import { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw, UserPlus, Edit2, Trash2, Users, Mail, UserCheck, UserX, Key } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export default function AdminStaff() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        withCredentials: true
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      alert('Failed to load staff members');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!newUser.username || !newUser.password || !newUser.email || !newUser.fullName) {
      alert('Please fill all fields');
      return;
    }

    if (newUser.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/admin/users`,
        newUser,
        { withCredentials: true }
      );
      
      alert('Sub-admin created successfully');
      setShowAddModal(false);
      setNewUser({ username: '', password: '', email: '', fullName: '' });
      fetchUsers();
    } catch (err) {
      console.error('Failed to create user:', err);
      alert(err.response?.data?.message || 'Failed to create sub-admin');
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/users/${userId}`,
        { isActive: !currentStatus },
        { withCredentials: true }
      );
      
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Failed to update user status');
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this sub-admin?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/users/${userId}`, {
        withCredentials: true
      });
      
      fetchUsers();
      alert('Sub-admin deleted successfully');
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete sub-admin');
    }
  };

  const resetPassword = async (userId) => {
    const newPassword = prompt('Enter new password (minimum 6 characters):');
    
    if (!newPassword) return;
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/admin/users/${userId}/reset-password`,
        { newPassword },
        { withCredentials: true }
      );
      
      alert('Password reset successfully');
    } catch (err) {
      console.error('Failed to reset password:', err);
      alert('Failed to reset password');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage sub-admin accounts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
          >
            <UserPlus size={18} />
            Add Sub-Admin
          </button>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Sub-Admin</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value.toLowerCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password (min. 6 characters)
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Create Sub-Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewUser({ username: '', password: '', email: '', fullName: '' });
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users List */}
      {loading && users.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <RefreshCw size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
          <p className="text-gray-600">Loading staff...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No sub-admins found</p>
          <p className="text-gray-500 text-sm mt-1">Click "Add Sub-Admin" to create one</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id || user.id}
              className={`bg-white rounded-lg shadow-md border-2 p-6 ${
                user.isActive ? 'border-green-200' : 'border-red-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                    {user.fullName?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                {user.isActive ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                    Inactive
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} />
                  {user.email}
                </div>
                <div className="text-xs text-gray-500">
                  Role: <span className="font-medium text-yellow-700">Sub-Admin</span>
                </div>
                {user.lastLogin && (
                  <div className="text-xs text-gray-500">
                    Last login: {new Date(user.lastLogin).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleUserStatus(user._id || user.id, user.isActive)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    user.isActive
                      ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                      : 'bg-green-100 hover:bg-green-200 text-green-700'
                  }`}
                >
                  {user.isActive ? (
                    <>
                      <UserX size={16} />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <UserCheck size={16} />
                      Activate
                    </>
                  )}
                </button>

                <button
                  onClick={() => resetPassword(user._id || user.id)}
                  className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  <Key size={16} />
                  Reset Password
                </button>

                <button
                  onClick={() => deleteUser(user._id || user.id)}
                  className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {users.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-800">
              <strong>{users.length}</strong> total sub-admins
            </p>
            <p className="text-sm text-blue-800">
              <strong>{users.filter(u => u.isActive).length}</strong> active
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
