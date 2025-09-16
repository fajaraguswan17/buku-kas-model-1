import React from 'react';
import { Bell, Search } from 'lucide-react';

interface TopBarProps {
  userName: string;
  balance: number;
}

export default function TopBar({ userName, balance }: TopBarProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari transaksi..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-600">Halo, {userName}</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(balance)}
            </p>
          </div>

          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}