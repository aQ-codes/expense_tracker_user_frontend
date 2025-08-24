export interface Category {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
}

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseWithCategory extends Omit<Expense, 'category'> {
  category: Category;
  createdBy: string;
}

export interface ExpenseData {
  date: string;
  amount: number;
}
