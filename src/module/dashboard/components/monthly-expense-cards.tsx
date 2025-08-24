import React from 'react';

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
              ${thisMonth.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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
              ${lastMonth.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Previous month expenses</span>
          {lastMonth > 0 && (
            <div className={`ml-auto flex items-center text-sm ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
              <svg className={`w-4 h-4 mr-1 ${isIncrease ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {Math.abs(percentageChange).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenseCards;
