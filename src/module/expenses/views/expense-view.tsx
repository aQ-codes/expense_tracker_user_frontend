'use client';

import React, { useState, useMemo } from 'react';
import ExpenseLineChart from '../components/expense-line-chart';
import ExpenseFilters from '../components/expense-filters';
import ExpenseList from '../components/expense-list';
import ExpenseModal from '../components/expense-modal';
import ToastNotification from '../../../themes/components/toast-notification';
import { Category, Expense, ExpenseWithCategory } from '@/interfaces/expense';

const ExpenseView: React.FC = () => {
  // State management
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingExpense, setEditingExpense] = useState<ExpenseWithCategory | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Mock categories data
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

  // Mock expenses data
  const mockExpenses: ExpenseWithCategory[] = [
    {
      _id: '1',
      title: 'Shopping',
      amount: 430,
      category: {
        id: '1',
        name: 'Shopping',
        color: '#fce7f3',
        icon: categories[0].icon,
      },
      date: '2025-02-17',
      createdBy: 'user1',
    },
    {
      _id: '2',
      title: 'Travel',
      amount: 670,
      category: {
        id: '2',
        name: 'Travel',
        color: '#dbeafe',
        icon: categories[1].icon,
      },
      date: '2025-02-13',
      createdBy: 'user1',
    },
    {
      _id: '3',
      title: 'Electricity Bill',
      amount: 200,
      category: {
        id: '3',
        name: 'Bills',
        color: '#fef3c7',
        icon: categories[2].icon,
      },
      date: '2025-02-11',
      createdBy: 'user1',
    },
    {
      _id: '4',
      title: 'Loan Repayment',
      amount: 600,
      category: {
        id: '3',
        name: 'Bills',
        color: '#fef3c7',
        icon: categories[2].icon,
      },
      date: '2025-02-10',
      createdBy: 'user1',
    },
    {
      _id: '5',
      title: 'Transport',
      amount: 300,
      category: {
        id: '5',
        name: 'Transport',
        color: '#f3e8ff',
        icon: categories[4].icon,
      },
      date: '2025-01-14',
      createdBy: 'user1',
    },
    {
      _id: '6',
      title: 'Education',
      amount: 800,
      category: {
        id: '6',
        name: 'Education',
        color: '#fef3c7',
        icon: categories[5].icon,
      },
      date: '2025-01-11',
      createdBy: 'user1',
    },
  ];

  // Initialize expenses with mock data
  React.useEffect(() => {
    setExpenses(mockExpenses);
  }, []);

  // Mock line chart data
  const lineChartData = [
    { date: '2nd Jan', amount: 500 },
    { date: '3rd Jan', amount: 200 },
    { date: '4th Jan', amount: 300 },
    { date: '5th Jan', amount: 100 },
    { date: '6th Jan', amount: 50 },
    { date: '7th Jan', amount: 600 },
    { date: '8th Jan', amount: 400 },
    { date: '9th Jan', amount: 300 },
    { date: '10th Jan', amount: 200 },
    { date: '11th Jan', amount: 400 },
    { date: '12th Jan', amount: 900 },
    { date: '14th Jan', amount: 400 },
    { date: '10th Feb', amount: 500 },
    { date: '11th Feb', amount: 200 },
    { date: '17th Feb', amount: 650 },
  ];

  // Filter expenses based on selected filters
  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(expense => expense.category.id === selectedCategory);
    }

    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter(expense => {
        const expenseMonth = new Date(expense.date).getMonth() + 1;
        const selectedMonthNum = parseInt(selectedMonth);
        return expenseMonth === selectedMonthNum;
      });
    }

    // Sort by date (reverse chronological order)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, selectedCategory, selectedMonth]);

  // Handlers
  const handleAddExpense = () => {
    setModalMode('add');
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense: ExpenseWithCategory) => {
    setModalMode('edit');
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(prev => prev.filter(expense => expense._id !== expenseId));
    showToast('Expense deleted successfully', 'success');
  };

  const handleSubmitExpense = (expenseData: Omit<Expense, '_id'>) => {
    if (modalMode === 'add') {
      const newExpense: ExpenseWithCategory = {
        _id: Date.now().toString(),
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
        category: categories.find(cat => cat.id === expenseData.category)!,
        createdBy: 'user1',
      };
      setExpenses(prev => [newExpense, ...prev]);
      showToast('Expense added successfully', 'success');
    } else {
      setExpenses(prev => prev.map(expense => 
        expense._id === editingExpense?._id 
          ? { 
              ...expense, 
              title: expenseData.title,
              amount: expenseData.amount,
              date: expenseData.date,
              category: categories.find(cat => cat.id === expenseData.category)!
            }
          : expense
      ));
      showToast('Expense updated successfully', 'success');
    }
  };

  const handleExport = () => {
    // Mock CSV export functionality
    const csvContent = [
      ['Title', 'Amount', 'Category', 'Date'],
      ...filteredExpenses.map(expense => [
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
    a.download = 'expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    showToast('Expenses exported to CSV', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // Convert ExpenseWithCategory to ExpenseList format
  const convertToExpenseListFormat = (expenseWithCategory: ExpenseWithCategory) => ({
    _id: expenseWithCategory._id || '',
    title: expenseWithCategory.title,
    amount: expenseWithCategory.amount,
    category: expenseWithCategory.category,
    date: expenseWithCategory.date,
    createdBy: expenseWithCategory.createdBy
  });

  const convertToExpenseListArray = (expenses: ExpenseWithCategory[]) => 
    expenses.map(convertToExpenseListFormat);

  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <ExpenseLineChart data={lineChartData} onAddExpense={handleAddExpense} />

      {/* Filters */}
      <ExpenseFilters
        categories={categories}
        selectedCategory={selectedCategory}
        selectedMonth={selectedMonth}
        onCategoryChange={setSelectedCategory}
        onMonthChange={setSelectedMonth}
      />

      {/* Expense List */}
      <ExpenseList
        expenses={convertToExpenseListArray(filteredExpenses)}
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
        onExport={handleExport}
      />

      {/* Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitExpense}
        expense={editingExpense ? {
          _id: editingExpense._id || '',
          title: editingExpense.title,
          amount: editingExpense.amount,
          category: editingExpense.category.id,
          date: editingExpense.date
        } : null}
        categories={categories}
        mode={modalMode}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
};

export default ExpenseView;
