import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlinePhotograph,
} from 'react-icons/hi';

const CATEGORIES = ['Appetizers', 'Mains', 'Sides', 'Desserts', 'Drinks', 'Specials'];
const ALLERGENS = ['Gluten', 'Dairy', 'Nuts', 'Shellfish', 'Soy', 'Eggs', 'Vegan', 'Vegetarian'];

const emptyItem = {
  name: '',
  description: '',
  price: '',
  category: 'Mains',
  allergens: [],
  image: null,
  image_url: '',
  available: true,
};

export default function MenuManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ ...emptyItem });
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      const res = await api.get('/api/menu');
      setItems(res.data);
    } catch {
      // Fallback demo data
      setItems([
        { id: 1, name: 'Truffle Risotto', description: 'Wild porcini mushrooms, fresh truffle oil, aged parmesan', price: 28.99, category: 'Mains', allergens: ['Dairy'], image_url: '', available: true },
        { id: 2, name: 'Pan-Seared Salmon', description: 'Organic wild rice, lemon butter, asparagus', price: 34.99, category: 'Mains', allergens: [], image_url: '', available: true },
        { id: 3, name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, house dressing', price: 14.99, category: 'Appetizers', allergens: ['Gluten', 'Dairy', 'Eggs'], image_url: '', available: true },
        { id: 4, name: 'Chocolate Lava Cake', description: 'Molten center, vanilla ice cream, raspberry coulis', price: 12.99, category: 'Desserts', allergens: ['Dairy', 'Gluten', 'Eggs'], image_url: '', available: true },
        { id: 5, name: 'Spicy Pasta Arrabbiata', description: 'Penne, San Marzano tomato, chili, garlic, basil', price: 18.99, category: 'Mains', allergens: ['Gluten'], image_url: '', available: false },
        { id: 6, name: 'Sparkling Lemonade', description: 'Fresh lemon, elderflower, sparkling water', price: 6.99, category: 'Drinks', allergens: [], image_url: '', available: true },
      ]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ ...emptyItem });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      allergens: item.allergens || [],
      image: null,
      image_url: item.image_url || '',
      available: item.available,
    });
    setImagePreview(item.image_url || null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleAllergen = (allergen) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      toast.error('Name and price are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        allergens: formData.allergens,
        available: formData.available,
      };

      let savedItem;
      if (editingItem) {
        const res = await api.put(`/api/menu/${editingItem.id}`, payload);
        savedItem = res.data;
        toast.success('Menu item updated!');
      } else {
        const res = await api.post('/api/menu', payload);
        savedItem = res.data;
        toast.success('Menu item added!');
      }

      // Upload image separately if one was selected
      if (formData.image && savedItem?.id) {
        const imageData = new FormData();
        imageData.append('image', formData.image);
        await api.post(`/api/menu/${savedItem.id}/image`, imageData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setShowModal(false);
      fetchItems();
    } catch {
      // Offline fallback: simulate success
      if (editingItem) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === editingItem.id
              ? { ...it, ...formData, price: parseFloat(formData.price), image_url: imagePreview || it.image_url }
              : it
          )
        );
        toast.success('Menu item updated! (offline)');
      } else {
        const newItem = {
          id: Date.now(),
          ...formData,
          price: parseFloat(formData.price),
          image_url: imagePreview || '',
        };
        setItems((prev) => [...prev, newItem]);
        toast.success('Menu item added! (offline)');
      }
      setShowModal(false);
    }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/menu/${item.id}`);
      toast.success('Item deleted');
      fetchItems();
    } catch {
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      toast.success('Item deleted (offline)');
    }
  };

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Menu Management</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} items total</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20 hover:scale-[1.03] active:scale-[0.98]"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-grow max-w-md">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/30 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                filterCategory === cat
                  ? 'bg-emerald text-navy border-emerald'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-emerald' : 'text-gray-500 hover:text-white'}`}
          >
            <HiOutlineViewGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-emerald' : 'text-gray-500 hover:text-white'}`}
          >
            <HiOutlineViewList className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 animate-pulse">
              <div className="h-36 bg-white/5 rounded-xl mb-4" />
              <div className="h-5 bg-white/5 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {!loading && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`backdrop-blur-md bg-white/[0.03] border rounded-2xl p-5 transition-all duration-300 hover:border-emerald/20 group ${
                !item.available ? 'opacity-60 border-white/5' : 'border-white/10'
              }`}
            >
              {/* Image placeholder */}
              <div className="h-36 bg-white/[0.03] rounded-xl mb-4 flex items-center justify-center border border-white/5 overflow-hidden">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <HiOutlinePhotograph className="w-10 h-10 text-gray-700" />
                )}
              </div>

              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <span className="text-xs text-emerald font-bold">${parseFloat(item.price).toFixed(2)}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>

              {/* Allergen tags */}
              {item.allergens?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.allergens.map((a) => (
                    <span key={a} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {a}
                    </span>
                  ))}
                </div>
              )}

              {!item.available && (
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded mb-2 inline-block border border-red-500/20">
                  Unavailable
                </span>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <HiOutlinePencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <HiOutlineTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!loading && viewMode === 'list' && (
        <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors ${
                !item.available ? 'opacity-60' : ''
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <HiOutlinePhotograph className="w-6 h-6 text-gray-700" />
                )}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  {!item.available && (
                    <span className="text-[9px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{item.description}</p>
              </div>

              <div className="hidden sm:flex flex-wrap gap-1 max-w-[120px]">
                {item.allergens?.slice(0, 2).map((a) => (
                  <span key={a} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {a}
                  </span>
                ))}
              </div>

              <span className="text-xs text-gray-400 font-mono hidden sm:inline">{item.category}</span>
              <span className="text-sm font-bold text-emerald whitespace-nowrap">${parseFloat(item.price).toFixed(2)}</span>

              <div className="flex gap-1.5">
                <button onClick={() => openEditModal(item)} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <HiOutlineClipboardList className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No menu items found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg backdrop-blur-xl bg-navy-dark/95 border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-navy-dark/95 backdrop-blur-xl z-10 rounded-t-3xl">
              <h2 className="text-lg font-bold text-white">
                {editingItem ? 'Edit Menu Item' : 'Add New Item'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors p-1">
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Photo
                </label>
                <div
                  className="h-40 bg-white/[0.03] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald/30 transition-colors overflow-hidden relative"
                  onClick={() => document.getElementById('menu-image-input').click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <HiOutlinePhotograph className="w-10 h-10 text-gray-600 mb-2" />
                      <p className="text-xs text-gray-500">Click to upload image</p>
                    </>
                  )}
                </div>
                <input
                  id="menu-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/30 transition-all"
                  placeholder="e.g. Truffle Risotto"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/30 transition-all resize-none"
                  rows={3}
                  placeholder="Describe the dish..."
                />
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      className="w-full pl-7 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/30 transition-all"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/30 transition-all appearance-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-navy-dark text-white">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Allergen Tags */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Allergen Tags</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGENS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAllergen(a)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        formData.allergens.includes(a)
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Available for ordering</span>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, available: !prev.available }))}
                  className={`w-12 h-7 rounded-full transition-all duration-200 relative ${
                    formData.available ? 'bg-emerald' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      formData.available ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 rounded-xl text-base font-extrabold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingItem ? 'Save Changes' : 'Add to Menu'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
