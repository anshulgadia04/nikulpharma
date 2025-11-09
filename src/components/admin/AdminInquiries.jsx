import { useState, useEffect } from "react";
import apiService from "../../utils/api";
import { RefreshCw, Mail, Phone, Building2, Calendar, Tag, Trash2, CheckSquare, Square } from "lucide-react";
import axios from "axios";
import { getCurrentAdmin } from "../../utils/adminAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export default function AdminInquiries() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleting, setDeleting] = useState(false);
  
  // Get current user to check permissions
  const currentUser = getCurrentAdmin();
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getInquiries();
      const list = res?.inquiries ?? res?.data ?? res ?? [];
      setInquiries(Array.isArray(list) ? list : []);
      console.log("Fetched inquiries:", list);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === inquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(inquiries.map(inq => inq._id || inq.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSingleInquiry = async (id) => {
    if (!isAdmin) {
      alert('Only administrators can delete inquiries');
      return;
    }

    if (!confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/inquiries/${id}`, {
        withCredentials: true
      });
      
      setInquiries(inquiries.filter(inq => (inq._id || inq.id) !== id));
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      const errorMsg = err.response?.data?.message || 'Failed to delete inquiry';
      alert(errorMsg);
    }
  };

  const deleteSelectedInquiries = async () => {
    if (!isAdmin) {
      alert('Only administrators can delete inquiries');
      return;
    }

    if (selectedIds.length === 0) {
      alert('Please select inquiries to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedIds.length} inquiries?`)) {
      return;
    }

    setDeleting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/api/admin/inquiries/delete-multiple`,
        { ids: selectedIds },
        { withCredentials: true }
      );
      
      setInquiries(inquiries.filter(inq => !selectedIds.includes(inq._id || inq.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error('Failed to delete inquiries:', err);
      alert('Failed to delete inquiries');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inquiries</h1>
          <p className="text-gray-600 mt-1">Customer inquiries from contact form</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && selectedIds.length > 0 && (
            <button
              onClick={deleteSelectedInquiries}
              disabled={deleting}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors disabled:opacity-50"
            >
              <Trash2 size={18} />
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading && inquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <RefreshCw size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
          <p className="text-gray-600">Loading inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Mail size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No inquiries found</p>
          <p className="text-gray-500 text-sm mt-1">Customer inquiries will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={toggleSelectAll}
                      className="flex items-center justify-center text-gray-600 hover:text-gray-800"
                    >
                      {selectedIds.length === inquiries.length ? (
                        <CheckSquare size={20} className="text-blue-600" />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.map((inquiry) => {
                  const inquiryId = inquiry._id || inquiry.id;
                  const isSelected = selectedIds.includes(inquiryId);
                  
                  return (
                    <tr 
                      key={inquiryId || Math.random()} 
                      className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                    >
                      {isAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleSelect(inquiryId)}
                            className="flex items-center justify-center text-gray-600 hover:text-gray-800"
                          >
                            {isSelected ? (
                              <CheckSquare size={20} className="text-blue-600" />
                            ) : (
                              <Square size={20} />
                            )}
                          </button>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <Mail size={14} className="text-gray-400" />
                            {inquiry.email || "—"}
                          </div>
                          {inquiry.phone && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Phone size={12} className="text-gray-400" />
                              {inquiry.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          {inquiry.company ? (
                            <>
                              <Building2 size={14} className="text-gray-400" />
                              {inquiry.company}
                            </>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{inquiry.subject || "—"}</div>
                        {inquiry.product && (
                          <div className="text-xs text-blue-600 mt-1">Product: {inquiry.product}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {inquiry.inquiry_type || "general"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Tag size={14} />
                          {inquiry.source || "website"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          {inquiry.createdAt
                            ? new Date(inquiry.createdAt).toLocaleDateString()
                            : inquiry.created_at
                            ? new Date(inquiry.created_at).toLocaleDateString()
                            : "—"}
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => deleteSingleInquiry(inquiryId)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete inquiry"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {inquiries.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-800">
              <strong>{inquiries.length}</strong> total inquiries found
              {selectedIds.length > 0 && (
                <span className="ml-2">
                  (<strong>{selectedIds.length}</strong> selected)
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
