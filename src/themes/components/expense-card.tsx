'use client';

import React, { useState, useEffect } from 'react';
import { DeleteIcon, EditIcon } from '@/themes/images/icon';

interface ExpenseCardProps {
  expense: {
    _id?: string;
    id?: string;
    title: string;
    amount: number;
    date: string;
    formattedDate?: string;
    category: {
      name: string;
      color: string;
      icon?: React.ReactNode;
      _id?: string;
    } | string;
    categoryColor?: string;
  };
  onDelete?: (expenseId: string) => void;
  onEdit?: (expense: any) => void;
  showActions?: boolean;
  className?: string;
  variant?: 'list' | 'recent';
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  expense, 
  onDelete, 
  onEdit, 
  showActions = true,
  className = "",
  variant = 'list'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the expense ID (handle both _id and id properties)
  const expenseId = expense._id || expense.id || '';
  
  // Get category info (handle both object and string formats)
  const categoryName = typeof expense.category === 'string' ? expense.category : expense.category.name;
  const categoryColor = typeof expense.category === 'string' ? expense.categoryColor : expense.category.color;
  const categoryIcon = typeof expense.category === 'string' ? null : expense.category.icon;
  
  // State for dynamic icon loading
  const [dynamicIcon, setDynamicIcon] = useState<React.ReactNode>(null);

  // Load icon dynamically for recent expenses variant
  useEffect(() => {
    if (variant === 'recent' && !categoryIcon && categoryName) {
      const loadIcon = async () => {
        const { getCategoryIcon } = await import('@/themes/images/icon');
        const icon = getCategoryIcon(categoryName);
        setDynamicIcon(icon);
      };
      loadIcon();
    }
  }, [variant, categoryIcon, categoryName]);

  // Also load icon for list variant if it's missing
  useEffect(() => {
    if (variant === 'list' && !categoryIcon && categoryName) {
      const loadIcon = async () => {
        const { getCategoryIcon } = await import('@/themes/images/icon');
        const icon = getCategoryIcon(categoryName);
        setDynamicIcon(icon);
      };
      loadIcon();
    }
  }, [variant, categoryIcon, categoryName]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
    return dateString;
  };

  const displayDate = expense.formattedDate || formatDate(expense.date);

  if (variant === 'recent') {
    return (
      <div 
        className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          {/* Category Icon */}
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryIcon || dynamicIcon}
          </div>
          
          {/* Expense Details */}
          <div>
            <p className="font-medium text-gray-900">{expense.title}</p>
            <p className="text-sm text-gray-500">{displayDate}</p>
          </div>
        </div>
        
        {/* Right Side - Amount and Actions */}
        <div className="flex items-center space-x-2">
          {/* Delete Button (shown on hover) */}
          {showActions && isHovered && onDelete && (
            <button
              onClick={() => onDelete(expenseId)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete expense"
            >
              <DeleteIcon />
            </button>
          )}

          {/* Amount */}
          <span className="text-red-600 font-semibold mr-2">
            - ${expense.amount.toLocaleString()}
          </span>

          {/* Edit Button */}
          {showActions && onEdit && (
            <button
              onClick={() => onEdit(expense)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit expense"
            >
              <EditIcon />
            </button>
          )}
        </div>
      </div>
    );
  }

  // List variant (original expense list card)
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-3">
        {/* Left Side - Icon and Details */}
        <div className="flex items-center flex-1">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryIcon || dynamicIcon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{expense.title}</h4>
            <p className="text-sm text-gray-500">{displayDate}</p>
          </div>
        </div>

        {/* Right Side - Amount and Actions */}
        <div className="flex items-center space-x-2">
          {/* Delete Button (shown on hover) */}
          {showActions && isHovered && onDelete && (
            <button
              onClick={() => onDelete(expenseId)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete expense"
            >
              <DeleteIcon />
            </button>
          )}

          {/* Amount */}
          <div className="bg-red-50 border border-red-200 rounded-full px-3 py-1">
            <span className="text-red-600 font-medium text-sm">
              -${expense.amount.toLocaleString()}
            </span>
          </div>

          {/* Edit Button */}
          {showActions && onEdit && (
            <button
              onClick={() => onEdit(expense)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit expense"
            >
              <EditIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
