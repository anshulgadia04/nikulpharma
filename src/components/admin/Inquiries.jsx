import { useState, useEffect } from "react";
import apiService from "../../utils/api";

export default function Inquiries({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    fetchInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getInquiries();
      // API may return { inquiries: [...] } or an array directly
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto py-10">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Inquiries ({inquiries.length})</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh
            </button>
            <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Close</button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading inquiries...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : inquiries.length === 0 ? (
          <p className="text-gray-600">No inquiries found.</p>
        ) : (
          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2">Phone</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Product</th>
                  <th className="py-2">Source</th>
                  <th className="py-2">Received</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((iq) => (
                  <tr key={iq._id || iq.id || Math.random()} className="border-b last:border-b-0">
                    <td className="py-2">{iq.phone || iq.phone_number || "—"}</td>
                    <td className="py-2">{iq.category || iq.inquiry_type || "—"}</td>
                    <td className="py-2">{iq.product || "—"}</td>
                    <td className="py-2">{iq.source || "—"}</td>
                    <td className="py-2">{iq.createdAt ? new Date(iq.createdAt).toLocaleString() : iq.created_at ? new Date(iq.created_at).toLocaleString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
