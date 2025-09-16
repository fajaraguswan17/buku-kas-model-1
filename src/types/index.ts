export interface CashBook {
  id: string;
  name: string;
  balance: number;
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
  icon: string;
  description: string;
}

export interface Transaction {
  id: string;
  cashBookId: string;
  type: 'income' | 'expense' | 'transfer';
  date: string;
  category: string;
  description: string;
  amount: number;
  balance: number;
  createdBy: string;
  hasFile: boolean;
  filePath?: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface ReportData {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  transactionCount: number;
  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}