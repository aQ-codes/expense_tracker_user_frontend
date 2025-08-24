'use client';

import React, { useState } from 'react';
import { Category } from '@/interfaces/expense';
import { MONTHS } from '../constants';

interface ExpenseFiltersProps {
  categories: Category[];
  selectedCategory: string;
  selectedMonth: string;
  onCategoryChange: (categoryId: string) => void;
  onMonthChange: (month: string) => void;
  className?: string;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({ 
  categories,
  selectedCategory,
  selectedMonth,
  onCategoryChange,
  onMonthChange,
  className = "" 
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={`flex gap-4 ${className}`}>
      {/* Category Filter */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center">
            {selectedCategoryData ? (
              <>
                <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: selectedCategoryData.color }}>
                  {selectedCategoryData.icon}
                </div>
                <span className="text-gray-900">{selectedCategoryData.name}</span>
              </>
            ) : (
              <span className="text-gray-500">Filter by Category</span>
            )}
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isCategoryOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="p-2">
              <button
                onClick={() => {
                  onCategoryChange('');
                  setIsCategoryOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md text-gray-700"
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsCategoryOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md flex items-center"
                >
                  <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: category.color }}>
                    {category.icon}
                  </div>
                  <span className="text-gray-900">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Month Filter */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsMonthOpen(!isMonthOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-gray-300 transition-colors"
        >
          <span className={selectedMonth ? 'text-gray-900' : 'text-gray-500'}>
            {selectedMonth ? MONTHS.find(m => m.value === selectedMonth)?.label : 'Filter by Month'}
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isMonthOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="p-2">
              {MONTHS.map((month) => (
                <button
                  key={month.value}
                  onClick={() => {
                    onMonthChange(month.value);
                    setIsMonthOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md text-gray-700"
                >
                  {month.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseFilters;
