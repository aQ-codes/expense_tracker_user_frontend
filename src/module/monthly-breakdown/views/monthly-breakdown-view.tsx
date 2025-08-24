'use client';

import React, { useState, useMemo } from 'react';
import MonthlySelector from '../components/monthly-selector';
import MonthlySummary from '../components/monthly-summary';
import ExpenseList from '../../expenses/components/expense-list';
import { Category, ExpenseWithCategory } from '@/interfaces/expense';

const MonthlyBreakdownView: React.FC = () => {
  // Get current month and year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Mock categories data (same as expense page)
  const categories: Category[] = [
    {
      id: '1',
      name: 'Shopping',
      color: '#fce7f3',
      icon: (
        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: '2',
      name: 'Travel',
      color: '#dbeafe',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      id: '3',
      name: 'Bills',
      color: '#fef3c7',
      icon: (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: '4',
      name: 'Food',
      color: '#dcfce7',
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
      ),
    },
    {
      id: '5',
      name: 'Transport',
      color: '#f3e8ff',
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      id: '6',
      name: 'Education',
      color: '#fef3c7',
      icon: (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  // Mock expenses data with more diverse dates
  const mockExpenses: ExpenseWithCategory[] = [
    {
      _id: '1',
      title: 'Shopping',
      amount: 430,
      category: categories[0],
      date: '2025-02-17',
      createdBy: 'user1',
    },
    {
      _id: '2',
      title: 'Travel',
      amount: 670,
      category: categories[1],
      date: '2025-02-13',
      createdBy: 'user1',
    },
    {
      _id: '3',
      title: 'Electricity Bill',
      amount: 200,
      category: categories[2],
      date: '2025-02-11',
      createdBy: 'user1',
    },
    {
      _id: '4',
      title: 'Loan Repayment',
      amount: 600,
      category: categories[2],
      date: '2025-02-10',
      createdBy: 'user1',
    },
    {
      _id: '5',
      title: 'Transport',
      amount: 300,
      category: categories[4],
      date: '2025-01-14',
      createdBy: 'user1',
    },
    {
      _id: '6',
      title: 'Education',
      amount: 800,
      category: categories[5],
      date: '2025-01-11',
      createdBy: 'user1',
    },
    {
      _id: '7',
      title: 'Grocery Shopping',
      amount: 150,
      category: categories[3],
      date: '2025-02-15',
      createdBy: 'user1',
    },
    {
      _id: '8',
      title: 'Movie Tickets',
      amount: 80,
      category: categories[0],
      date: '2025-02-20',
      createdBy: 'user1',
    },
    {
      _id: '9',
      title: 'Gas Station',
      amount: 120,
      category: categories[4],
      date: '2025-02-18',
      createdBy: 'user1',
    },
    {
      _id: '10',
      title: 'Restaurant',
      amount: 95,
      category: categories[3],
      date: '2025-02-16',
      createdBy: 'user1',
    },
  ];

  // Filter expenses for selected month/year
  const monthlyExpenses = useMemo(() => {
    return mockExpenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth() + 1;
      const expenseYear = expenseDate.getFullYear();
      
      return expenseMonth === selectedMonth && expenseYear === selectedYear;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedMonth, selectedYear]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalExpenses = monthlyExpenses.length;
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const averagePerDay = totalSpent / daysInMonth;

    return {
      totalSpent,
      totalExpenses,
      averagePerDay
    };
  }, [monthlyExpenses, selectedMonth, selectedYear]);

  // Convert to ExpenseList format
  const convertToExpenseListFormat = (expenseWithCategory: ExpenseWithCategory) => ({
    _id: expenseWithCategory._id || '',
    title: expenseWithCategory.title,
    amount: expenseWithCategory.amount,
    category: expenseWithCategory.category,
    date: expenseWithCategory.date,
    createdBy: expenseWithCategory.createdBy
  });

  const expenseListData = monthlyExpenses.map(convertToExpenseListFormat);

  // Handlers
  const handleDeleteExpense = (expenseId: string) => {
    // In a real app, this would call an API
    console.log('Delete expense:', expenseId);
  };

  const handleEditExpense = (expense: any) => {
    // In a real app, this would open an edit modal
    console.log('Edit expense:', expense);
  };

  const handleExport = () => {
    // Mock CSV export functionality
    const csvContent = [
      ['Title', 'Amount', 'Category', 'Date'],
      ...monthlyExpenses.map(expense => [
        expense.title,
        expense.amount.toString(),
        expense.category.name,
        new Date(expense.date).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${selectedMonth}-${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Monthly Selector */}
      <MonthlySelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      {/* Monthly Summary */}
      <MonthlySummary
        totalSpent={summaryStats.totalSpent}
        totalExpenses={summaryStats.totalExpenses}
        averagePerDay={summaryStats.averagePerDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      {/* Monthly Expenses List */}
      <ExpenseList
        expenses={expenseListData}
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
        onExport={handleExport}
        className=""
      />
    </div>
  );
};

export default MonthlyBreakdownView;
