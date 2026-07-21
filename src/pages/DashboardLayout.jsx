import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineChatAlt2,
  HiOutlineTrendingUp,
  HiOutlineCube,
  HiOutlineViewGrid,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineX,
} from 'react-icons/hi';

const sidebarLinks = [
  { to: '/dashboard', icon: HiOutlineHome, label: 'Overview', end: true },
  { to: '/dashboard/menu', icon: HiOutlineClipboardList, label: 'Menu' },
  { to: '/dashboard/agent', icon: HiOutlineChatAlt2, label: 'AI Agent' },
  { to: '/dashboard/trends', icon: HiOutlineTrendingUp, label: 'Trends' },
  { to: '/dashboard/ar', icon: HiOutlineCube, label: 'AR Preview' },
  { to: '/dashboard/orders', icon: HiOutlineViewGrid, label: 'Orders / KDS' },
  { to: '/dashboard/settings', icon: HiOutlineCog, label: 'Settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-navy-dark flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 flex flex-col backdrop-blur-xl bg-white/[0.03] border-r border-white/10 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header / Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center group">
            <svg
              className="w-8 h-8 mr-2.5 text-emerald transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 2v6" />
              <path d="M9 2v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2" />
              <path d="M12 8v8" />
              <path d="M12 11h4a1 1 0 0 1 1 1v2" />
              <circle cx="17" cy="15" r="1.5" className="fill-emerald stroke-emerald" />
              <path d="M12 14H8a1 1 0 0 0 -1 1v2" />
              <circle cx="7" cy="18" r="1.5" className="fill-emerald stroke-emerald" />
              <circle cx="12" cy="17" r="1.5" className="fill-emerald stroke-emerald" />
            </svg>
            <span className="font-extrabold text-xl tracking-tight select-none">
              <span className="text-white">Smart</span>
              <span className="text-emerald">Dine</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald/10 text-emerald border border-emerald/20 shadow-sm shadow-emerald/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
                }`
              }
            >
              <link.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* User Card + Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 mb-3">
            <div className="w-9 h-9 rounded-full bg-emerald/20 border border-emerald/30 flex items-center justify-center text-emerald font-bold text-sm flex-shrink-0">
              {user?.restaurant_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {user?.restaurant_name || 'Restaurant'}
              </p>
              <p className="text-[11px] text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
          >
            <HiOutlineLogout className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen lg:min-w-0">
        {/* Top Bar (mobile) */}
        <header className="sticky top-0 z-30 lg:hidden bg-navy-dark/90 backdrop-blur-lg border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          </button>
          <span className="font-extrabold text-lg tracking-tight select-none">
            <span className="text-white">Smart</span>
            <span className="text-emerald">Dine</span>
          </span>
          <div className="w-8" /> {/* spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
