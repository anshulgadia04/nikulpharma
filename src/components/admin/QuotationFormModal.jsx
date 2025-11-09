import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Centralize API base so we don't hardcode an invalid port (5174 was wrong - server runs on 3001)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const QuotationFormModal = ({ lead, onClose, onSuccess, currentUser }) => {
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Prevent background scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || !items) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      // Always use configured API base URL; server CORS allows 3000 origin -> 3001 API with credentials
      await axios.post(`${API_BASE_URL}/api/admin/leads/${lead._id}/quotation`, {
        amount: parseFloat(amount),
        items: items.trim()
      }, {
        withCredentials: true
      });
      
      alert('Quotation sent successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error sending quotation:', error);
      const msg = error?.response?.data?.error || error.message || 'Failed to send quotation';
      const dbg = error?.response?.data?.debug;
      alert(`Failed to send quotation: ${msg}${dbg ? `\n\nDetails: ${JSON.stringify(dbg)}` : ''}`);
      setSubmitting(false);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Allow multiple quotations; no disable based on previous quotes

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">Send Quotation</h2>
            <p className="text-green-100 text-sm mt-1">
              To: {lead.customer_name} ({lead.leadId})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Lead Information Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-700">Name</p>
                <p className="font-semibold text-blue-900">{lead.customer_name}</p>
              </div>
              <div>
                <p className="text-blue-700">Phone</p>
                <p className="font-semibold text-blue-900">{lead.phone}</p>
              </div>
              {lead.company && (
                <div>
                  <p className="text-blue-700">Company</p>
                  <p className="font-semibold text-blue-900">{lead.company}</p>
                </div>
              )}
              {lead.product && (
                <div>
                  <p className="text-blue-700">Product Interest</p>
                  <p className="font-semibold text-blue-900">{lead.product}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quotation Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quotation Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 font-semibold">₹</span>
              <input
                type="text"
                value={amount ? formatCurrency(amount) : ''}
                onChange={handleAmountChange}
                placeholder="0"
                required
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
              />
            </div>
            {amount && (
              <p className="mt-2 text-sm text-gray-600">
                Amount in words: {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0
                }).format(amount)}
              </p>
            )}
          </div>

          {/* Items/Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Items/Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="Enter detailed description of products/services included in this quotation..."
              required
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <p className="mt-2 text-xs text-gray-500">
              Tip: Include product specifications, quantities, delivery terms, etc.
            </p>
          </div>

          {/* Validity removed as requested */}

          {/* Previous Quotations Info */}
          {lead.quotations && lead.quotations.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Previous Quotations
              </h4>
              <div className="space-y-2">
                {lead.quotations.slice(0, 3).map((q, index) => (
                  <div key={index} className="text-sm text-yellow-800">
                    <span className="font-semibold">#{q.quotation_id}:</span> ₹{formatCurrency(q.amount)} 
                    <span className="ml-2 text-yellow-600">({new Date(q.sentAt).toLocaleDateString()})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !amount || !items}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Quotation
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200">
          <p className="text-xs text-gray-600 flex items-start gap-2">
            <svg className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              This quotation will be logged in the lead's activity history and will update the Open Opportunity value. 
              The lead will automatically move to "Quoted" stage if not already there.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuotationFormModal;
