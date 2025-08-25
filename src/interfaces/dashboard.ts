// Dashboard interfaces
import { DashboardExpense, CategoryDistributionData } from './expense';

export interface DatePickerData {
  startDate: string;
  endDate: string;
  week: number;
}

export interface DashboardData {
  totalExpenses: number;
  monthlyExpenses: number;
  averageExpenses: number;
  recentExpenses: DashboardExpense[];
  categoryDistribution: CategoryDistributionData[];
}
