'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MonthlySelector from '../components/monthly-selector';
import MonthlySummary from '../components/monthly-summary';
import ExpenseList from '../../expenses/components/expense-list';
import DailyBreakdownChart from '../components/daily-breakdown-chart';
import CategoryDistributionChart from '../components/category-distribution-chart';
import { Category, ExpenseWithCategory } from '@/interfaces/expense';
import useMonthlyBreakdownService from '../services/monthly-breakdown-service';
import useExpenseService from '../../expenses/services/expense-service';
import ToastNotification from '@/themes/components/toast-notification';

const MonthlyBreakdownView: React.FC = () => {
  // Get current month and year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // State for data
  const [monthlyData, setMonthlyData] = useState({
    summary: {
      totalSpent: 0,
      totalExpenses: 0,
      averagePerDay: 0,
      daysInMonth: 0
    },
    expenses: [],
    categoryDistribution: [],
    dailyBreakdown: []
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // Services
  const monthlyBreakdownService = useMonthlyBreakdownService();
  const expenseService = useExpenseService();

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await expenseService.getCategories();
        if (response.status) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []); // Remove expenseService from dependencies

  // Load monthly breakdown data
  useEffect(() => {
    const loadMonthlyBreakdown = async () => {
      setLoading(true);
      try {
        const response = await monthlyBreakdownService.getMonthlyBreakdown(selectedMonth, selectedYear);
        if (response.status) {
          setMonthlyData(response.data);
        } else {
          setToast({
            isVisible: true,
            message: response.message,
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error loading monthly breakdown:', error);
        setToast({
          isVisible: true,
          message: 'Failed to load monthly breakdown data',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadMonthlyBreakdown();
  }, [selectedMonth, selectedYear]); // Remove monthlyBreakdownService from dependencies

  // Convert to ExpenseList format
  const convertToExpenseListFormat = (expenseWithCategory: ExpenseWithCategory) => ({
    _id: expenseWithCategory._id || '',
    title: expenseWithCategory.title,
    amount: expenseWithCategory.amount,
    category: expenseWithCategory.category,
    date: expenseWithCategory.date,
    createdBy: expenseWithCategory.createdBy
  });

  const expenseListData = monthlyData.expenses.map(convertToExpenseListFormat);

  // Handlers
  const handleDeleteExpense = useCallback(async (expenseId: string) => {
    try {
      const response = await expenseService.deleteExpense(expenseId);
      if (response.status) {
        setToast({
          isVisible: true,
          message: 'Expense deleted successfully',
          type: 'success'
        });
        // Reload monthly breakdown data
        const breakdownResponse = await monthlyBreakdownService.getMonthlyBreakdown(selectedMonth, selectedYear);
        if (breakdownResponse.status) {
          setMonthlyData(breakdownResponse.data);
        }
      } else {
        setToast({
          isVisible: true,
          message: response.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      setToast({
        isVisible: true,
        message: 'Failed to delete expense',
        type: 'error'
      });
    }
  }, [selectedMonth, selectedYear]); // Add dependencies for the callback

  const handleEditExpense = useCallback((expense: any) => {
    // In a real app, this would open an edit modal
    console.log('Edit expense:', expense);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      const response = await monthlyBreakdownService.exportMonthlyExpenses(selectedMonth, selectedYear);
      if (response.status) {
        // Create and download CSV file
        const csvContent = response.data;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
        const monthName = new Date(selectedYear, selectedMonth - 1, 1).toLocaleDateString('en-US', { month: 'long' });
        a.download = `expenses-${monthName}-${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
        setToast({
          isVisible: true,
          message: 'Export completed successfully',
          type: 'success'
        });
      } else {
        setToast({
          isVisible: true,
          message: response.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error exporting expenses:', error);
      setToast({
        isVisible: true,
        message: 'Failed to export expenses',
        type: 'error'
      });
    }
  }, [selectedMonth, selectedYear]); // Add dependencies for the callback

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
        duration={3000}
        position="top-right"
      />
      
      {/* Monthly Selector */}
      <MonthlySelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      {/* Monthly Summary */}
      <MonthlySummary
        totalSpent={monthlyData.summary.totalSpent}
        totalExpenses={monthlyData.summary.totalExpenses}
        averagePerDay={monthlyData.summary.averagePerDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Breakdown Chart */}
        <DailyBreakdownChart
          dailyData={monthlyData.dailyBreakdown}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

        {/* Category Distribution Chart */}
        <CategoryDistributionChart
          categoryData={monthlyData.categoryDistribution}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>

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
