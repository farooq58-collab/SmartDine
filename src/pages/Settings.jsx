import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    cuisine_type: '',
    address: '',
    city: '',
    phone: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const res = await api.get('/api/restaurant');
      setRestaurant(res.data);
    } catch {
      // Pre-fill with user data
      setRestaurant(prev => ({
        ...prev,
        name: user?.restaurant_name || 'My Restaurant',
      }));
    } finally {
      setLoading(false);
    }
  };

  const saveRestaurant = async () => {
    setSaving(true);
    try {
      await api.put('/api/restaurant', restaurant);
      toast.success('Restaurant profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordForm.new_password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await api.post('/api/auth/change-password', {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });
      toast.success('Password changed successfully');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to change password');
    }
  };

  const plans = [
    { name: 'Free', price: '$0', period: '/forever', features: ['Basic menu management', '50 AI chats/month', 'Up to 20 menu items'], current: true },
    { name: 'Pro', price: '$49', period: '/month', features: ['Unlimited AI chats', 'Live trends dashboard', 'AR food previews', 'Up to 200 menu items'], current: false },
    { name: 'Enterprise', price: '$149', period: '/month', features: ['Everything in Pro', 'KDS & order management', 'Priority support', 'Unlimited menu items', 'Multi-location'], current: false },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-lg">⚙️</span>
          Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage your restaurant profile, password, and subscription</p>
      </div>

      {/* Restaurant Profile */}
      <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-base font-bold text-white">Restaurant Profile</h2>
          <p className="text-xs text-gray-500 mt-0.5">Update your restaurant's public information</p>
        </div>
        <div className="p-6 space-y-5">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/[0.03] rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Restaurant Name</label>
                  <input
                    type="text"
                    value={restaurant.name}
                    onChange={e => setRestaurant(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cuisine Type</label>
                  <select
                    value={restaurant.cuisine_type}
                    onChange={e => setRestaurant(p => ({ ...p, cuisine_type: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald/50 transition-colors"
                  >
                    <option value="" className="bg-navy-dark">Select cuisine</option>
                    {['Italian', 'American', 'Mexican', 'Japanese', 'Chinese', 'Indian', 'French', 'Thai', 'Mediterranean', 'Korean', 'Middle Eastern', 'Fusion', 'Other'].map(c => (
                      <option key={c} value={c} className="bg-navy-dark">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={restaurant.description}
                  onChange={e => setRestaurant(p => ({ ...p, description: e.target.value }))}
                  placeholder="Tell customers about your restaurant..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald/50 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">City</label>
                  <input
                    type="text"
                    value={restaurant.city}
                    onChange={e => setRestaurant(p => ({ ...p, city: e.target.value }))}
                    placeholder="New York"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone</label>
                  <input
                    type="tel"
                    value={restaurant.phone}
                    onChange={e => setRestaurant(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Address</label>
                <input
                  type="text"
                  value={restaurant.address}
                  onChange={e => setRestaurant(p => ({ ...p, address: e.target.value }))}
                  placeholder="123 Main Street, Suite 100"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald/50 transition-colors"
                />
              </div>

              <button
                onClick={saveRestaurant}
                disabled={saving}
                className="px-6 py-3 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all shadow-lg shadow-emerald/20 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Change Password */}
      <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-base font-bold text-white">Change Password</h2>
          <p className="text-xs text-gray-500 mt-0.5">Update your account password</p>
        </div>
        <div className="p-6 space-y-5">
          {['current_password', 'new_password', 'confirm_password'].map((field) => (
            <div key={field}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {field.replace(/_/g, ' ')}
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordForm[field]}
                onChange={e => setPasswordForm(p => ({ ...p, [field]: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button
              onClick={changePassword}
              className="px-6 py-3 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all shadow-lg shadow-emerald/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Update Password
            </button>
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={e => setShowPassword(e.target.checked)}
                className="rounded accent-emerald"
              />
              Show passwords
            </label>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-base font-bold text-white">Subscription Plan</h2>
          <p className="text-xs text-gray-500 mt-0.5">Your current plan and available upgrades</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  plan.current
                    ? 'bg-emerald/5 border-emerald/30 shadow-lg shadow-emerald/5'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                {plan.current && (
                  <span className="text-[9px] font-bold bg-emerald/20 text-emerald px-2 py-0.5 rounded font-mono uppercase tracking-wider mb-3 inline-block">
                    Current Plan
                  </span>
                )}
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-1 mb-4">
                  <span className="text-2xl font-black text-emerald font-mono">{plan.price}</span>
                  <span className="text-xs text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-4 h-4 text-emerald flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <button className="w-full mt-4 px-4 py-2.5 rounded-xl text-xs font-bold text-white border border-white/20 hover:bg-white/5 transition-all">
                    Upgrade
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="backdrop-blur-md bg-red-500/[0.03] border border-red-500/20 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-red-500/10">
          <h2 className="text-base font-bold text-red-400">Danger Zone</h2>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-300">Delete Account</p>
            <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all associated data</p>
          </div>
          <button className="px-4 py-2 rounded-xl text-xs font-bold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
