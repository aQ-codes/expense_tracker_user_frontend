import React from 'react';
import { TotalExpenseIcon } from '@/themes/images/icon';

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
            ₹{amount.toLocaleString()}
          </p>
        </div>
        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
          <TotalExpenseIcon />
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-500">All-time total expenses</span>
      </div>
    </div>
  );
};

export default TotalExpenseCard;
