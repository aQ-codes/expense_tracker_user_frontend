'use client';

import React from 'react';
import { EmptyDataIcon } from '@/themes/images/icon';
import { ExpenseWithCategory } from '@/interfaces/expense';
import ExpenseCard from '@/themes/components/expense-card';
import Pagination from '@/themes/components/pagination';

interface ExpenseListProps {
  expenses: ExpenseWithCategory[];
  onDelete: (expenseId: string) => void;
  onEdit: (expense: ExpenseWithCategory) => void;
  onExport: () => void;
  className?: string;
  currentPage?: number;

  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  loading?: boolean;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onDelete, 
  onEdit, 
  onExport,
  className = "",
  currentPage = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  loading = false
}) => {

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">All Expenses</h3>
        <button
          onClick={onExport}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to CSV
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading expenses...</p>
        </div>
      )}

      {/* Expense List */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
              variant="list"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && expenses.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <EmptyDataIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
          <p className="text-gray-500">Start adding expenses to see them here.</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalItems > 0 && onPageChange && (
        <div className="border-t border-gray-200 px-4 sm:px-6">
          <Pagination
            total={totalItems}
            pageSize={itemsPerPage}
            current={currentPage}
            onChange={onPageChange}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
