import React, { useState } from 'react';
import axios from 'axios';

// Use same API base convention as other modules (remove incorrect 5174 port usage)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const LeadDetailModal = ({ lead, onClose, onUpdate, currentUser, staffList, onOpenQuotation }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [assigningStaff, setAssigningStaff] = useState(false);

  console.log('LeadDetailModal render, lead:', lead);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    
    setSubmittingComment(true);
    try {
      await axios.post(`${API_BASE_URL}/api/admin/leads/${lead._id}/comment`, {
        comment: comment.trim()
      }, {
        withCredentials: true
      });
      
      alert('Comment added successfully!');
      setComment('');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleScheduleFollowUp = async () => {
    if (!followUpDate) {
      alert('Please select a follow-up date');
      return;
    }

    try {
      await axios.patch(`${API_BASE_URL}/api/admin/leads/${lead._id}/follow-up`, {
        date: followUpDate,
        note: followUpNotes
      }, {
        withCredentials: true
      });
      
      alert('Follow-up scheduled successfully!');
      setFollowUpDate('');
      setFollowUpNotes('');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error scheduling follow-up:', error);
      alert('Failed to schedule follow-up');
    }
  };

  const handleAssignStaff = async (staffUsername) => {
    if (!currentUser || currentUser.role !== 'admin') {
      alert('Only admins can assign leads');
      return;
    }

    setAssigningStaff(true);
    try {
      const selectedStaff = staffList.find(s => s.username === staffUsername);
      await axios.patch(`${API_BASE_URL}/api/admin/leads/${lead._id}/assign`, {
        staffUsername,
        staffFullName: selectedStaff?.fullName || staffUsername
      }, {
        withCredentials: true
      });
      
      alert('Lead assigned successfully!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error assigning lead:', error);
      alert('Failed to assign lead');
    } finally {
      setAssigningStaff(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const getActivityIcon = (type) => {
    const icons = {
      comment: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
      stage_change: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      status_change: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      quotation: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2z',
      quotation_sent: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2z',
      assignment: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      follow_up: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    };
    return icons[type] || icons.comment;
  };

  const getActivityColor = (type) => {
    const colors = {
      comment: 'text-blue-500',
      stage_change: 'text-purple-500',
      status_change: 'text-purple-500',
      quotation: 'text-green-500',
      quotation_sent: 'text-green-500',
      assignment: 'text-orange-500',
      follow_up: 'text-yellow-500'
    };
    return colors[type] || 'text-gray-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Increased height and ensured internal scroll area can expand */}
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
          <div className='flex flex-row gap-5 items-center'>
            <h2 className="text-2xl font-bold">{lead.customer_name}</h2>
            <p className="text-blue-100 text-sm mt-1">Lead ID: {lead.leadId}</p>
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

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3 px-4 font-semibold transition-colors ${
                activeTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`py-3 px-4 font-semibold transition-colors ${
                activeTab === 'activities'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Activity Timeline
            </button>
            <button
              onClick={() => setActiveTab('quotations')}
              className={`py-3 px-4 font-semibold transition-colors ${
                activeTab === 'quotations'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quotations ({lead.quotations?.length || 0})
            </button>
          </div>
        </div>

        {/* Content */}
  {/* Added min-h-0 so that overflow-y-auto area can properly take remaining flex height */}
  <div className="flex-1 min-h-0 overflow-y-auto p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{lead.phone}</p>
                  </div>
                  {lead.email && (
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{lead.email}</p>
                    </div>
                  )}
                  {lead.company && (
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="font-semibold text-gray-900">{lead.company}</p>
                    </div>
                  )}
                  {lead.location && (
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">
                        {[lead.location.city, lead.location.state, lead.location.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Interest */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Product Interest
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {lead.category && (
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold text-gray-900">{lead.category}</p>
                    </div>
                  )}
                  {lead.product && (
                    <div>
                      <p className="text-sm text-gray-600">Product</p>
                      <p className="font-semibold text-gray-900">{lead.product}</p>
                    </div>
                  )}
                  {lead.requirement_details && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">Requirements</p>
                      <p className="font-semibold text-gray-900">{lead.requirement_details}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Lead Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Lead Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Pipeline Stage</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {lead.pipeline_stage?.toUpperCase()}
                    </span>
                  </div>
                  {lead.priority && (
                    <div>
                      <p className="text-sm text-gray-600">Priority</p>
                      <span className="inline-block mt-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                        {lead.priority?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {lead.assigned_to && (
                    <div>
                      <p className="text-sm text-gray-600">Assigned To</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {lead.assigned_to.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-900">{lead.assigned_to.fullName}</span>
                      </div>
                    </div>
                  )}
                 
                </div>
              </div>

              {/* Next Follow-up */}
              {lead.next_follow_up?.date && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Next Follow-up
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>Date:</strong> {new Date(lead.next_follow_up.date).toLocaleDateString()} at {new Date(lead.next_follow_up.date).toLocaleTimeString()}
                  </p>
                  {lead.next_follow_up.notes && (
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Notes:</strong> {lead.next_follow_up.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              {lead.notes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Internal Notes</h3>
                  <p className="text-gray-700">{lead.notes}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              {lead.activities && lead.activities.length > 0 ? (
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {lead.activities.map((activity, index) => (
                    <div key={index} className="relative flex gap-4 mb-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 ${getActivityColor(activity.type)}`}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getActivityIcon(activity.type)} />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{activity.type.replace('_', ' ').toUpperCase()}</h4>
                          <span className="text-xs text-gray-500">
                            {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : ''}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{activity.description}</p>
                        {activity.comment && (
                          <p className="text-sm text-gray-600 italic bg-white rounded px-3 py-2 border border-gray-200">
                            "{activity.comment}"
                          </p>
                        )}
                        {activity.staff && ( 
                          <p className="text-xs text-gray-500 mt-2">
                            By: {activity.staff.fullName} ({activity.staff.username})
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No activity history yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'quotations' && (
            <div className="space-y-4">
              {lead.quotations && lead.quotations.length > 0 ? (
                lead.quotations.map((quotation, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Quotation #{quotation.quotation_id || quotation.quotationId || (index + 1)}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Sent: {new Date(quotation.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(quotation.amount)}</p>
                      </div>
                    </div>
                    
                    {quotation.items && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Items/Description:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-2">{quotation.items}</p>
                      </div>
                    )}
                    
                    {quotation.validUntil && (
                      <p className="text-sm text-gray-600">
                        <strong>Valid Until:</strong> {new Date(quotation.validUntil).toLocaleDateString()}
                      </p>
                    )}
                    
                    {quotation.sentBy && (
                      <p className="text-xs text-gray-500 mt-2">
                        Sent by: {quotation.sentBy.fullName}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p>No quotations sent yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onOpenQuotation(lead)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Send Quotation
              </button>

              {currentUser?.role === 'admin' && (
                <select
                  onChange={(e) => handleAssignStaff(e.target.value)}
                  disabled={assigningStaff}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue=""
                >
                  <option value="" disabled>Assign to Staff</option>
                  {staffList.map(staff => (
                    <option key={staff._id} value={staff.username}>{staff.fullName}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Comment Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Add Comment/Note</label>
                <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment or note about this lead..."
                className="w-[75%] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-2"
              />
              <button
                onClick={handleAddComment}
                disabled={submittingComment || !comment.trim()}
                className="w-[20%] mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {submittingComment ? 'Adding...' : 'Add Comment'}
              </button>
              
            </div>

            {/* Follow-up Schedule */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule Follow-up</label>
                <input
                  type="datetime-local"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Follow-up Notes</label>
                <input
                  type="text"
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  placeholder="Add notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={handleScheduleFollowUp}
              disabled={!followUpDate}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Schedule Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;
