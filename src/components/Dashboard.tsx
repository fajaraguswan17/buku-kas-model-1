import React from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

interface CashBook {
  id: string;
  name: string;
  balance: number;
}

interface DashboardProps {
  cashBook: CashBook;
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
}

export default function Dashboard({ cashBook, transactions, onTransactionClick }: DashboardProps) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{cashBook.name}</h2>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
        <p className={`text-2xl font-bold ${cashBook.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${cashBook.balance.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="divide-y">
          {transactions.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">
              No transactions yet
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onTransactionClick(transaction)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}