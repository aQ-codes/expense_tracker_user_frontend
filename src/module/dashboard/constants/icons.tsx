import React from 'react';
import { 
  TotalExpenseIcon,
  MonthlyExpenseIcon,
  AverageExpenseIcon,
  TrendArrowIcon,
  RecentExpensesIcon,
  EmptyChartIcon
} from '@/themes/images/icon';

// ===== DASHBOARD ICONS =====
export const DASHBOARD_ICONS = {
  totalExpense: TotalExpenseIcon,
  monthlyExpense: MonthlyExpenseIcon,
  averageExpense: AverageExpenseIcon,
  trendArrow: TrendArrowIcon,
  recentExpenses: RecentExpensesIcon,
  emptyChart: EmptyChartIcon
};

// ===== HELPER FUNCTIONS =====
export const getDashboardIcon = (iconName: string): React.ComponentType => {
  return DASHBOARD_ICONS[iconName] || EmptyChartIcon;
};

// ===== CONVENIENCE EXPORTS =====
export {
  TotalExpenseIcon,
  MonthlyExpenseIcon,
  AverageExpenseIcon,
  TrendArrowIcon,
  RecentExpensesIcon,
  EmptyChartIcon
};
