import React from 'react';
import { Search, Bell, Menu, Sun, Moon, TrendingUp } from 'lucide-react';
import { CashBook } from '../types';

interface HeaderProps {
  cashBook: CashBook;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ 
  cashBook, 
  isDarkMode, 
  setIsDarkMode, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: HeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`transition-colors duration-300 shadow-sm border-b px-4 lg:px-8 py-4 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Cash Book Info */}
        <div className="flex-1"></div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'text-yellow-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <button className={`relative p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}>
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">FA</span>
            </div>
            <div className={`hidden md:block ml-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <p className="text-sm font-medium">Fajar Aguswan</p>
              <p className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}