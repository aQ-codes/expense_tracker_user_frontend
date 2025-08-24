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
  icon: React.ReactNode;
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
export interface ApiResponse<T = any> {
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
