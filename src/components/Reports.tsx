import React, { useState } from 'react';
import { Calendar, PieChart, TrendingUp, BarChart3 } from 'lucide-react';
import { CashBook, Transaction } from '../types';

interface ReportsProps {
  cashBook: CashBook;
  transactions: Transaction[];
}

export default function Reports({ cashBook, transactions }: ReportsProps) {
  const [activeTab, setActiveTab] = useState('harian');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [selectedYear, setSelectedYear] = useState('2024');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateStats = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense,
      transactionCount: transactions.length
    };
  };

  const stats = calculateStats();

  const tabs = [
    { id: 'harian', name: 'Harian', icon: Calendar },
    { id: 'bulanan', name: 'Bulanan', icon: PieChart },
    { id: 'tahunan', name: 'Tahunan', icon: TrendingUp }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'harian':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Laporan Harian</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Grafik donut akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        );
      case 'bulanan':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Laporan Bulanan</h3>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Line chart akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        );
      case 'tahunan':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Laporan Tahunan</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Bar chart akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laporan Keuangan</h1>
            <p className="text-gray-600 dark:text-gray-400">{cashBook.name}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Total Pemasukan</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(stats.totalIncome)}</p>
            </div>
            <div className="h-12 w-12 bg-green-200 dark:bg-green-800 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">Total Pengeluaran</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(stats.totalExpense)}</p>
            </div>
            <div className="h-12 w-12 bg-red-200 dark:bg-red-800 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400 rotate-180" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Saldo Bersih</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(stats.netBalance)}</p>
            </div>
            <div className="h-12 w-12 bg-blue-200 dark:bg-blue-800 rounded-xl flex items-center justify-center">
              <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Total Transaksi</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.transactionCount}</p>
            </div>
            <div className="h-12 w-12 bg-purple-200 dark:bg-purple-800 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}