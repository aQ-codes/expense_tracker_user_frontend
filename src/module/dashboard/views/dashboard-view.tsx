'use client';

import React, { useState, useEffect } from 'react';
import TotalExpenseCard from '../components/total-expense-card';
import MonthlyExpenseCards from '../components/monthly-expense-cards';
import RecentExpenses from '../components/recent-expenses';
import ExpenseDistributionChart from '../components/expense-distribution-chart';
import MonthlyExpensesChart from '../components/monthly-expenses-chart';
import ToastNotification from '../../../themes/components/toast-notification';
import ExpenseModal from '../../expenses/components/expense-modal';
import useDashboardService from '../services/dashboard-service';
import useExpenseService from '../../expenses/services/expense-service';
import { DashboardData, ExpenseWithCategory, Expense, Category, BackendCategory } from '@/interfaces/expense';

const DashboardView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      totalExpenses: 0,
      thisMonthExpenses: 0,
      lastMonthExpenses: 0,
      percentageChange: 0
    },
    recentExpenses: [],
    expenseDistribution: [],
    monthlyExpensesData: []
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseWithCategory | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const dashboardService = useDashboardService();
  const expenseService = useExpenseService();

  useEffect(() => {
    loadDashboardData();
    loadCategories();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardData();
      
      if (response.status && response.data) {
        // The backend now returns the correct format, no transformation needed
        setDashboardData(response.data);
      } else {
        showToast(response.message || 'Failed to load dashboard data', 'error');
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({
      message,
      type,
      isVisible: true
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const loadCategories = async () => {
    try {
      const response = await expenseService.getCategories();
      if (response.status && response.data) {
        // Transform backend categories to frontend format
        const transformedCategories: Category[] = response.data
          .filter((backendCategory: BackendCategory) => backendCategory._id)
          .map((backendCategory: BackendCategory) => ({
            id: backendCategory._id,
            name: backendCategory.name,
            color: '#6B7280', // Default color
            icon: '💰' // Default icon
          }));
        setCategories(transformedCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };





  const handleModalSubmit = async (expenseData: Omit<Expense, '_id'>) => {
    try {
      let response;
      if (editingExpense) {
        // Update existing expense - use _id from transformed expense
        const expenseId = editingExpense._id || '';
        response = await expenseService.updateExpense(expenseId, expenseData);
      } else {
        // Create new expense
        response = await expenseService.createExpense(expenseData);
      }

      if (response.status) {
        showToast(
          editingExpense ? 'Expense updated successfully' : 'Expense created successfully', 
          'success'
        );
        setIsModalOpen(false);
        setEditingExpense(null);
        
        // Reload dashboard data to get the updated information
        loadDashboardData();
      } else {
        showToast(response.message || 'Failed to save expense', 'error');
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      showToast('Failed to save expense', 'error');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Section - Total Expense Card and Monthly Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TotalExpenseCard amount={dashboardData.stats.totalExpenses} />
        </div>
        <div className="md:col-span-2">
          <MonthlyExpenseCards 
            thisMonth={dashboardData.stats.thisMonthExpenses} 
            lastMonth={dashboardData.stats.lastMonthExpenses} 
          />
        </div>
      </div>

      {/* Middle Section - Recent Expenses and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Recent Expenses */}
        <RecentExpenses 
          expenses={dashboardData.recentExpenses}
        />
        
        {/* Right Panel - Expense Distribution Chart */}
        <ExpenseDistributionChart data={dashboardData.expenseDistribution} />
      </div>

      {/* Bottom Section - Monthly Expenses Bar Chart */}
      <MonthlyExpensesChart data={dashboardData.monthlyExpensesData} />

      {/* Toast Notification */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* Expense Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        expense={editingExpense ? {
          _id: editingExpense._id || '',
          title: editingExpense.title,
          amount: editingExpense.amount,
          category: editingExpense.category.id,
          date: editingExpense.date
        } : null}
        categories={categories}
        mode={editingExpense ? 'edit' : 'add'}
      />
    </div>
  );
};

export default DashboardView;
