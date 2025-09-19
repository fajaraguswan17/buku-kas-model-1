import React, { useState } from 'react';
import { Plus, Minus, ArrowRightLeft, Search, Filter, Download, FileText, Edit3, Trash2, Eye, ChevronUp, ChevronDown } from 'lucide-react';
import { CashBook, Transaction } from '../types';

interface DashboardProps {
  cashBook: CashBook;
  transactions: Transaction[];
  onTransactionClick: (type: 'income' | 'expense' | 'transfer') => void;
  isDarkMode: boolean;
}

export default function Dashboard({ cashBook, transactions, onTransactionClick, isDarkMode }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate statistics
  const currentMonthTransactions = transactions.filter(t => 
    t.date.startsWith(selectedMonth)
  );

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netChange = totalIncome - totalExpense;
  const changePercentage = netChange > 0 ? '+12.5%' : '-5.2%';

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = (type: 'excel' | 'pdf') => {
    alert(`Export ${type.toUpperCase()} akan segera diunduh!`);
  };

  const handleTransactionAction = (action: string, transaction: Transaction) => {
    switch (action) {
      case 'view':
        alert(`Melihat detail transaksi: ${transaction.description}`);
        break;
      case 'edit':
        alert(`Edit transaksi: ${transaction.description}`);
        break;
      case 'delete':
        if (confirm(`Hapus transaksi "${transaction.description}"?`)) {
          alert('Transaksi berhasil dihapus!');
        }
        break;
      case 'file':
        alert(`Membuka file lampiran untuk: ${transaction.description}`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-lg font-medium opacity-90">Saldo {cashBook.name}</h2>
              <span className="text-sm opacity-75 bg-white/10 px-2 py-1 rounded-full">
                {new Date(selectedMonth + '-01').toLocaleDateString('id-ID', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">{formatCurrency(cashBook.balance)}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                netChange >= 0 ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
              }`}>
                {changePercentage} dari bulan lalu
              </span>
            </div>
          </div>
          <div className="text-4xl opacity-80">{cashBook.icon}</div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <button
            onClick={() => onTransactionClick('income')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Pemasukan</span>
          </button>
          <button
            onClick={() => onTransactionClick('expense')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Minus className="h-4 w-4" />
            <span>Pengeluaran</span>
          </button>
          <button
            onClick={() => onTransactionClick('transfer')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span>Transfer</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl p-6 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Pemasukan Bulan Ini</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <Plus className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">Pengeluaran Bulan Ini</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(totalExpense)}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
              <Minus className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Saldo Akhir</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(cashBook.balance)}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className={`rounded-xl p-6 border transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="2024-03">Maret 2024</option>
              <option value="2024-02">Februari 2024</option>
              <option value="2024-01">Januari 2024</option>
            </select>
            
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <FileText className="h-4 w-4" />
              <span>Excel</span>
            </button>
            
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`rounded-xl border transition-colors duration-300 overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Riwayat Transaksi
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('type')}
                    className={`flex items-center space-x-1 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>Tipe</span>
                    {sortField === 'type' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className={`flex items-center space-x-1 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>Tanggal</span>
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('category')}
                    className={`flex items-center space-x-1 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>Kategori</span>
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Deskripsi
                  </span>
                </th>
                <th className="px-6 py-3 text-right">
                  <button
                    onClick={() => handleSort('amount')}
                    className={`flex items-center space-x-1 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>Nominal</span>
                    {sortField === 'amount' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-right">
                  <span className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Saldo
                  </span>
                </th>
                <th className="px-6 py-3 text-center">
                  <span className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Aksi
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className={`px-6 py-8 text-center transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {searchTerm ? 'Tidak ada transaksi yang sesuai dengan pencarian' : 'Belum ada transaksi'}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className={`transition-colors duration-200 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : transaction.type === 'expense'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {transaction.type === 'income' ? 'Masuk' : transaction.type === 'expense' ? 'Keluar' : 'Transfer'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {formatDate(transaction.date)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {transaction.category}
                    </td>
                    <td className={`px-6 py-4 text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      <div className="max-w-xs">
                        <div className="truncate">{transaction.description}</div>
                        <div className={`text-xs mt-1 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          Dicatat oleh: {transaction.createdBy}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className={
                        transaction.type === 'income' 
                          ? 'text-green-600 dark:text-green-400'
                          : transaction.type === 'expense'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }>
                        {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {formatCurrency(transaction.balance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex items-center justify-center space-x-1">
                        {transaction.hasFile && (
                          <button
                            onClick={() => handleTransactionAction('file', transaction)}
                            className={`p-1 rounded transition-colors duration-200 ${
                              isDarkMode 
                                ? 'text-gray-400 hover:text-blue-400' 
                                : 'text-gray-400 hover:text-blue-600'
                            }`}
                            title="Lihat file"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleTransactionAction('view', transaction)}
                          className={`p-1 rounded transition-colors duration-200 ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-blue-400' 
                              : 'text-gray-400 hover:text-blue-600'
                          }`}
                          title="Lihat detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTransactionAction('edit', transaction)}
                          className={`p-1 rounded transition-colors duration-200 ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-blue-400' 
                              : 'text-gray-400 hover:text-blue-600'
                          }`}
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTransactionAction('delete', transaction)}
                          className={`p-1 rounded transition-colors duration-200 ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-red-400' 
                              : 'text-gray-400 hover:text-red-600'
                          }`}
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}