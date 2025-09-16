import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FloatingActionButtonProps {
  onTransactionClick: (type: 'income' | 'expense' | 'transfer') => void;
}

export default function FloatingActionButton({ onTransactionClick }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      type: 'income' as const,
      label: 'Pemasukan',
      icon: '💰',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      type: 'expense' as const,
      label: 'Pengeluaran',
      icon: '💸',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      type: 'transfer' as const,
      label: 'Transfer',
      icon: '🔄',
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  ];

  const handleActionClick = (type: 'income' | 'expense' | 'transfer') => {
    onTransactionClick(type);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-6 lg:bottom-6 lg:right-6 z-40">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {actions.map((action) => (
            <button
              key={action.type}
              onClick={() => handleActionClick(action.type)}
              className={`flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105`}
            >
              <span className="text-lg">{action.icon}</span>
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transform transition-all duration-200 hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
}