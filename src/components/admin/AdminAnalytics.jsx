import { useState, useEffect } from "react";
import { TrendingUp, Users, MessageSquare, Activity, Eye, RefreshCw } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const [productsData, setProductsData] = useState({ topProducts: [], topCategories: [] });
  const [conversionsData, setConversionsData] = useState(null);
  const [timeRange, setTimeRange] = useState(30); // 7, 30, or 90 days

  useEffect(() => {
    fetchAllAnalytics();
  }, [timeRange]);

  const fetchAllAnalytics = async () => {
    setLoading(true);
    try {
      const [overviewRes, trafficRes, productsRes, conversionsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/analytics/overview`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/api/admin/analytics/traffic?days=${timeRange}`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/api/admin/analytics/products?days=${timeRange}&limit=10`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/api/admin/analytics/conversions?days=${timeRange}`, { withCredentials: true }),
      ]);

      setOverview(overviewRes.data);
      setTrafficData(trafficRes.data);
      setProductsData(productsRes.data);
      setConversionsData(conversionsRes.data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !overview) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw size={48} className="animate-spin text-gray-400" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Traffic",
      value: overview.traffic.last30Days.toLocaleString(),
      subtitle: `${overview.traffic.last7Days.toLocaleString()} last 7 days`,
      icon: Eye,
      color: "bg-blue-500",
    },
    {
      title: "Conversions",
      value: overview.conversions.last7Days,
      subtitle: `${overview.conversions.conversionRate}% rate`,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Total Inquiries",
      value: overview.counts.inquiries,
      subtitle: "All time",
      icon: MessageSquare,
      color: "bg-purple-500",
    },
    {
      title: "WhatsApp Leads",
      value: overview.counts.leads,
      subtitle: "From bot",
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  // Traffic chart data
  const trafficChartData = {
    labels: trafficData.map(d => {
      const date = new Date(d._id);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Views',
        data: trafficData.map(d => d.views),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: trafficData.map(d => d.conversions),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const trafficChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Top products bar chart
  const productsChartData = {
    labels: productsData.topProducts.map(p => p.name || p.slug),
    datasets: [
      {
        label: 'Product Views',
        data: productsData.topProducts.map(p => p.views),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const productsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  // Categories doughnut chart
  const categoriesChartData = {
    labels: productsData.topCategories.map(c => c.category),
    datasets: [
      {
        label: 'Category Views',
        data: productsData.topCategories.map(c => c.views),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(14, 165, 233, 0.7)',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const categoriesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
    },
  };

  // Conversion funnel data
  const funnelData = conversionsData?.funnel || {};
  const funnelSteps = [
    { label: 'Product List Views', value: funnelData.productListViews || 0, color: 'bg-blue-500' },
    { label: 'Product Detail Views', value: funnelData.productDetailViews || 0, color: 'bg-green-500' },
    { label: 'Inquiries Submitted', value: funnelData.inquiries || 0, color: 'bg-purple-500' },
    { label: 'WhatsApp Leads', value: funnelData.leads || 0, color: 'bg-orange-500' },
  ];

  const maxFunnelValue = Math.max(...funnelSteps.map(s => s.value), 1);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time insights into your business performance</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <button
            onClick={fetchAllAnalytics}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Trends Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Traffic Trends</h2>
        <div className="h-80">
          <Line data={trafficChartData} options={trafficChartOptions} />
        </div>
      </div>

      {/* Products & Categories Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Most Viewed Products</h2>
          <div className="h-80">
            {productsData.topProducts.length > 0 ? (
              <Bar data={productsChartData} options={productsChartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No product data yet
              </div>
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h2>
          <div className="h-80 flex items-center justify-center">
            {productsData.topCategories.length > 0 ? (
              <Doughnut data={categoriesChartData} options={categoriesChartOptions} />
            ) : (
              <div className="text-gray-400">No category data yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Conversion Funnel</h2>
        <div className="space-y-4">
          {funnelSteps.map((step, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{step.label}</span>
                <span className="text-sm font-bold text-gray-900">{step.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                <div
                  className={`${step.color} h-8 rounded-full transition-all duration-500 flex items-center justify-end px-3`}
                  style={{ width: `${(step.value / maxFunnelValue) * 100}%` }}
                >
                  <span className="text-white text-xs font-semibold">
                    {index > 0 && funnelSteps[index - 1].value > 0
                      ? `${((step.value / funnelSteps[index - 1].value) * 100).toFixed(1)}%`
                      : '100%'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Conversion Rates Summary */}
        {conversionsData?.rates && (
          <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{conversionsData.rates.listToDetail}%</p>
              <p className="text-xs text-gray-600 mt-1">List → Detail</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{conversionsData.rates.detailToInquiry}%</p>
              <p className="text-xs text-gray-600 mt-1">Detail → Inquiry</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{conversionsData.rates.inquiryToLead}%</p>
              <p className="text-xs text-gray-600 mt-1">Inquiry → Lead</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
