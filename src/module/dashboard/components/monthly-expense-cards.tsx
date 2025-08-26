import React from 'react';
import { MonthlyExpenseIcon, AverageExpenseIcon, TrendArrowIcon } from '@/themes/images/icon';

interface MonthlyExpenseCardsProps {
  thisMonth: number;
  lastMonth: number;
  className?: string;
}

const MonthlyExpenseCards: React.FC<MonthlyExpenseCardsProps> = ({ 
  thisMonth, 
  lastMonth, 
  className = "" 
}) => {
  // Calculate percentage change
  const percentageChange = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;
  const isIncrease = percentageChange > 0;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {/* This Month Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">This Month</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{thisMonth.toLocaleString()}
            </p>
          </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <MonthlyExpenseIcon />
        </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Current month expenses</span>
        </div>
      </div>

      {/* Last Month Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Last Month</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{lastMonth.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <MonthlyExpenseIcon />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Previous month expenses</span>
          {lastMonth > 0 && (
            <div className={`ml-auto flex items-center text-sm ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
              <TrendArrowIcon isIncrease={isIncrease} />
              {Math.abs(percentageChange).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenseCards;
