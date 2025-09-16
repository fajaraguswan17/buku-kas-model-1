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
    // Transaksi Uang Sekolah
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
      id: '7',
      cashBookId: 'uang-sekolah',
      type: 'expense',
      date: '2024-03-12T09:00:00',
      category: 'Pendidikan',
      description: 'Beli buku pelajaran semester baru',
      amount: 350000,
      balance: 2100000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '8',
      cashBookId: 'uang-sekolah',
      type: 'expense',
      date: '2024-03-11T13:30:00',
      category: 'Makanan',
      description: 'Jajan di koperasi sekolah',
      amount: 12000,
      balance: 2088000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '9',
      cashBookId: 'uang-sekolah',
      type: 'expense',
      date: '2024-03-10T07:45:00',
      category: 'Transport',
      description: 'Ongkos ojek online ke sekolah',
      amount: 18000,
      balance: 2070000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '10',
      cashBookId: 'uang-sekolah',
      type: 'income',
      date: '2024-03-09T16:00:00',
      category: 'Bonus',
      description: 'Bonus prestasi akademik',
      amount: 500000,
      balance: 2570000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '11',
      cashBookId: 'uang-sekolah',
      type: 'expense',
      date: '2024-03-08T12:15:00',
      category: 'Pendidikan',
      description: 'Fotokopi materi kuliah',
      amount: 25000,
      balance: 2545000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },

    // Transaksi Tabungan Pribadi
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
      id: '12',
      cashBookId: 'tabungan-pribadi',
      type: 'income',
      date: '2024-03-11T14:20:00',
      category: 'Freelance',
      description: 'Desain logo untuk startup',
      amount: 1200000,
      balance: 4550000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '13',
      cashBookId: 'tabungan-pribadi',
      type: 'expense',
      date: '2024-03-10T19:30:00',
      category: 'Hiburan',
      description: 'Nonton bioskop dengan teman',
      amount: 85000,
      balance: 4465000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '14',
      cashBookId: 'tabungan-pribadi',
      type: 'expense',
      date: '2024-03-09T11:00:00',
      category: 'Belanja',
      description: 'Beli laptop untuk kerja freelance',
      amount: 8500000,
      balance: -4035000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '15',
      cashBookId: 'tabungan-pribadi',
      type: 'income',
      date: '2024-03-08T10:15:00',
      category: 'Gaji',
      description: 'Gaji part-time bulan Maret',
      amount: 3000000,
      balance: -1035000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '16',
      cashBookId: 'tabungan-pribadi',
      type: 'income',
      date: '2024-03-07T15:45:00',
      category: 'Freelance',
      description: 'Maintenance website bulanan',
      amount: 800000,
      balance: -235000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '17',
      cashBookId: 'tabungan-pribadi',
      type: 'expense',
      date: '2024-03-06T18:20:00',
      category: 'Makanan',
      description: 'Makan malam di restoran',
      amount: 150000,
      balance: -385000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '18',
      cashBookId: 'tabungan-pribadi',
      type: 'income',
      date: '2024-03-05T09:30:00',
      category: 'Freelance',
      description: 'Konsultasi IT untuk perusahaan',
      amount: 1500000,
      balance: 1115000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },

    // Transaksi Dana Darurat
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
    },
    {
      id: '19',
      cashBookId: 'dana-darurat',
      type: 'income',
      date: '2024-03-09T11:00:00',
      category: 'Investasi',
      description: 'Hasil investasi reksadana',
      amount: 750000,
      balance: 9250000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '20',
      cashBookId: 'dana-darurat',
      type: 'income',
      date: '2024-03-08T14:30:00',
      category: 'Gaji',
      description: 'Transfer rutin ke dana darurat',
      amount: 2000000,
      balance: 8500000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '21',
      cashBookId: 'dana-darurat',
      type: 'expense',
      date: '2024-03-07T16:45:00',
      category: 'Kesehatan',
      description: 'Biaya medical check-up tahunan',
      amount: 850000,
      balance: 7650000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '22',
      cashBookId: 'dana-darurat',
      type: 'income',
      date: '2024-03-06T10:20:00',
      category: 'Bonus',
      description: 'Bonus akhir tahun yang ditabung',
      amount: 5000000,
      balance: 8500000,
      createdBy: 'Fajar Aguswan',
      hasFile: false
    },
    {
      id: '23',
      cashBookId: 'dana-darurat',
      type: 'expense',
      date: '2024-03-05T08:15:00',
      category: 'Tagihan',
      description: 'Bayar premi asuransi kesehatan',
      amount: 450000,
      balance: 3050000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },
    {
      id: '24',
      cashBookId: 'dana-darurat',
      type: 'income',
      date: '2024-03-04T13:00:00',
      category: 'Investasi',
      description: 'Pencairan deposito yang jatuh tempo',
      amount: 3000000,
      balance: 3500000,
      createdBy: 'Fajar Aguswan',
      hasFile: true
    },

    // Transaksi Transfer antar buku kas
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
      id: '25',
      cashBookId: 'tabungan-pribadi',
      type: 'transfer',
      date: '2024-03-04T15:30:00',
      category: 'Transfer',
      description: 'Transfer ke dana darurat',
      amount: 1000000,
      balance: 115000,
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