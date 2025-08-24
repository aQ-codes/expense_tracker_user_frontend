import React from 'react';
import Link from 'next/link';

interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  categoryColor: string;
  categoryIcon: React.ReactNode;
}

interface RecentExpensesProps {
  expenses: ExpenseItem[];
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
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              {/* Category Icon */}
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: expense.categoryColor }}
              >
                {expense.categoryIcon}
              </div>
              
              {/* Expense Details */}
              <div>
                <p className="font-medium text-gray-900">{expense.title}</p>
                <p className="text-sm text-gray-500">{expense.date}</p>
              </div>
            </div>
            
            {/* Amount */}
            <div className="flex items-center">
              <span className="text-red-600 font-semibold mr-2">
                - ${expense.amount.toLocaleString()}
              </span>
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentExpenses;
