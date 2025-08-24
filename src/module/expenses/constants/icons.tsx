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
  getCategoryIcon as getIconFromTheme
} from '@/themes/images/icon';

// Category icon mapping
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Food': <FoodIcon />,
  'Travel': <TravelIcon />,
  'Bills': <BillsIcon />,
  'Shopping': <ShoppingIcon />,
  'Transport': <TransportIcon />,
  'Education': <EducationIcon />,
  'Others': <OthersIcon />
};

// Default icon for unknown categories
export const DEFAULT_CATEGORY_ICON = <DefaultIcon />;

// Helper function to get category icon
export const getCategoryIcon = (categoryName: string): React.ReactNode => {
  return CATEGORY_ICONS[categoryName] || DEFAULT_CATEGORY_ICON;
};

// Alternative helper function that uses the theme icons directly
export const getCategoryIconFromTheme = (categoryName: string): React.ReactNode => {
  return getIconFromTheme(categoryName);
};
