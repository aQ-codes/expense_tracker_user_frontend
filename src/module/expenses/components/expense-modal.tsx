'use client';

import React from 'react';
import CustomModal from '../../../themes/components/custom-modal';
import ExpenseForm from './expense-form';
import { Category, Expense } from '@/interfaces/expense';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expense: Omit<Expense, '_id'>) => void;
  expense?: Expense | null;
  categories: Category[];
  mode: 'add' | 'edit';
  onCategoryCreated?: (newCategory: Category) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  expense,
  categories,
  mode,
  onCategoryCreated
}) => {
  const handleSubmit = (formData: Omit<Expense, '_id'>) => {
    onSubmit(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const modalTitle = mode === 'add' ? 'Add New Expense' : 'Edit Expense';

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      size="md"
    >
      <ExpenseForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        expense={expense}
        categories={categories}
        mode={mode}
        onCategoryCreated={onCategoryCreated}
      />
    </CustomModal>
  );
};

export default ExpenseModal;
