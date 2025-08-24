
import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

interface ChartData {
  month?: string;
  date?: string;
  amount: number;
}

interface CustomLineChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ 
  data, 
  height = 300,
  className = ""
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
          <p className="text-xs font-semibold text-purple-800 mb-1">{label}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-900">${payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="none" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#555" }} 
            stroke="none"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#875cf5" 
            strokeWidth={2}
            fill="url(#incomeGradient)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;