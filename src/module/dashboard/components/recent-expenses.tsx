import React from 'react';
import { RecentExpensesIcon } from '@/themes/images/icon';
import Link from 'next/link';
import ExpenseCard from '@/themes/components/expense-card';
import { ExpenseWithCategory } from '@/interfaces/expense';

interface RecentExpensesProps {
  expenses: ExpenseWithCategory[];
  className?: string;
}

const RecentExpenses: React.FC<RecentExpensesProps> = ({ 
  expenses, 
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
        <Link 
          href="/expenses" 
          className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
        >
          See All
                      <RecentExpensesIcon />
        </Link>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            variant="recent"
            showActions={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentExpenses;
