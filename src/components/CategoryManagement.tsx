import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Tag, Save, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'transfer';
  color: string;
  icon: string;
  isDefault: boolean;
}

export default function CategoryManagement() {
  const [activeTab, setActiveTab] = useState<'income' | 'expense' | 'transfer'>('income');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#3b82f6',
    icon: '📝'
  });

  // Default categories
  const [categories, setCategories] = useState<Category[]>([
    // Income categories
    { id: '1', name: 'Gaji', type: 'income', color: '#22c55e', icon: '💰', isDefault: true },
    { id: '2', name: 'Bonus', type: 'income', color: '#10b981', icon: '🎁', isDefault: true },
    { id: '3', name: 'Freelance', type: 'income', color: '#059669', icon: '💻', isDefault: true },
    { id: '4', name: 'Investasi', type: 'income', color: '#047857', icon: '📈', isDefault: true },
    { id: '5', name: 'Dividen', type: 'income', color: '#065f46', icon: '💎', isDefault: true },
    { id: '6', name: 'Pemasukan Lain-Lainnya', type: 'income', color: '#064e3b', icon: '💵', isDefault: true },

    // Expense categories
    { id: '7', name: 'Makanan', type: 'expense', color: '#ef4444', icon: '🍽️', isDefault: true },
    { id: '8', name: 'Transport', type: 'expense', color: '#dc2626', icon: '🚗', isDefault: true },
    { id: '9', name: 'Belanja', type: 'expense', color: '#b91c1c', icon: '🛒', isDefault: true },
    { id: '10', name: 'Tagihan', type: 'expense', color: '#991b1b', icon: '📄', isDefault: true },
    { id: '11', name: 'Hiburan', type: 'expense', color: '#7f1d1d', icon: '🎬', isDefault: true },
    { id: '12', name: 'Kesehatan', type: 'expense', color: '#7c2d12', icon: '🏥', isDefault: true },
    { id: '13', name: 'Pendidikan', type: 'expense', color: '#78350f', icon: '📚', isDefault: true },
    { id: '14', name: 'Pengeluaran Lain-Lainnya', type: 'expense', color: '#713f12', icon: '💸', isDefault: true },

    // Transfer categories
    { id: '15', name: 'Transfer Antar Kas', type: 'transfer', color: '#3b82f6', icon: '🔄', isDefault: true },
    { id: '16', name: 'Transfer Bank', type: 'transfer', color: '#2563eb', icon: '🏦', isDefault: true },
    { id: '17', name: 'Transfer Digital', type: 'transfer', color: '#1d4ed8', icon: '📱', isDefault: true }
  ]);

  const colorOptions = [
    '#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ];

  const iconOptions = [
    '💰', '🎁', '💻', '📈', '💎', '💵', '🍽️', '🚗', '🛒', '📄',
    '🎬', '🏥', '📚', '💸', '🔄', '🏦', '📱', '📝', '🎯', '⭐'
  ];

  const tabs = [
    { id: 'income' as const, name: 'Pemasukan', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { id: 'expense' as const, name: 'Pengeluaran', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { id: 'transfer' as const, name: 'Transfer', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' }
  ];

  const filteredCategories = categories.filter(cat => cat.type === activeTab);

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      alert('Nama kategori harus diisi');
      return;
    }

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      type: activeTab,
      color: newCategory.color,
      icon: newCategory.icon,
      isDefault: false
    };

    setCategories(prev => [...prev, category]);
    setNewCategory({ name: '', color: '#3b82f6', icon: '📝' });
    setShowAddForm(false);
    alert(`Kategori "${category.name}" berhasil ditambahkan!`);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      color: category.color,
      icon: category.icon
    });
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategory.name.trim()) {
      alert('Nama kategori harus diisi');
      return;
    }

    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, name: newCategory.name.trim(), color: newCategory.color, icon: newCategory.icon }
        : cat
    ));

    setEditingCategory(null);
    setNewCategory({ name: '', color: '#3b82f6', icon: '📝' });
    alert(`Kategori "${newCategory.name}" berhasil diperbarui!`);
  };

  const handleDeleteCategory = (category: Category) => {
    if (category.isDefault) {
      alert('Kategori default tidak dapat dihapus');
      return;
    }

    if (confirm(`Hapus kategori "${category.name}"?`)) {
      setCategories(prev => prev.filter(cat => cat.id !== category.id));
      alert(`Kategori "${category.name}" berhasil dihapus!`);
    }
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setShowAddForm(false);
    setNewCategory({ name: '', color: '#3b82f6', icon: '📝' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Kategori</h1>
            <p className="text-gray-600 dark:text-gray-400">Atur kategori untuk setiap tipe transaksi</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? `border-current ${tab.color}`
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.name}</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                  {filteredCategories.length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Kategori {tabs.find(t => t.id === activeTab)?.name}
            </h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Kategori</span>
            </button>
          </div>

          {/* Add/Edit Form */}
          {(showAddForm || editingCategory) && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Masukkan nama kategori"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Warna
                  </label>
                  <div className="flex space-x-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newCategory.color === color ? 'border-gray-400' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                        className={`p-2 text-lg border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 ${
                          newCategory.icon === icon 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingCategory ? 'Update' : 'Simpan'}</span>
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                  <span>Batal</span>
                </button>
              </div>
            </div>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      <span className="text-lg">{category.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                      {category.isDefault && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">Default</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    {!category.isDefault && (
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-8">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Belum ada kategori untuk {tabs.find(t => t.id === activeTab)?.name.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}