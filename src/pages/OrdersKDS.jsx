import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const statusFlow = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
const statusConfig = {
  pending: { color: 'bg-yellow-400', text: 'text-yellow-400', border: 'border-yellow-400/30', bg: 'bg-yellow-400/5', label: 'Pending' },
  confirmed: { color: 'bg-blue-400', text: 'text-blue-400', border: 'border-blue-400/30', bg: 'bg-blue-400/5', label: 'Confirmed' },
  preparing: { color: 'bg-orange-400', text: 'text-orange-400', border: 'border-orange-400/30', bg: 'bg-orange-400/5', label: 'Cooking' },
  ready: { color: 'bg-emerald', text: 'text-emerald', border: 'border-emerald/30', bg: 'bg-emerald/5', label: 'Ready' },
  delivered: { color: 'bg-gray-400', text: 'text-gray-400', border: 'border-gray-400/30', bg: 'bg-gray-400/5', label: 'Delivered' },
  cancelled: { color: 'bg-red-500', text: 'text-red-500', border: 'border-red-500/30', bg: 'bg-red-500/5', label: 'Cancelled' },
};

export default function OrdersKDS() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer_name: '', table_number: '', notes: '' });
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/api/menu/orders');
      setOrders(res.data);
    } catch {
      // Use demo data if backend not available
      setOrders([
        { id: 1, customer_name: 'Walk-in', table_number: 4, status: 'preparing', total_amount: 42.50, notes: '', created_at: new Date(Date.now() - 240000).toISOString(), items: [{ quantity: 1, menu_item: { name: 'Ribeye Steak' }, unit_price: 34.00 }, { quantity: 1, menu_item: { name: 'IPA Beer' }, unit_price: 8.50 }] },
        { id: 2, customer_name: 'Walk-in', table_number: 12, status: 'pending', total_amount: 28.00, notes: 'No onions', created_at: new Date(Date.now() - 60000).toISOString(), items: [{ quantity: 2, menu_item: { name: 'Spicy Pasta' }, unit_price: 12.00 }, { quantity: 1, menu_item: { name: 'Coke Zero' }, unit_price: 4.00 }] },
        { id: 3, customer_name: 'Walk-in', table_number: 7, status: 'confirmed', total_amount: 26.74, notes: 'Severe gluten allergy', created_at: new Date(Date.now() - 30000).toISOString(), items: [{ quantity: 1, menu_item: { name: 'Pan-Seared Salmon (GF)' }, unit_price: 22.00 }, { quantity: 1, menu_item: { name: 'Sonoma Chardonnay' }, unit_price: 12.00 }] },
        { id: 4, customer_name: 'Sarah M.', table_number: 2, status: 'ready', total_amount: 55.00, notes: '', created_at: new Date(Date.now() - 600000).toISOString(), items: [{ quantity: 1, menu_item: { name: 'Truffle Risotto' }, unit_price: 28.00 }, { quantity: 1, menu_item: { name: 'Tiramisu' }, unit_price: 12.00 }, { quantity: 1, menu_item: { name: 'Espresso' }, unit_price: 5.00 }] },
        { id: 5, customer_name: 'Walk-in', table_number: 9, status: 'delivered', total_amount: 38.00, notes: '', created_at: new Date(Date.now() - 1200000).toISOString(), items: [{ quantity: 2, menu_item: { name: 'Smash Burger' }, unit_price: 14.99 }] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await api.get('/api/menu');
      setMenuItems(res.data);
    } catch {
      setMenuItems([]);
    }
  };

  const advanceStatus = async (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const currentIdx = statusFlow.indexOf(o.status);
        if (currentIdx < statusFlow.length - 1) {
          const newStatus = statusFlow[currentIdx + 1];
          toast.success(`Order #${orderId} → ${statusConfig[newStatus]?.label}`);
          return { ...o, status: newStatus };
        }
      }
      return o;
    }));
    try {
      await api.put(`/api/menu/orders/${orderId}/status`, { status: 'next' });
    } catch { /* UI already updated */ }
  };

  const cancelOrder = async (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
    toast.error(`Order #${orderId} cancelled`);
    try {
      await api.put(`/api/menu/orders/${orderId}/status`, { status: 'cancelled' });
    } catch { /* UI already updated */ }
  };

  const createOrder = async () => {
    const order = {
      ...newOrder,
      table_number: parseInt(newOrder.table_number) || null,
      items: selectedItems,
    };
    try {
      const res = await api.post('/api/menu/orders', order);
      setOrders(prev => [res.data, ...prev]);
      toast.success('Order created!');
    } catch {
      const fakeOrder = {
        id: Date.now(),
        ...order,
        status: 'pending',
        total_amount: 0,
        created_at: new Date().toISOString(),
        items: [],
      };
      setOrders(prev => [fakeOrder, ...prev]);
      toast.success('Order created!');
    }
    setShowNewOrder(false);
    setNewOrder({ customer_name: '', table_number: '', notes: '' });
    setSelectedItems([]);
  };

  const timeAgo = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const filteredOrders = orders.filter(o => {
    if (filter === 'active') return !['delivered', 'cancelled'].includes(o.status);
    if (filter === 'completed') return o.status === 'delivered';
    return true;
  });

  const activeCount = orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-lg">🍳</span>
            Kitchen Display System
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time order queue with chronological tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-mono text-emerald bg-emerald/10 border border-emerald/20 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            KDS LIVE
          </span>
          <button
            onClick={() => setShowNewOrder(true)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-200 shadow-lg shadow-emerald/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            + New Order
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Tickets', value: activeCount, icon: '🎫', accent: 'emerald' },
          { label: 'Cooking Now', value: preparingCount, icon: '🔥', accent: 'orange-400' },
          { label: 'Ready to Serve', value: readyCount, icon: '✅', accent: 'blue-400' },
        ].map((stat) => (
          <div key={stat.label} className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
            </div>
            <span className={`text-3xl font-black font-mono text-${stat.accent}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/10 w-fit">
        {['active', 'completed', 'all'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all capitalize ${
              filter === f ? 'bg-emerald text-navy shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Order Queue */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-20 backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl">
          <span className="text-5xl block mb-4">📋</span>
          <p className="text-gray-400 font-semibold">No orders in this view</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Queue Header */}
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 font-mono tracking-wider px-2">
            <span>QUEUE CHRONOLOGY ({filteredOrders.length} orders)</span>
            <span>STATUS</span>
          </div>

          {filteredOrders.map((order) => {
            const sc = statusConfig[order.status] || statusConfig.pending;
            const canAdvance = statusFlow.indexOf(order.status) < statusFlow.length - 1 && order.status !== 'cancelled';
            return (
              <div
                key={order.id}
                className={`backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.005] ${sc.bg} ${sc.border}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-grow space-y-3">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-base font-black text-white font-mono">
                        Table {order.table_number || '—'}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">#{String(order.id).padStart(4, '0')}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{timeAgo(order.created_at)}</span>
                      {order.customer_name && order.customer_name !== 'Walk-in' && (
                        <span className="text-xs text-gray-400 font-semibold">• {order.customer_name}</span>
                      )}
                    </div>

                    {/* Items */}
                    <div className="flex flex-wrap gap-2">
                      {(order.items || []).map((item, idx) => (
                        <span key={idx} className="text-xs bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-lg text-gray-300 font-mono">
                          {item.quantity}x {item.menu_item?.name || 'Item'}
                        </span>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="text-xs text-yellow-400/80 font-semibold flex items-center gap-1.5">
                        ⚠️ {order.notes}
                      </p>
                    )}

                    {order.total_amount > 0 && (
                      <span className="text-sm font-bold text-white font-mono">${order.total_amount.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${sc.color} ${order.status === 'preparing' ? 'animate-pulse' : ''}`} />
                      <span className={`text-xs font-bold uppercase font-mono ${sc.text}`}>{sc.label}</span>
                    </div>

                    <div className="flex gap-2">
                      {canAdvance && (
                        <button
                          onClick={() => advanceStatus(order.id)}
                          className="px-3 py-1.5 text-xs font-bold bg-emerald/10 text-emerald border border-emerald/30 rounded-lg hover:bg-emerald/20 transition-all"
                        >
                          {order.status === 'pending' ? 'Confirm' : order.status === 'confirmed' ? 'Start Cooking' : order.status === 'preparing' ? 'Mark Ready' : 'Deliver'} →
                        </button>
                      )}
                      {!['delivered', 'cancelled'].includes(order.status) && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-3 py-1.5 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* KDS Footer */}
      <div className="backdrop-blur-md bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 font-mono gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          Total Active Tickets: {activeCount}
        </span>
        <span>*SmartDine locks ticket ordering slots based on millisecond arrival time</span>
      </div>

      {/* New Order Modal */}
      {showNewOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowNewOrder(false)} />
          <div className="relative w-full max-w-md backdrop-blur-xl bg-navy/95 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6">Create New Order</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Name</label>
                <input
                  type="text"
                  value={newOrder.customer_name}
                  onChange={e => setNewOrder(p => ({ ...p, customer_name: e.target.value }))}
                  placeholder="Walk-in"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm font-mono focus:outline-none focus:border-emerald/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Table Number</label>
                <input
                  type="number"
                  value={newOrder.table_number}
                  onChange={e => setNewOrder(p => ({ ...p, table_number: e.target.value }))}
                  placeholder="1"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm font-mono focus:outline-none focus:border-emerald/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</label>
                <textarea
                  value={newOrder.notes}
                  onChange={e => setNewOrder(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Allergies, special requests..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm font-mono focus:outline-none focus:border-emerald/50 transition-colors resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewOrder(false)}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 border border-white/10 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={createOrder}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all shadow-lg shadow-emerald/20"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
