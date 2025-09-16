import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import CashBookSetup from './components/CashBookSetup';
import TransactionModal from './components/TransactionModal';
import FloatingActionButton from './components/FloatingActionButton';
import { CashBook, Transaction } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeCashBook, setActiveCashBook] = useState('uang-sekolah');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense' | 'transfer'>('income');

  // Sample cash books data
  const [cashBooks] = useState<CashBook[]>([
    {
      id: 'uang-sekolah',
      name: 'Uang Sekolah',
      balance: 2450000,
      color: 'blue',
      icon: '🎓',
      description: 'Dana untuk keperluan sekolah'
    },
    {
      id: 'tabungan-pribadi',
      name: 'Tabungan Pribadi',
      balance: 5750000,
      color: 'green',
      icon: '💰',
      description: 'Tabungan untuk masa depan'
    },
    {
      id: 'dana-darurat',
      name: 'Dana Darurat',
      balance: 10000000,
      color: 'red',
      icon: '🚨',
      description: 'Dana untuk keadaan darurat'
    }
  ]);

  // Sample transactions data
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      cashBookId: 'uang-sekolah',
      type: 'income',
      date: '2024-03-15T10:30:00',
      category: 'Gaji',
      description: 'Gaji bulanan Maret 2024',
      amount: 5000000,
      balance: 2450000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '2',
      cashBookId: 'uang-sekolah',
      type: 'expense',
      date: '2024-03-14T14:15:00',
      category: 'Makanan',
      description: 'Makan siang di kantin sekolah',
      amount: 25000,
      balance: 2425000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '3',
      cashBookId: 'uang-sekolah',
      type: 'expense',
      date: '2024-03-13T08:20:00',
      category: 'Transport',
      description: 'Ongkos transportasi ke sekolah',
      amount: 15000,
      balance: 2410000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '4',
      cashBookId: 'tabungan-pribadi',
      type: 'income',
      date: '2024-03-12T16:45:00',
      category: 'Freelance',
      description: 'Proyek website untuk klien',
      amount: 2500000,
      balance: 5750000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '5',
      cashBookId: 'uang-sekolah',
      type: 'transfer',
      date: '2024-03-11T11:00:00',
      category: 'Transfer',
      description: 'Transfer ke tabungan pribadi',
      amount: 500000,
      balance: 1950000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '6',
      cashBookId: 'dana-darurat',
      type: 'income',
      date: '2024-03-10T09:30:00',
      category: 'Investasi',
      description: 'Dividen saham bulanan',
      amount: 1000000,
      balance: 10000000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    }
  ]);

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const currentCashBook = cashBooks.find(cb => cb.id === activeCashBook);
  const currentTransactions = transactions.filter(t => t.cashBookId === activeCashBook);

  const handleTransactionClick = (type: 'income' | 'expense' | 'transfer') => {
    setTransactionType(type);
    setShowTransactionModal(true);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'reports':
        return <Reports cashBook={currentCashBook!} transactions={currentTransactions} />;
      case 'settings':
        return <Settings />;
      case 'cashbook-setup':
        return <CashBookSetup cashBooks={cashBooks} />;
      default:
        return (
          <Dashboard 
            cashBook={currentCashBook!} 
            transactions={currentTransactions}
            onTransactionClick={handleTransactionClick}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20'
    }`}>
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeCashBook={activeCashBook}
        setActiveCashBook={setActiveCashBook}
        cashBooks={cashBooks}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDarkMode={isDarkMode}
      />
      
      <div className="lg:pl-64">
        <Header 
          cashBook={currentCashBook!}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main className="py-6 px-4 lg:px-8 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors duration-200 ${
              activeSection === 'dashboard' 
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="h-5 w-5 mb-1">📊</div>
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveSection('reports')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors duration-200 ${
              activeSection === 'reports' 
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="h-5 w-5 mb-1">📈</div>
            <span className="text-xs">Laporan</span>
          </button>
          <button
            onClick={() => handleTransactionClick('income')}
            className="flex flex-col items-center py-2 px-1 rounded-lg text-green-600"
          >
            <div className="h-5 w-5 mb-1">➕</div>
            <span className="text-xs">Tambah</span>
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors duration-200 ${
              activeSection === 'settings' 
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="h-5 w-5 mb-1">⚙️</div>
            <span className="text-xs">Pengaturan</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onTransactionClick={handleTransactionClick} />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        type={transactionType}
        cashBook={currentCashBook!}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;