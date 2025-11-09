import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentAdmin } from '../../utils/adminAuth';

const AdminCRMDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState(null);
  const [leads, setLeads] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchDashboardData();
  }, []);

  const fetchCurrentUser = async () => {
    const user = await getCurrentAdmin();
    setCurrentUser(user);
  };

  const fetchDashboardData = async () => {
    try {
      const [oppResponse, leadsResponse] = await Promise.all([
        axios.get('http://localhost:5174/api/admin/leads/dashboard/opportunities', {
          withCredentials: true
        }),
        axios.get('http://localhost:5174/api/admin/leads', {
          withCredentials: true
        })
      ]);
      
      setOpportunities(oppResponse.data);
      setLeads(Array.isArray(leadsResponse.data) ? leadsResponse.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLeads([]);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const getPipelineStats = () => {
    const stages = ['new', 'contacted', 'quoted', 'negotiation', 'won', 'lost'];
    return stages.map(stage => ({
      stage,
      count: leads.filter(l => l.pipeline_stage === stage).length,
      value: leads.filter(l => l.pipeline_stage === stage).reduce((sum, l) => sum + (l.active_quotation_amount || 0), 0)
    }));
  };

  const getRecentActivities = () => {
    const activities = [];
    leads.forEach(lead => {
      if (lead.activities && lead.activities.length > 0) {
        lead.activities.forEach(activity => {
          activities.push({
            ...activity,
            leadName: lead.customer_name,
            leadId: lead.leadId
          });
        });
      }
    });
    
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  };

  const getUpcomingFollowUps = () => {
    const now = new Date();
    return leads
      .filter(l => l.next_follow_up?.date && new Date(l.next_follow_up.date) >= now)
      .sort((a, b) => new Date(a.next_follow_up.date) - new Date(b.next_follow_up.date))
      .slice(0, 5);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const pipelineStats = getPipelineStats();
  const recentActivities = getRecentActivities();
  const upcomingFollowUps = getUpcomingFollowUps();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">CRM Dashboard</h1>
        <p className="text-blue-100">Welcome back, {currentUser?.fullName || currentUser?.username}!</p>
      </div>

      {/* Open Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Open Opportunities */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">Total Open Opportunities</p>
              <p className="text-4xl font-bold mt-2">{formatCurrency(opportunities?.total || 0)}</p>
              <p className="text-green-100 text-sm mt-2">
                From {opportunities?.leadCount || 0} active leads
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-4">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">Total Leads</p>
              <p className="text-4xl font-bold mt-2">{leads.length}</p>
              <p className="text-purple-100 text-sm mt-2">
                {leads.filter(l => l.pipeline_stage === 'new').length} new this week
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-4">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Staff-wise Opportunities (Admin Only) */}
      {currentUser?.role === 'admin' && opportunities?.staffBreakdown && opportunities.staffBreakdown.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Staff Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.staffBreakdown.map((staff, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {staff.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{staff.fullName}</h3>
                    <p className="text-xs text-gray-600">@{staff._id}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Open Value:</span>
                    <span className="font-bold text-green-600">{formatCurrency(staff.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Leads:</span>
                    <span className="font-semibold text-blue-600">{staff.leadCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Pipeline Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipelineStats.map((stat) => {
            const stageColors = {
              new: 'bg-blue-100 border-blue-300 text-blue-700',
              contacted: 'bg-purple-100 border-purple-300 text-purple-700',
              quoted: 'bg-yellow-100 border-yellow-300 text-yellow-700',
              negotiation: 'bg-orange-100 border-orange-300 text-orange-700',
              won: 'bg-green-100 border-green-300 text-green-700',
              lost: 'bg-red-100 border-red-300 text-red-700'
            };
            
            return (
              <div key={stat.stage} className={`${stageColors[stat.stage]} border-2 rounded-lg p-4`}>
                <p className="text-xs font-semibold uppercase tracking-wide">{stat.stage}</p>
                <p className="text-3xl font-bold mt-2">{stat.count}</p>
                {stat.value > 0 && (
                  <p className="text-xs mt-2 font-semibold">{formatCurrency(stat.value)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activities & Upcoming Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Activities
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {activity.type.replace('_', ' ').toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span className="font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{activity.leadId}</span>
                      <span>•</span>
                      <span>{new Date(activity.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-gray-400">No recent activities</p>
            )}
          </div>
        </div>

        {/* Upcoming Follow-ups */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming Follow-ups
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {upcomingFollowUps.length > 0 ? (
              upcomingFollowUps.map((lead, index) => {
                const daysUntil = Math.ceil((new Date(lead.next_follow_up.date) - new Date()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysUntil <= 1;
                
                return (
                  <div key={index} className={`p-3 rounded-lg border-2 ${isUrgent ? 'bg-red-50 border-red-300' : 'bg-yellow-50 border-yellow-300'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{lead.customer_name}</p>
                        <p className="text-xs text-gray-600 mt-1 font-mono">{lead.leadId}</p>
                        {lead.next_follow_up.notes && (
                          <p className="text-sm text-gray-700 mt-2 italic">"{lead.next_follow_up.notes}"</p>
                        )}
                      </div>
                      <div className={`text-right ${isUrgent ? 'text-red-700' : 'text-yellow-700'}`}>
                        <p className="text-xs font-semibold uppercase">{isUrgent ? 'URGENT' : 'Upcoming'}</p>
                        <p className="text-sm font-bold mt-1">
                          {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {new Date(lead.next_follow_up.date).toLocaleString()}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-center py-8 text-gray-400">No upcoming follow-ups</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Win Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {leads.length > 0 ? Math.round((leads.filter(l => l.pipeline_stage === 'won').length / leads.length) * 100) : 0}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Won Deals</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {leads.filter(l => l.pipeline_stage === 'won').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600">In Negotiation</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {leads.filter(l => l.pipeline_stage === 'negotiation').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Avg. Lead Score</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / leads.length) : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminCRMDashboard;
