import React from 'react';

// Backend category interface (what comes from API)
export interface BackendCategory {
  _id: string;
  name: string;
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Frontend category interface (with UI properties)
export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string; // Changed from React.ReactNode to string
}

// Basic expense interface (what comes from API)
export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string; // Category ID
  date: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Frontend expense interface with consistent id property
export interface ExpenseWithId extends Omit<Expense, '_id'> {
  id: string;
}

// Expense with populated category details
export interface ExpenseWithCategory extends Omit<Expense, 'category'> {
  category: Category;
  createdBy: string;
  formattedDate?: string;
}

// Expense data for charts
export interface ExpenseData {
  date: string;
  amount: number;
}

export interface CategoryDistributionData {
  name: string;
  value: number;
  color: string;
}

export interface ChartData {
  monthlyData: ExpenseData[];
  categoryDistribution: CategoryDistributionData[];
}

// Statistics interface
export interface ExpenseStats {
  totalAmount: number;
  totalExpenses: number;
  averageAmount: number;
}

// Filter interfaces
export interface ExpenseFilters {
  category?: string;
  month?: string;
  startDate?: string;
  endDate?: string;
}

// Pagination interface
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API Response interfaces
export interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
}

export interface ExpenseListResponse {
  status: boolean;
  message: string;
  data: ExpenseWithCategory[];
  pagination?: PaginationInfo;
}

export interface ExpenseStatsResponse {
  status: boolean;
  message: string;
  data: ExpenseStats;
}

export interface CategoryListResponse {
  status: boolean;
  message: string;
  data: Category[];
}

export interface ChartDataResponse {
  status: boolean;
  message: string;
  data: ChartData;
}

// Form interfaces
export interface ExpenseFormData {
  title: string;
  amount: number;
  category: string;
  date: string;
}

// Export interface
export interface ExportData {
  expenses: ExpenseWithCategory[];
  filters: ExpenseFilters;
}

// Dashboard expense interface (for recent expenses and dashboard data)
export interface DashboardExpense {
  _id: string;
  title: string;
  amount: number;
  date: string;
  formattedDate?: string;
  category: {
    _id: string;
    name: string;
    color: string;
    icon?: React.ReactNode;
  };
  createdBy?: string;
}

// Dashboard data interfaces
export interface DashboardStats {
  totalExpenses: number;
  thisMonthExpenses: number;
  lastMonthExpenses: number;
  percentageChange: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentExpenses: ExpenseWithCategory[];
  expenseDistribution: CategoryDistributionData[];
  monthlyExpensesData: ExpenseData[];
}
