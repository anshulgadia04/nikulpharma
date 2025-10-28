import { useState, useEffect } from "react";
import { TrendingUp, Users, MessageSquare, Activity } from "lucide-react";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    totalLeads: 0,
    recentInquiries: 0,
  });

  useEffect(() => {
    // TODO: Fetch real analytics data from backend
    // For now showing placeholder
    setStats({
      totalProducts: 0,
      totalInquiries: 0,
      totalLeads: 0,
      recentInquiries: 0,
    });
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Activity,
      color: "bg-blue-500",
    },
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: "bg-green-500",
    },
    {
      title: "WhatsApp Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Recent (7 days)",
      value: stats.recentInquiries,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your business metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
            >
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for charts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Traffic & Conversion Analytics
        </h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center text-gray-500">
            <Activity size={48} className="mx-auto mb-2 opacity-50" />
            <p className="font-medium">Analytics Charts Coming Soon</p>
            <p className="text-sm">Traffic tracking will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
