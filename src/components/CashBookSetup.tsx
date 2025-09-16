import React, { useState } from 'react';
import { Plus, BookOpen, Trash2, Edit3, Eye, Grid3X3, List, X } from 'lucide-react';
import { CashBook } from '../types';

interface CashBookSetupProps {
  cashBooks: CashBook[];
}

export default function CashBookSetup({ cashBooks }: CashBookSetupProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCashBook, setNewCashBook] = useState({
    name: '',
    initialBalance: 0,
    description: '',
    color: 'blue' as const,
    icon: '💰'
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const templates = [
    {
      name: 'Tabungan Liburan',
      icon: '🏖️',
      color: 'blue' as const,
      initialBalance: 0,
      description: 'Dana untuk liburan dan rekreasi'
    },
    {
      name: 'Dana Darurat',
      icon: '🚨',
      color: 'red' as const,
      initialBalance: 0,
      description: 'Dana untuk keadaan darurat'
    },
    {
      name: 'Kas Usaha',
      icon: '🏪',
      color: 'green' as const,
      initialBalance: 0,
      description: 'Modal dan operasional usaha'
    },
    {
      name: 'Investasi',
      icon: '📈',
      color: 'purple' as const,
      initialBalance: 0,
      description: 'Dana untuk investasi jangka panjang'
    }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Biru', class: 'bg-blue-500' },
    { value: 'green', label: 'Hijau', class: 'bg-green-500' },
    { value: 'red', label: 'Merah', class: 'bg-red-500' },
    { value: 'purple', label: 'Ungu', class: 'bg-purple-500' },
    { value: 'yellow', label: 'Kuning', class: 'bg-yellow-500' }
  ];

  const iconOptions = ['💰', '🎓', '🏠', '🚗', '🏪', '📈', '🏖️', '🚨', '💳', '🎯'];

  const handleCreateCashBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newCashBook.name.trim()) {
      alert('Nama buku kas harus diisi');
      return;
    }
    
    // Create new cash book object
    const cashBookData = {
      id: `cashbook-${Date.now()}`,
      name: newCashBook.name.trim(),
      balance: newCashBook.initialBalance,
      color: newCashBook.color,
      icon: newCashBook.icon,
      description: newCashBook.description.trim() || `Buku kas untuk ${newCashBook.name}`
    };
    
    console.log('Creating cash book:', newCashBook);
    console.log('Cash book data:', cashBookData);
    
    // Here you would typically add the cash book to your state or database
    // For now, we'll show a success message
    alert(`Buku kas "${cashBookData.name}" berhasil dibuat dengan saldo awal ${formatCurrency(cashBookData.balance)}!`);
    
    setShowCreateForm(false);
    
    // Reset form
    setNewCashBook({
      name: '',
      initialBalance: 0,
      description: '',
      color: 'blue',
      icon: '💰'
    });
  };

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setNewCashBook({
      name: template.name,
      initialBalance: template.initialBalance,
      description: template.description,
      color: template.color,
      icon: template.icon
    });
    setShowCreateForm(true);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setup Buku Kas</h1>
              <p className="text-gray-600 dark:text-gray-400">Kelola dan buat buku kas baru</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Create Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Buat Buku Kas Baru</h2>
            <p className="text-green-100">Mulai kelola keuangan dengan membuat buku kas baru</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Buat Sekarang</span>
          </button>
        </div>
      </div>

      {/* Template Populer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template Populer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleTemplateSelect(template)}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200 text-left"
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <div className="font-medium text-gray-900 dark:text-white mb-1">{template.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Existing Cash Books */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Buku Kas Saya</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{cashBooks.length} buku kas</span>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cashBooks.map((cashBook) => (
              <div key={cashBook.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">{cashBook.icon}</div>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{cashBook.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{cashBook.description}</p>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(cashBook.balance)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {cashBooks.map((cashBook) => (
              <div key={cashBook.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{cashBook.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{cashBook.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cashBook.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(cashBook.balance)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Buat Buku Kas Baru</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateCashBook} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Buku Kas</label>
                <input
                  type="text"
                  value={newCashBook.name}
                  onChange={(e) => setNewCashBook(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Masukkan nama buku kas"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Saldo Awal</label>
                <input
                  type="number"
                  value={newCashBook.initialBalance}
                  onChange={(e) => setNewCashBook(prev => ({ ...prev, initialBalance: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deskripsi</label>
                <textarea
                  value={newCashBook.description}
                  onChange={(e) => setNewCashBook(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows={3}
                  placeholder="Deskripsi singkat tentang buku kas ini"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warna</label>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNewCashBook(prev => ({ ...prev, color: color.value as any }))}
                      className={`w-8 h-8 rounded-full ${color.class} ${
                        newCashBook.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon</label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewCashBook(prev => ({ ...prev, icon }))}
                      className={`p-2 text-xl border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                        newCashBook.icon === icon 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Buat Buku Kas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}