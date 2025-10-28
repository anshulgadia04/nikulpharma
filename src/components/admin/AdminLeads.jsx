import { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw, Phone, Package, Tag, Calendar, Users as UsersIcon } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export default function AdminLeads() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Create a dedicated endpoint for leads if needed
      // For now using a generic endpoint - adjust based on your backend
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">WhatsApp Leads</h1>
          <p className="text-gray-600 mt-1">Leads generated from WhatsApp bot conversations</p>
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

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">⚠️ {error}</p>
          <p className="text-sm mt-1">
            To enable leads tracking, add a <code className="bg-yellow-100 px-1 rounded">GET /api/admin/leads</code> endpoint 
            in your server that returns leads from the <code className="bg-yellow-100 px-1 rounded">leads</code> collection.
          </p>
        </div>
      )}

      {loading && leads.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <RefreshCw size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
          <p className="text-gray-600">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <UsersIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No leads found</p>
          <p className="text-gray-500 text-sm mt-1">
            Leads from WhatsApp bot conversations will appear here
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead._id || lead.id || Math.random()} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <Phone size={14} className="text-green-500" />
                        {lead.phone || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Tag size={14} className="text-gray-400" />
                        {lead.category || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Package size={14} className="text-gray-400" />
                        {lead.product || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {lead.source || "whatsapp_bot"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'converted' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status || "new"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString()
                          : lead.created_at
                          ? new Date(lead.created_at).toLocaleDateString()
                          : "—"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {leads.length > 0 && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>{leads.length}</strong> WhatsApp leads found
          </p>
        </div>
      )}
    </div>
  );
}
