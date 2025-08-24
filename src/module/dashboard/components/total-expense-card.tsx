import React from 'react';

interface TotalExpenseCardProps {
  amount: number;
  className?: string;
}

const TotalExpenseCard: React.FC<TotalExpenseCardProps> = ({ 
  amount, 
  className = "" 
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Lifetime Expenses</p>
          <p className="text-2xl font-bold text-gray-900">
            ${amount.toLocaleString()}
          </p>
        </div>
        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-500">All-time total expenses</span>
      </div>
    </div>
  );
};

export default TotalExpenseCard;
