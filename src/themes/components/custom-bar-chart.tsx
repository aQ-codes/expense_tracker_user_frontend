'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartData {
  month: string;
  amount: number;
}

interface CustomBarChartProps {
  data: BarChartData[];
  title?: string;
  className?: string;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ 
  data, 
  title = "Last 30 Days Expenses",
  className = "" 
}) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="font-medium">${payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Function to alternate colors
  const getBarColor = (index: number) => {
    return index % 2 === 0 ? "#7c3aed" : "#d8b4fe"; // Alternating purple shades
  };

  // Custom bar component with rounded corners
  const CustomBar = (props: unknown) => {
    const { x, y, width, height, index } = props as { x: number; y: number; width: number; height: number; index: number };
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={getBarColor(index)}
          rx={4} // Rounded corners
          ry={4}
        />
      </g>
    );
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              shape={CustomBar}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;