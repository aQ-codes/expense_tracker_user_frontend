'use client';

import React, { useState, useEffect } from 'react';
import { Category, Expense } from '../../../interfaces/expense';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, '_id'>) => void;
  onCancel: () => void;
  expense?: Expense | null;
  categories: Category[];
  mode: 'add' | 'edit';
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  onCancel,
  expense,
  categories,
  mode
}) => {
  const [formData, setFormData] = useState<Omit<Expense, '_id'>>({
    title: '',
    amount: 0,
    category: '',
    date: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (expense && mode === 'edit') {
      setFormData({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date
      });
      setSelectedDate(new Date(expense.date));
    } else {
      setFormData({
        title: '',
        amount: 0,
        category: '',
        date: ''
      });
      setSelectedDate(null);
    }
    setErrors({});
  }, [expense, mode]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: formattedDate }));
    setIsDatePickerOpen(false);
  };

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getCurrentMonthYear = () => {
    const date = selectedDate || new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth()
    };
  };

  const { year, month } = getCurrentMonthYear();
  const calendarDays = generateCalendarDays(year, month);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g. Monthly Rent"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
          placeholder="e.g. 500"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.date}
            readOnly
            placeholder="Select Date"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date}</p>
        )}

        {/* Date Picker */}
        {isDatePickerOpen && (
          <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">
                {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    const newDate = new Date(year, month - 1);
                    setSelectedDate(newDate);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newDate = new Date(year, month + 1);
                    setSelectedDate(newDate);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === month;
                const isSelected = selectedDate && 
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear();
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`p-2 text-sm rounded hover:bg-gray-100 ${
                      isSelected
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : isCurrentMonth
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setSelectedDate(null);
                  setFormData(prev => ({ ...prev, date: '' }));
                  setIsDatePickerOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  handleDateSelect(today);
                }}
                className="text-purple-600 hover:text-purple-700"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {mode === 'add' ? 'Add Expense' : 'Update Expense'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
