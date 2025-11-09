import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentAdmin } from '../../utils/adminAuth';
import LeadDetailModal from './LeadDetailModal';
import QuotationFormModal from './QuotationFormModal';

const AdminLeadsPipeline = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStage, setActiveStage] = useState('all');
  const [staffList, setStaffList] = useState([]);

  // Pipeline stages configuration - matching Groweon design
  const stages = [
    { id: 'all', label: 'All Leads', color: 'bg-gray-500' },
    { id: 'new', label: 'New', color: 'bg-blue-500' },
    { id: 'contacted', label: 'Contacted', color: 'bg-purple-500' },
    { id: 'quoted', label: 'Quoted', color: 'bg-yellow-500' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
    { id: 'won', label: 'Won', color: 'bg-green-500' },
    { id: 'lost', label: 'Lost', color: 'bg-red-500' }
  ];

  useEffect(() => {
    fetchCurrentUser();
    fetchLeads();
    fetchStaffList();
  }, []);

  const fetchCurrentUser = async () => {
    const user = await getCurrentAdmin();
    setCurrentUser(user);
  };

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:5174/api/admin/leads', {
        withCredentials: true
      });
      console.log('Leads response:', response.data);
      // API returns {leads: [...], pagination: {...}}
      const leadsData = response.data.leads || response.data;
      console.log('Leads data:', leadsData);
      console.log('Lead count:', leadsData?.length);
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
      setLoading(false);
    }
  };

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5174/api/admin/users', {
        withCredentials: true
      });
      setStaffList(Array.isArray(response.data.users) ? response.data.users : []);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setStaffList([]);
    }
  };

  const handleStageChange = async (leadId, newStage) => {
    try {
      await axios.patch(`http://localhost:5174/api/admin/leads/${leadId}/pipeline`, {
        pipeline_stage: newStage
      }, {
        withCredentials: true
      });
      
      fetchLeads(); // Refresh leads
      alert('Lead stage updated successfully!');
    } catch (error) {
      console.error('Error updating lead stage:', error);
      alert('Failed to update lead stage');
    }
  };

  const getFilteredLeads = () => {
    const filtered = leads.filter(lead => {
      const matchesStage = activeStage === 'all' || lead.pipeline_stage === activeStage;
      const matchesSearch = searchTerm === '' || 
        lead.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.leadId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStage && matchesSearch;
    });
    
    console.log('Total leads:', leads.length);
    console.log('Active stage:', activeStage);
    console.log('Filtered leads:', filtered.length);
    console.log('First lead:', leads[0]);
    
    return filtered;
  };

  const getStageCount = (stage) => {
    if (stage === 'all') return leads.length;
    return leads.filter(l => l.pipeline_stage === stage).length;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  const filteredLeads = getFilteredLeads();

  return (
    <div className="h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
        <p className="text-gray-600 mt-1">Manage and track your sales leads</p>
      </div>

      {/* Stage Tabs - Groweon Style */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            {stages.map(stage => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeStage === stage.id
                    ? `${stage.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage.label} ({getStageCount(stage.id)})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Leads List - Clean Table Design like Groweon */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-lg">No leads found</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-blue-600 font-semibold">{lead.leadId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{lead.customer_name}</div>
                      {lead.company && <div className="text-xs text-gray-500">{lead.company}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.phone}</div>
                    {lead.email && <div className="text-xs text-gray-500">{lead.email}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.product || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={lead.pipeline_stage}
                      onChange={(e) => handleStageChange(lead._id, e.target.value)}
                      className="text-xs font-semibold px-3 py-1 rounded-full border-2 cursor-pointer focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor: lead.pipeline_stage === 'new' ? '#EFF6FF' :
                                       lead.pipeline_stage === 'contacted' ? '#F3E8FF' :
                                       lead.pipeline_stage === 'quoted' ? '#FEF3C7' :
                                       lead.pipeline_stage === 'negotiation' ? '#FFEDD5' :
                                       lead.pipeline_stage === 'won' ? '#D1FAE5' :
                                       '#FEE2E2',
                        borderColor: lead.pipeline_stage === 'new' ? '#3B82F6' :
                                   lead.pipeline_stage === 'contacted' ? '#A855F7' :
                                   lead.pipeline_stage === 'quoted' ? '#EAB308' :
                                   lead.pipeline_stage === 'negotiation' ? '#F97316' :
                                   lead.pipeline_stage === 'won' ? '#10B981' :
                                   '#EF4444',
                        color: lead.pipeline_stage === 'new' ? '#1E40AF' :
                             lead.pipeline_stage === 'contacted' ? '#7C3AED' :
                             lead.pipeline_stage === 'quoted' ? '#A16207' :
                             lead.pipeline_stage === 'negotiation' ? '#C2410C' :
                             lead.pipeline_stage === 'won' ? '#047857' :
                             '#B91C1C'
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.active_quotation_amount > 0 ? (
                      <span className="text-sm font-semibold text-green-600">
                        {formatCurrency(lead.active_quotation_amount)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {lead.assigned_to ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {lead.assigned_to.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-700">{lead.assigned_to.fullName}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={fetchLeads}
          currentUser={currentUser}
          staffList={staffList}
          onOpenQuotation={(lead) => {
            setSelectedLead(lead);
            setShowQuotationModal(true);
          }}
        />
      )}

      {/* Quotation Form Modal */}
      {showQuotationModal && selectedLead && (
        <QuotationFormModal
          lead={selectedLead}
          onClose={() => {
            setShowQuotationModal(false);
            setSelectedLead(null);
          }}
          onSuccess={() => {
            setShowQuotationModal(false);
            fetchLeads();
          }}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default AdminLeadsPipeline;
