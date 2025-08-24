'use client';

import React from 'react';
import TotalExpenseCard from '../components/total-expense-card';
import MonthlyExpenseCards from '../components/monthly-expense-cards';
import RecentExpenses from '../components/recent-expenses';
import ExpenseDistributionChart from '../components/expense-distribution-chart';
import MonthlyExpensesChart from '../components/monthly-expenses-chart';

const DashboardView: React.FC = () => {
  // Mock data - replace with actual API calls
  const totalExpenses = 7100;
  const thisMonthExpenses = 3200;
  const lastMonthExpenses = 2800;
  
  const recentExpenses = [
    {
      id: '1',
      title: 'Shopping',
      amount: 430,
      date: '17th Feb 2025',
      category: 'Shopping',
      categoryColor: '#fce7f3',
      categoryIcon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: '2',
      title: 'Travel',
      amount: 670,
      date: '13th Feb 2025',
      category: 'Travel',
      categoryColor: '#dbeafe',
      categoryIcon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      id: '3',
      title: 'Electricity Bill',
      amount: 200,
      date: '11th Feb 2025',
      category: 'Bills',
      categoryColor: '#fef3c7',
      categoryIcon: (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: '4',
      title: 'Loan Repayment',
      amount: 600,
      date: '10th Feb 2025',
      category: 'Finance',
      categoryColor: '#dcfce7',
      categoryIcon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: '5',
      title: 'Transport',
      amount: 300,
      date: '14th Jan 2025',
      category: 'Transport',
      categoryColor: '#fef3c7',
      categoryIcon: (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
  ];

  const expenseDistribution = [
    { name: 'Shopping', value: 1500, color: '#fce7f3' },
    { name: 'Travel', value: 1200, color: '#dbeafe' },
    { name: 'Bills', value: 800, color: '#fef3c7' },
    { name: 'Food', value: 600, color: '#dcfce7' },
    { name: 'Transport', value: 400, color: '#f3e8ff' },
    { name: 'Others', value: 600, color: '#fee2e2' },
  ];

  const monthlyExpensesData = [
    { month: 'Sep', amount: 420 },
    { month: 'Oct', amount: 680 },
    { month: 'Nov', amount: 200 },
    { month: 'Dec', amount: 600 },
    { month: 'Jan', amount: 450 },
    { month: 'Feb', amount: 320 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Section - Total Expense Card and Monthly Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TotalExpenseCard amount={totalExpenses} />
        </div>
        <div className="md:col-span-2">
          <MonthlyExpenseCards 
            thisMonth={thisMonthExpenses} 
            lastMonth={lastMonthExpenses} 
          />
        </div>
      </div>

      {/* Middle Section - Recent Expenses and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Recent Expenses */}
        <RecentExpenses expenses={recentExpenses} />
        
        {/* Right Panel - Expense Distribution Chart */}
        <ExpenseDistributionChart data={expenseDistribution} />
      </div>

      {/* Bottom Section - Monthly Expenses Bar Chart */}
      <MonthlyExpensesChart data={monthlyExpensesData} />
    </div>
  );
};

export default DashboardView;
