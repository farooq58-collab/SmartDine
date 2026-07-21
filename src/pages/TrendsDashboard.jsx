import React, { useState, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import {
  HiOutlineSearch,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineLocationMarker,
} from 'react-icons/hi';

function TrendCard({ trend, index }) {
  const isPositive = (trend.growth || trend.change || 0) >= 0;
  const growthValue = trend.growth || trend.change || Math.floor(Math.random() * 40) - 5;

  return (
    <div
      className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-emerald/20 transition-all duration-300 group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-grow">
          <h3 className="text-sm font-bold text-white group-hover:text-emerald transition-colors">
            {trend.name || trend.topic || trend.query}
          </h3>
          {trend.category && (
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1 inline-block">
              {trend.category}
            </span>
          )}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
          isPositive
            ? 'bg-emerald/10 text-emerald border border-emerald/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {isPositive ? (
            <HiOutlineTrendingUp className="w-3.5 h-3.5" />
          ) : (
            <HiOutlineTrendingDown className="w-3.5 h-3.5" />
          )}
          {isPositive ? '+' : ''}{growthValue}%
        </div>
      </div>

      {trend.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{trend.description}</p>
      )}

      {/* Sentiment Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sentiment</span>
          <span className="text-[10px] font-bold text-gray-400">
            {trend.sentiment || (isPositive ? 'Positive' : 'Mixed')}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isPositive ? 'bg-emerald' : 'bg-orange-400'
            }`}
            style={{ width: `${Math.min(Math.abs(growthValue) * 2 + 30, 95)}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      {trend.tags && trend.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {trend.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Mini chart SVG */}
      <div className="mt-3">
        <svg viewBox="0 0 120 30" className="w-full h-8">
          <defs>
            <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPositive ? '#2ecc8a' : '#f97316'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#2ecc8a' : '#f97316'} stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            // Generate random sparkline points
            const points = [];
            const seed = (trend.name || '').length + index;
            for (let i = 0; i <= 12; i++) {
              const x = (i / 12) * 120;
              const y = 15 + Math.sin(i * 0.8 + seed) * 8 + (isPositive ? -i * 0.5 : i * 0.3);
              points.push(`${x},${Math.max(2, Math.min(28, y))}`);
            }
            const line = points.join(' ');
            const area = `0,30 ${line} 120,30`;
            return (
              <>
                <polygon points={area} fill={`url(#grad-${index})`} />
                <polyline
                  points={line}
                  fill="none"
                  stroke={isPositive ? '#2ecc8a' : '#f97316'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}

export default function TrendsDashboard() {
  const [city, setCity] = useState('');
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [summary, setSummary] = useState('');

  const fetchTrends = useCallback(async (searchCity) => {
    if (!searchCity.trim()) {
      toast.error('Please enter a city name');
      return;
    }
    setLoading(true);
    setSearched(true);

    try {
      const res = await api.get(`/api/trends/${encodeURIComponent(searchCity.trim())}`);
      setTrends(res.data.trends || res.data || []);
      setSummary(res.data.summary || '');
    } catch {
      // Fallback demo data
      const demoTrends = [
        { name: 'Plant-Based Bowls', category: 'Health Food', growth: 34, sentiment: 'Very Positive', description: 'Grain bowls with plant proteins are surging in demand across urban restaurants.', tags: ['vegan', 'healthy', 'instagram'] },
        { name: 'Truffle Everything', category: 'Premium', growth: 28, sentiment: 'Positive', description: 'Truffle oil, truffle fries, truffle pizza — the luxury ingredient continues to trend.', tags: ['luxury', 'umami', 'gourmet'] },
        { name: 'Korean Fried Chicken', category: 'Street Food', growth: 22, sentiment: 'Positive', description: 'Double-fried Korean chicken with gochujang glaze is dominating social media.', tags: ['korean', 'crispy', 'social-media'] },
        { name: 'Smash Burgers', category: 'Fast Casual', growth: 19, sentiment: 'Positive', description: 'Thin-patty smash burgers with crispy edges continue their upward trajectory.', tags: ['burgers', 'casual', 'popular'] },
        { name: 'Craft Mocktails', category: 'Beverages', growth: 41, sentiment: 'Very Positive', description: 'Non-alcoholic craft cocktails are the fastest growing beverage segment.', tags: ['sober-curious', 'drinks', 'trendy'] },
        { name: 'Birria Tacos', category: 'Mexican', growth: -3, sentiment: 'Declining', description: 'After a massive surge, birria taco interest is starting to plateau in most markets.', tags: ['mexican', 'taco', 'declining'] },
        { name: 'Matcha Desserts', category: 'Desserts', growth: 31, sentiment: 'Positive', description: 'Matcha-flavored ice cream, cakes, and lattes continue to gain mainstream appeal.', tags: ['japanese', 'dessert', 'green-tea'] },
        { name: 'Nashville Hot Chicken', category: 'Southern', growth: 15, sentiment: 'Positive', description: 'Spicy Nashville-style chicken sandwiches remain strong in the comfort food category.', tags: ['spicy', 'southern', 'sandwich'] },
      ];
      setTrends(demoTrends);
      setSummary(`Food trends analysis for ${searchCity}. Data shows strong growth in plant-based and premium categories.`);
      toast.success('Showing demo trend data');
    }
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTrends(city);
  };

  const popularCities = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Austin'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Food Trends Intelligence</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time food trend data powered by AI market analysis</p>
      </div>

      {/* Search */}
      <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city (e.g., New York, London, Dubai)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/30 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
            ) : (
              <HiOutlineSearch className="w-5 h-5" />
            )}
            Analyze Trends
          </button>
        </form>

        {/* Quick city buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider self-center mr-2">
            Popular:
          </span>
          {popularCities.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCity(c);
                fetchTrends(c);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="h-4 bg-white/5 rounded w-2/3" />
                <div className="h-6 bg-white/5 rounded w-16" />
              </div>
              <div className="h-3 bg-white/5 rounded w-full mb-2" />
              <div className="h-3 bg-white/5 rounded w-4/5 mb-4" />
              <div className="h-1.5 bg-white/5 rounded-full mb-3" />
              <div className="h-8 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {!loading && summary && (
        <div className="backdrop-blur-md bg-emerald/5 border border-emerald/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald flex-shrink-0">
              <HiOutlineTrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald mb-1">AI Trend Summary</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Trend Cards Grid */}
      {!loading && trends.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {trends.map((trend, index) => (
            <TrendCard key={index} trend={trend} index={index} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && searched && trends.length === 0 && (
        <div className="text-center py-16">
          <HiOutlineTrendingUp className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No trend data found for this city</p>
          <p className="text-gray-600 text-xs mt-1">Try a different city or check back later</p>
        </div>
      )}

      {/* Initial state */}
      {!loading && !searched && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center mx-auto mb-4">
            <HiOutlineTrendingUp className="w-10 h-10 text-emerald" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Discover Food Trends</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Enter your city above to get real-time food trend intelligence. See what's trending, analyze sentiment, and stay ahead of the competition.
          </p>
        </div>
      )}
    </div>
  );
}
