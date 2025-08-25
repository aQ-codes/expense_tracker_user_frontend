'use client';

import React from 'react';
import { EmptyChartIcon } from '@/themes/images/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyBreakdownChartProps {
  dailyData: Array<{ date: string; amount: number; formattedDate?: string }>;
  selectedMonth: number;
  selectedYear: number;
}

const DailyBreakdownChart: React.FC<DailyBreakdownChartProps> = ({
  dailyData,
  selectedMonth,
  selectedYear
}) => {
  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  // Format data for chart
  const chartData = dailyData.map(item => ({
    ...item,
    day: new Date(item.date).getDate(),
    displayDate: item.formattedDate || new Date(item.date).toLocaleDateString()
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">Date: {label}</p>
          <p className="text-sm font-semibold text-purple-600">
            Amount: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Daily Spending Trend</h3>
        <p className="text-gray-600 mt-1">
          {getMonthName(selectedMonth)} {selectedYear} - Daily expense breakdown
        </p>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <EmptyChartIcon />
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm">No expenses recorded for this month</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyBreakdownChart;
