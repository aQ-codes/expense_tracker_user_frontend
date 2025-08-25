'use client';

import React, { useState, useEffect } from 'react';
import ExpenseLineChart from '../components/expense-line-chart';
import ExpenseFilters from '../components/expense-filters';
import ExpenseList from '../components/expense-list';
import ExpenseModal from '../components/expense-modal';
import ToastNotification from '../../../themes/components/toast-notification';
import { Category, Expense, ExpenseWithCategory, BackendCategory } from '@/interfaces/expense';
import useExpenseService from '../services/expense-service';
import { getCategoryColor, MONTHS, formatDate } from '../constants';
import { getCategoryIcon as getIcon } from '@/themes/images/icon';
import http from '@/utils/http';

const ExpenseView: React.FC = () => {
  // State management
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingExpense, setEditingExpense] = useState<ExpenseWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<Array<{ date: string; amount: number }>>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
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

  // Service hooks
  const expenseService = useExpenseService();

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
    loadChartData(); // Also load chart data on mount
  }, []);

  // Load expenses when filters change
  useEffect(() => {
    loadExpenses();
  }, [selectedCategory, selectedMonth, pagination.page]);

  // Load categories from backend
  const loadCategories = async () => {
    try {
      const response = await expenseService.getCategories();
      
      if (response.status && response.data) {
        // Transform backend categories to frontend format with icons and colors
        const transformedCategories: Category[] = response.data.map((backendCategory: Category) => ({
          id: backendCategory.id,
          name: backendCategory.name,
          color: getCategoryColor(backendCategory.name),
          icon: getIcon(backendCategory.name)
        }));
        setCategories(transformedCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      showToast('Failed to load categories', 'error');
    }
  };

  // Load expenses from backend
  const loadExpenses = async () => {
    try {
      setLoading(true);
      const filters: { category?: string; month?: string } = {};
      if (selectedCategory) filters.category = selectedCategory;
      if (selectedMonth) filters.month = selectedMonth;

      const response = await expenseService.getExpenses(
        pagination.page,
        pagination.limit,
        filters
      );

      if (response.status && response.data) {
        // Data is already in correct format, just ensure formattedDate is set
        const transformedExpenses: ExpenseWithCategory[] = response.data.map((expense: ExpenseWithCategory) => ({
          ...expense,
          formattedDate: expense.formattedDate || formatDate(expense.date)
        }));

        setExpenses(transformedExpenses);
        if (response.pagination) {
          setPagination(response.pagination);
        }
        
        // Load chart data
        await loadChartData();
      } else {
        setExpenses([]);
        showToast(response.message || 'Failed to load expenses', 'error');
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
      showToast('Failed to load expenses', 'error');
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  // Get chart data
  const getChartData = async () => {
    try {
      const response = await expenseService.getChartData();
      if (response.status && response.data) {
        // Backend returns daily data with 'date' property, no mapping needed
        return response.data.monthlyData;
      }
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
    return [];
  };

  // Load chart data
  const loadChartData = async () => {
    try {
      const response = await expenseService.getChartData();
      
      if (response.status && response.data) {
        // Backend now provides the exact format needed by frontend
        const monthlyData = response.data.monthlyData;
        setChartData(monthlyData);
      } else {
        setChartData([]);
      }
    } catch (error) {
      console.error('Error loading chart data:', error);
      setChartData([]);
    }
  };

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

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      const response = await expenseService.deleteExpense(expenseId);
      if (response.status) {
        showToast('Expense deleted successfully', 'success');
        loadExpenses(); // Reload expenses and chart data
      } else {
        showToast(response.message || 'Failed to delete expense', 'error');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      showToast('Failed to delete expense', 'error');
    }
  };

  const handleSubmitExpense = async (expenseData: Omit<Expense, '_id'>) => {
    try {
      let response;
      if (modalMode === 'add') {
        response = await expenseService.createExpense(expenseData);
      } else {
        response = await expenseService.updateExpense(editingExpense!._id!, expenseData);
      }

      if (response.status) {
        showToast(
          modalMode === 'add' ? 'Expense added successfully' : 'Expense updated successfully',
          'success'
        );
        setIsModalOpen(false);
        loadExpenses(); // Reload expenses and chart data
      } else {
        showToast(response.message || 'Failed to save expense', 'error');
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      showToast('Failed to save expense', 'error');
    }
  };

  const handleCategoryCreated = (newCategory: Category) => {
    // Add the new category to the categories list
    setCategories(prev => [...prev, newCategory]);
    showToast('Category created successfully', 'success');
  };

  const handleExport = async () => {
    try {
      const filters: { category?: string; month?: string } = {};
      if (selectedCategory) filters.category = selectedCategory;
      if (selectedMonth) filters.month = selectedMonth;

      // Create the request payload
      const payload = filters as unknown as JSON;
      
      // Use the existing HTTP utility to make the request
      const { body } = await http().post('/api/expenses/export', payload);
      
      if (body.status) {
        // Get the CSV content as blob
        const csvContent = body.data as string;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'expenses.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showToast('Expenses exported to CSV', 'success');
      } else {
        showToast('Failed to export expenses', 'error');
      }
    } catch (error) {
      console.error('Error exporting expenses:', error);
      showToast('Failed to export expenses', 'error');
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };



  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <ExpenseLineChart 
        data={chartData}
        onAddExpense={handleAddExpense} 
      />

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
        expenses={expenses}
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
        onExport={handleExport}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
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
        onCategoryCreated={handleCategoryCreated}
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
