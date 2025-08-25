import React from 'react';
import { 
  FoodIcon, 
  TravelIcon, 
  BillsIcon, 
  ShoppingIcon, 
  TransportIcon, 
  EducationIcon, 
  OthersIcon, 
  DefaultIcon,
  getCategoryIcon as getIconFromTheme,
  SearchIcon,
  FilterIcon,
  EditIcon,
  DeleteIcon,
  EmptyChartIcon,
  EmptyDataIcon,
  EyeIcon,
  EyeOffIcon
} from '@/themes/images/icon';

// ===== CATEGORY ICONS =====
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Food': <FoodIcon />,
  'Travel': <TravelIcon />,
  'Bills': <BillsIcon />,
  'Shopping': <ShoppingIcon />,
  'Transport': <TransportIcon />,
  'Education': <EducationIcon />,
  'Others': <OthersIcon />
};

// ===== EXPENSE ACTION ICONS =====
export const EXPENSE_ACTION_ICONS: Record<string, React.ComponentType> = {
  search: SearchIcon,
  filter: FilterIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon
};

// ===== DATA ICONS =====
export const DATA_ICONS: Record<string, React.ComponentType> = {
  emptyChart: EmptyChartIcon,
  emptyData: EmptyDataIcon
};

// Default icon for unknown categories
export const DEFAULT_CATEGORY_ICON = <DefaultIcon />;

// ===== HELPER FUNCTIONS =====
// Helper function to get category icon
export const getCategoryIcon = (categoryName: string): React.ReactNode => {
  return CATEGORY_ICONS[categoryName] || DEFAULT_CATEGORY_ICON;
};

// Alternative helper function that uses the theme icons directly
export const getCategoryIconFromTheme = (categoryName: string): React.ReactNode => {
  return getIconFromTheme(categoryName);
};

// Helper function to get expense action icon
export const getExpenseActionIcon = (iconName: string): React.ComponentType => {
  return EXPENSE_ACTION_ICONS[iconName] || EditIcon;
};

// Helper function to get data icon
export const getDataIcon = (iconName: string): React.ComponentType => {
  return DATA_ICONS[iconName] || EmptyDataIcon;
};

// ===== CONVENIENCE EXPORTS =====
export {
  FoodIcon,
  TravelIcon,
  BillsIcon,
  ShoppingIcon,
  TransportIcon,
  EducationIcon,
  OthersIcon,
  DefaultIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  DeleteIcon,
  EmptyChartIcon,
  EmptyDataIcon,
  EyeIcon,
  EyeOffIcon
};
