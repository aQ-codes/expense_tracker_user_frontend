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
import { DashboardData, DashboardExpense } from '@/interfaces/expense';

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
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

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
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      const response = await expenseService.deleteExpense(expenseId);
      if (response.status) {
        showToast('Expense deleted successfully', 'success');
        // Update local state instead of reloading entire dashboard
        setDashboardData(prevData => ({
          ...prevData,
          recentExpenses: prevData.recentExpenses.filter(expense => expense._id !== expenseId),
          stats: {
            ...prevData.stats,
            totalExpenses: prevData.stats.totalExpenses - 1
          }
        }));
      } else {
        showToast(response.message || 'Failed to delete expense', 'error');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      showToast('Failed to delete expense', 'error');
    }
  };

  const handleEditExpense = (expense: DashboardExpense) => {
    // The expense is already in the correct format, just set it directly
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (expenseData: any) => {
    try {
      let response;
      if (editingExpense) {
        // Update existing expense - use _id from transformed expense
        const expenseId = editingExpense._id;
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
        
        if (editingExpense) {
          // Update local state for edit
          setDashboardData(prevData => ({
            ...prevData,
            recentExpenses: prevData.recentExpenses.map(expense => 
              expense._id === editingExpense._id 
                ? { ...expense, ...expenseData }
                : expense
            )
          }));
        } else {
          // Reload for new expense since we need the full data
          loadDashboardData();
        }
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
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
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
        expense={editingExpense}
        categories={categories}
        mode={editingExpense ? 'edit' : 'add'}
      />
    </div>
  );
};

export default DashboardView;
