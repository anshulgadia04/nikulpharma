import { useState, useEffect } from "react";
import axios from "axios";
import { 
  RefreshCw, 
  Phone, 
  Package, 
  Tag, 
  Calendar, 
  Users as UsersIcon,
  CheckCircle,
  Trash2,
  User,
  Mail,
  AlertCircle
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export default function AdminLeads() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('all'); // all, interested, not_interested, pending, completed

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/leads`, {
        withCredentials: true,
      });
      const list = res?.data?.leads ?? res?.data ?? [];
      setLeads(Array.isArray(list) ? list : []);
      console.log("Fetched leads:", list);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("Leads endpoint not yet implemented");
      } else {
        setError(err.message || "Failed to load leads");
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (leadId) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/admin/leads/${leadId}`,
        { status: 'completed' },
        { withCredentials: true }
      );
      
      // Update local state
      setLeads(leads.map(lead => 
        lead._id === leadId ? { ...lead, status: 'completed' } : lead
      ));
    } catch (err) {
      console.error('Failed to mark lead as completed:', err);
      alert('Failed to update lead status');
    }
  };

  const deleteLead = async (leadId) => {
    if (!confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/leads/${leadId}`,
        { withCredentials: true }
      );
      
      // Remove from local state
      setLeads(leads.filter(lead => lead._id !== leadId));
    } catch (err) {
      console.error('Failed to delete lead:', err);
      alert('Failed to delete lead');
    }
  };

  const getFilteredLeads = () => {
    if (filter === 'all') return leads;
    if (filter === 'pending') return leads.filter(l => l.status === 'pending' || !l.status);
    if (filter === 'completed') return leads.filter(l => l.status === 'completed');
    if (filter === 'interested') return leads.filter(l => l.state === 'interested');
    if (filter === 'not_interested') return leads.filter(l => l.state === 'not_interested');
    return leads;
  };

  const filteredLeads = getFilteredLeads();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">WhatsApp Leads</h1>
          <p className="text-gray-600 mt-1">Manage leads generated from WhatsApp bot conversations</p>
        </div>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All Leads', count: leads.length },
          { key: 'pending', label: 'Pending', count: leads.filter(l => l.status === 'pending' || !l.status).length },
          { key: 'completed', label: 'Completed', count: leads.filter(l => l.status === 'completed').length },
          { key: 'interested', label: 'Interested', count: leads.filter(l => l.state === 'interested').length },
          { key: 'not_interested', label: 'Not Interested', count: leads.filter(l => l.state === 'not_interested').length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === tab.key
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {loading && leads.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <RefreshCw size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
          <p className="text-gray-600">Loading leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <UsersIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No leads found</p>
          <p className="text-gray-500 text-sm mt-1">
            {filter !== 'all' 
              ? `No ${filter} leads available`
              : 'Leads from WhatsApp bot conversations will appear here'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
            >
              {/* Header with status badges */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {lead.state === 'interested' ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle size={14} />
                        Interested
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <AlertCircle size={14} />
                        Not Interested
                      </span>
                    )}
                  </div>
                  {lead.status === 'completed' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Lead Details */}
              <div className="p-4 space-y-3">
                {/* Name */}
                {lead.customer_name && (
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-900">{lead.customer_name}</span>
                  </div>
                )}

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-green-500" />
                  <a 
                    href={`tel:${lead.phone}`}
                    className="text-gray-700 hover:text-green-600 font-medium"
                  >
                    {lead.phone}
                  </a>
                </div>

                {/* Email */}
                {lead.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <a 
                      href={`mailto:${lead.email}`}
                      className="text-gray-700 hover:text-blue-600 text-sm"
                    >
                      {lead.email}
                    </a>
                  </div>
                )}

                {/* Category */}
                {lead.category && (
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-400" />
                    <span className="text-gray-700 text-sm">{lead.category}</span>
                  </div>
                )}

                {/* Product */}
                {lead.product && (
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-400" />
                    <span className="text-gray-700 text-sm">{lead.product}</span>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-500 text-xs">
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : "—"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 pb-4 flex gap-2">
                {lead.status !== 'completed' && (
                  <button
                    onClick={() => markAsCompleted(lead._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    <CheckCircle size={16} />
                    Mark Completed
                  </button>
                )}
                <button
                  onClick={() => deleteLead(lead._id)}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {leads.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{leads.length}</p>
              <p className="text-sm text-gray-600">Total Leads</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {leads.filter(l => l.state === 'interested').length}
              </p>
              <p className="text-sm text-gray-600">Interested</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {leads.filter(l => l.state === 'not_interested').length}
              </p>
              <p className="text-sm text-gray-600">Not Interested</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {leads.filter(l => l.status === 'pending' || !l.status).length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {leads.filter(l => l.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
