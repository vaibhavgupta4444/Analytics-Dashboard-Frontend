import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

interface SummaryData {
  totalUsers: number;
  totalBlogs: number;
  totalViews: number;
  engagementRate: number;
}

interface ChartDataPoint {
  [key: string]: string | number;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const ChartData = () => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [usersGrowth, setUsersGrowth] = useState<ChartDataPoint[]>([]);
  const [blogsCreated, setBlogsCreated] = useState<ChartDataPoint[]>([]);
  const [blogsByCategory, setBlogsByCategory] = useState<ChartDataPoint[]>([]);
  const [engagementTrend, setEngagementTrend] = useState<ChartDataPoint[]>([]);
  
  // Filter states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupBy, setGroupBy] = useState('day');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const usersGrowthParams = new URLSearchParams();
      if (startDate) usersGrowthParams.append('startDate', startDate);
      if (endDate) usersGrowthParams.append('endDate', endDate);
      
      const blogsCreatedParams = new URLSearchParams();
      blogsCreatedParams.append('groupBy', groupBy);

      const [summaryRes, usersRes, blogsRes, categoryRes, engagementRes] = await Promise.all([
        fetch(`${API_BASE}/analytics/summary`),
        fetch(`${API_BASE}/analytics/users-growth${usersGrowthParams.toString() ? '?' + usersGrowthParams.toString() : ''}`),
        fetch(`${API_BASE}/analytics/blogs-created?${blogsCreatedParams.toString()}`),
        fetch(`${API_BASE}/analytics/blogs-by-category`),
        fetch(`${API_BASE}/analytics/engagement-trend`)
      ]);

      if (!summaryRes.ok || !usersRes.ok || !blogsRes.ok || !categoryRes.ok || !engagementRes.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const [summaryData, usersData, blogsData, categoryData, engagementData] = await Promise.all([
        summaryRes.json(),
        usersRes.json(),
        blogsRes.json(),
        categoryRes.json(),
        engagementRes.json()
      ]);

      setSummary(summaryData);
      setUsersGrowth(usersData.data || []);
      setBlogsCreated(blogsData.data || []);
      setBlogsByCategory(categoryData.data || []);
      setEngagementTrend(engagementData.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [startDate, endDate, groupBy]);

  if (loading) return <div className="py-4">Loading...</div>;
  if (error) return <div className="py-4 text-red-500">Error: {error}</div>;

  return (
    <div className='py-4 space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.totalUsers || 0}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-gray-500">Total Blogs</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.totalBlogs || 0}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.totalViews || 0}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-gray-500">Engagement Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{summary?.engagementRate || 0}%</p>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Users Growth - Line Chart */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Users Growth</h3>
              <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="self-end px-4 py-2 bg-gray-300 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-400"
                >
                  Reset
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usersGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Blogs Created - Bar Chart */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Blogs Created</h3>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Group By</label>
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blogsCreated}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="blogs" fill="#ef4444" name="Blogs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Blogs by Category - Pie Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Blogs by Category</h3>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={blogsByCategory}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {blogsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Trend - Area Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Engagement Trend</h3>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="engagement" fill="#10b981" stroke="#059669" name="Engagement" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartData;