import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { CashBook } from '../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense' | 'transfer';
  cashBook: CashBook;
  isDarkMode: boolean;
}

interface TransactionFormData {
  type: 'income' | 'expense' | 'transfer';
  date: string;
  time: string;
  amount: number;
  category: string;
  description: string;
  file?: File;
}

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  type, 
  cashBook,
  isDarkMode 
}: TransactionModalProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    type: type,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    amount: 0,
    category: '',
    description: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFileUpload, setShowFileUpload] = useState(false);

  // Update form data when type changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: type,
      category: '' // Reset category when type changes
    }));
  }, [type]);

  // Categories based on type
  const incomeCategories = [
    'Gaji', 'Bonus', 'Freelance', 'Investasi', 'Dividen', 'Pemasukan Lain-Lainnya'
  ];

  const expenseCategories = [
    'Makanan', 'Transport', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 
    'Pendidikan', 'Pengeluaran Lain-Lainnya'
  ];

  const transferCategories = [
    'Transfer Antar Kas', 'Transfer Bank', 'Transfer Digital'
  ];

  const getCategories = () => {
    switch (formData.type) {
      case 'income': return incomeCategories;
      case 'expense': return expenseCategories;
      case 'transfer': return transferCategories;
      default: return [];
    }
  };

  const getTypeConfig = () => {
    switch (formData.type) {
      case 'income':
        return {
          title: 'Tambah Pemasukan',
          subtitle: 'Catat pendapatan baru',
          color: 'green',
          bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
          buttonColor: 'bg-green-600 hover:bg-green-700'
        };
      case 'expense':
        return {
          title: 'Tambah Pengeluaran',
          subtitle: 'Catat pengeluaran baru',
          color: 'red',
          bgColor: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
      case 'transfer':
        return {
          title: 'Tambah Transfer',
          subtitle: 'Catat transfer dana',
          color: 'blue',
          bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
          buttonColor: 'bg-blue-600 hover:bg-blue-700'
        };
      default:
        return {
          title: 'Tambah Transaksi',
          subtitle: 'Catat transaksi baru',
          color: 'gray',
          bgColor: 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20',
          buttonColor: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const handleInputChange = (field: keyof TransactionFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTypeChange = (newType: 'income' | 'expense' | 'transfer') => {
    setFormData(prev => ({
      ...prev,
      type: newType,
      category: '' // Reset category when type changes
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          file: 'File harus berformat PDF, JPG, atau PNG'
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          file: 'Ukuran file maksimal 5MB'
        }));
        return;
      }

      setSelectedFile(file);
      setErrors(prev => ({
        ...prev,
        file: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'Tanggal harus diisi';
    if (!formData.time) newErrors.time = 'Waktu harus diisi';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Nominal harus lebih dari 0';
    if (!formData.category) newErrors.category = 'Kategori harus dipilih';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi harus diisi';
    if (formData.description.length > 300) newErrors.description = 'Deskripsi maksimal 300 karakter';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Transaction submitted:', {
        ...formData,
        file: selectedFile
      });
      
      // Show success notification
      alert('Transaksi berhasil disimpan!');
      
      onClose();
      // Reset form
      setFormData({
        type: type,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        amount: 0,
        category: '',
        description: '',
      });
      setSelectedFile(null);
      setErrors({});
      setShowFileUpload(false);
    }
  };

  if (!isOpen) return null;

  const typeConfig = getTypeConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Minimalist Header */}
        <div className={`p-6 border-b transition-colors duration-300 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Tambah Transaksi
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Transaction Type Pills */}
          <div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`flex-1 p-3 rounded-lg transition-all duration-200 ${
                  formData.type === 'income'
                    ? 'bg-white text-green-700 shadow-md border-2 border-green-200 dark:bg-gray-700 dark:text-green-400 dark:border-green-600'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm">💰</span>
                  <span className="font-medium">Masuk</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`flex-1 p-3 rounded-lg transition-all duration-200 ${
                  formData.type === 'expense'
                    ? 'bg-white text-red-700 shadow-md border-2 border-red-200 dark:bg-gray-700 dark:text-red-400 dark:border-red-600'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm">💸</span>
                  <span className="font-medium">Keluar</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('transfer')}
                className={`flex-1 p-3 rounded-lg transition-all duration-200 ${
                  formData.type === 'transfer'
                    ? 'bg-white text-blue-700 shadow-md border-2 border-blue-200 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-600'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm">🔄</span>
                  <span className="font-medium">Transfer</span>
                </div>
              </button>
            </div>
          </div>

          {/* Large Amount Input */}
          <div>
            <input
              type="number"
              min="0"
              step="1000"
              value={formData.amount || ''}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className={`w-full text-2xl text-center font-bold py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                errors.amount 
                  ? 'border-red-500' 
                  : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                errors.category 
                  ? 'border-red-500' 
                  : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="">Pilih kategori...</option>
              {getCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Deskripsi transaksi..."
              maxLength={300}
              rows={2}
              className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200 ${
                errors.description 
                  ? 'border-red-500' 
                  : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
              <p className={`text-xs ml-auto transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {formData.description.length}/300
              </p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  errors.date 
                    ? 'border-red-500' 
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  errors.time 
                    ? 'border-red-500' 
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* File Upload (Collapsed by default) */}
          <div>
            <button
              type="button"
              onClick={() => setShowFileUpload(!showFileUpload)}
              className={`text-sm transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {showFileUpload ? '▼ Sembunyikan upload file' : '▶ Tambah file lampiran'}
            </button>
            
            {showFileUpload && (
              <div className={`mt-3 border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-600 hover:border-blue-500' 
                  : 'border-gray-300 hover:border-blue-400'
              }`}>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className={`h-6 w-6 mx-auto mb-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {selectedFile ? selectedFile.name : 'Klik untuk upload file'}
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </label>
              </div>
            )}
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 border rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-3 text-white rounded-lg transition-colors duration-200 ${typeConfig.buttonColor}`}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}