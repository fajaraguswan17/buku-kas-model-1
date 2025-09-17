import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, BarChart3, Settings, Plus } from 'lucide-react';
import { CashBook } from '../types';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeCashBook: string;
  setActiveCashBook: (id: string) => void;
  cashBooks: CashBook[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
}

export default function Sidebar({ 
  activeSection, 
  setActiveSection, 
  activeCashBook,
  setActiveCashBook,
  cashBooks,
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  isDarkMode
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    'buku-kas': true,
    'laporan': false,
    'pengaturan': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleNavClick = (section: string, cashBookId?: string) => {
    setActiveSection(section);
    if (cashBookId) {
      setActiveCashBook(cashBookId);
    }
    setIsMobileMenuOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-r shadow-sm`}>
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SK</span>
            </div>
            <span className={`ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              SmartKas
            </span>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            {/* Buku Kas Section */}
            <div>
              <button
                onClick={() => toggleSection('buku-kas')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <BookOpen className="mr-3 h-5 w-5" />
                  <span>BUKU KAS</span>
                </div>
                {expandedSections['buku-kas'] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {expandedSections['buku-kas'] && (
                <div className="ml-6 mt-2 space-y-1">
                  {cashBooks.map((cashBook) => (
                    <button
                      key={cashBook.id}
                      onClick={() => handleNavClick('dashboard', cashBook.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        activeCashBook === cashBook.id
                          ? `${getColorClasses(cashBook.color)} border-r-2 border-current`
                          : isDarkMode
                            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-base">{cashBook.icon}</span>
                        <div className="text-left">
                          <div className="font-medium">{cashBook.name}</div>
                          <div className="text-xs opacity-75">{formatCurrency(cashBook.balance)}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => handleNavClick('cashbook-setup')}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Tambah Buku Kas</span>
                  </button>
                </div>
              )}
            </div>

            {/* Laporan Section */}
            <div>
              <button
                onClick={() => toggleSection('laporan')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <BarChart3 className="mr-3 h-5 w-5" />
                  <span>LAPORAN KAS</span>
                </div>
                {expandedSections['laporan'] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {expandedSections['laporan'] && (
                <div className="ml-6 mt-2 space-y-1">
                  <button
                    onClick={() => handleNavClick('reports')}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      activeSection === 'reports'
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span>📊 Laporan Lengkap</span>
                  </button>
                </div>
              )}
            </div>

            {/* Pengaturan Section */}
            <div>
              <button
                onClick={() => toggleSection('pengaturan')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  <span>PENGATURAN</span>
                </div>
                {expandedSections['pengaturan'] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {expandedSections['pengaturan'] && (
                <div className="ml-6 mt-2 space-y-1">
                  <button
                    onClick={() => handleNavClick('settings')}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      activeSection === 'settings'
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span>⚙️ Pengaturan Umum</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('category-management')}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      activeSection === 'category-management'
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span>🏷️ Kelola Kategori</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className={`relative flex-1 flex flex-col max-w-xs w-full transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
              {/* Mobile Logo */}
              <div className="flex items-center flex-shrink-0 px-6 mb-8">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SK</span>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartKas
                </span>
              </div>
              
              {/* Mobile Navigation - Same as desktop */}
              <nav className="flex-1 px-4 space-y-2">
                {/* Same navigation structure as desktop */}
                <div>
                  <button
                    onClick={() => toggleSection('buku-kas')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <BookOpen className="mr-3 h-5 w-5" />
                      <span>BUKU KAS</span>
                    </div>
                    {expandedSections['buku-kas'] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedSections['buku-kas'] && (
                    <div className="ml-6 mt-2 space-y-1">
                      {cashBooks.map((cashBook) => (
                        <button
                          key={cashBook.id}
                          onClick={() => handleNavClick('dashboard', cashBook.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            activeCashBook === cashBook.id
                              ? `${getColorClasses(cashBook.color)} border-r-2 border-current`
                              : isDarkMode
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-2 text-base">{cashBook.icon}</span>
                            <div className="text-left">
                              <div className="font-medium">{cashBook.name}</div>
                              <div className="text-xs opacity-75">{formatCurrency(cashBook.balance)}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pengaturan Section - Mobile */}
                <div>
                  <button
                    onClick={() => toggleSection('pengaturan')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Settings className="mr-3 h-5 w-5" />
                      <span>PENGATURAN</span>
                    </div>
                    {expandedSections['pengaturan'] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedSections['pengaturan'] && (
                    <div className="ml-6 mt-2 space-y-1">
                      <button
                        onClick={() => handleNavClick('settings')}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                          activeSection === 'settings'
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : isDarkMode
                              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <span>⚙️ Pengaturan Umum</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('category-management')}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                          activeSection === 'category-management'
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : isDarkMode
                              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                        >
                          <span>🏷️ Kelola Kategori</span>
                        </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}