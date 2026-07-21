import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import {
  HiOutlineClipboardList,
  HiOutlineChatAlt2,
  HiOutlineTrendingUp,
  HiOutlineCube,
  HiOutlineViewGrid,
  HiOutlineLightningBolt,
} from 'react-icons/hi';

function StatCard({ icon: Icon, label, value, change, color, loading }) {
  const colorMap = {
    emerald: 'bg-emerald/10 text-emerald border-emerald/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  return (
    <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-emerald/20 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colorMap[color]} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
            change > 0 ? 'bg-emerald/10 text-emerald' : 'bg-red-500/10 text-red-400'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-8 w-20 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-4 w-28 bg-white/5 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
          <p className="text-sm text-gray-400 mt-1">{label}</p>
        </>
      )}
    </div>
  );
}

function QuickAction({ to, icon: Icon, label, description }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald/20 hover:bg-white/[0.04] transition-all duration-300 group"
    >
      <div className="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <svg className="w-4 h-4 text-gray-600 ml-auto transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [menuRes, ordersRes, restaurantRes] = await Promise.allSettled([
          api.get('/api/menu'),
          api.get('/api/menu/orders'),
          api.get('/api/restaurant'),
        ]);

        const menuItems = menuRes.status === 'fulfilled' ? menuRes.value.data : [];
        const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data : [];

        setStats({
          total_orders: Array.isArray(orders) ? orders.length : 0,
          ai_chats: 0,
          menu_items: Array.isArray(menuItems) ? menuItems.length : 0,
          active_trends: 0,
          order_change: null,
          chat_change: null,
        });

        // Use latest 5 orders for recent orders display
        if (Array.isArray(orders)) {
          const recent = orders.slice(0, 5).map((o) => ({
            id: `#${String(o.id).padStart(4, '0')}`,
            table: `Table ${o.table_number || '—'}`,
            items: (o.items || []).map((it) => `${it.quantity}x ${it.menu_item?.name || 'Item'}`).join(', ') || 'No items',
            status: o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : 'Queued',
            time: o.created_at ? new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          }));
          setRecentOrders(recent);
        }
      } catch {
        // Use fallback data if API not available
        setStats({
          total_orders: 247,
          ai_chats: 89,
          menu_items: 32,
          active_trends: 15,
          order_change: 12,
          chat_change: 24,
        });
        setRecentOrders([
          { id: '#1894', table: 'Table 7', items: '1x Salmon (GF), 1x Chardonnay', status: 'Cooking', time: '2 mins ago' },
          { id: '#1893', table: 'Table 12', items: '2x Spicy Pasta, 1x Coke Zero', status: 'Ready', time: '5 mins ago' },
          { id: '#1892', table: 'Table 4', items: '1x Ribeye Steak, 1x IPA Beer', status: 'Served', time: '12 mins ago' },
        ]);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const statusColors = {
    Cooking: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    Ready: 'bg-emerald/10 text-emerald border-emerald/20',
    Served: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    Queued: 'bg-gray-400/10 text-gray-400 border-gray-400/20',
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          {getGreeting()}, {user?.restaurant_name || 'Chef'} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's what's happening at your restaurant today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={HiOutlineViewGrid}
          label="Today's Orders"
          value={stats?.total_orders || 0}
          change={stats?.order_change}
          color="emerald"
          loading={loading}
        />
        <StatCard
          icon={HiOutlineChatAlt2}
          label="AI Conversations"
          value={stats?.ai_chats || 0}
          change={stats?.chat_change}
          color="blue"
          loading={loading}
        />
        <StatCard
          icon={HiOutlineClipboardList}
          label="Menu Items"
          value={stats?.menu_items || 0}
          color="purple"
          loading={loading}
        />
        <StatCard
          icon={HiOutlineTrendingUp}
          label="Active Trends"
          value={stats?.active_trends || 0}
          color="orange"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-3 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white tracking-wide">Recent Orders</h2>
            <Link to="/dashboard/orders" className="text-xs text-emerald font-bold hover:text-emerald-dark transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentOrders.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-gray-500 text-sm">No recent orders yet</p>
              </div>
            ) : (
              recentOrders.map((order, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 font-mono">
                      {order.id}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{order.table}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.items}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-gray-500 font-mono hidden sm:inline">{order.time}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${statusColors[order.status] || statusColors.Queued}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <HiOutlineLightningBolt className="w-4 h-4 text-emerald" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <QuickAction
              to="/dashboard/menu"
              icon={HiOutlineClipboardList}
              label="Manage Menu"
              description="Add, edit, or remove dishes"
            />
            <QuickAction
              to="/dashboard/agent"
              icon={HiOutlineChatAlt2}
              label="Chat with AI Agent"
              description="Test your voice ordering AI"
            />
            <QuickAction
              to="/dashboard/trends"
              icon={HiOutlineTrendingUp}
              label="View Food Trends"
              description="See what's trending in your city"
            />
            <QuickAction
              to="/dashboard/ar"
              icon={HiOutlineCube}
              label="AR Menu Preview"
              description="Preview dishes in augmented reality"
            />
            <QuickAction
              to="/dashboard/orders"
              icon={HiOutlineViewGrid}
              label="Kitchen Display"
              description="Monitor live order queue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
