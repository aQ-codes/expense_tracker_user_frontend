// Category color mapping
export const CATEGORY_COLORS: Record<string, string> = {
  'Food': '#dcfce7',
  'Travel': '#dbeafe',
  'Bills': '#fef3c7',
  'Shopping': '#fce7f3',
  'Transport': '#f3e8ff',
  'Education': '#fef3c7',
  'Others': '#fee2e2'
};

// Default category color
export const DEFAULT_CATEGORY_COLOR = '#f3f4f6';

// Helper function to get category color
export const getCategoryColor = (categoryName: string): string => {
  return CATEGORY_COLORS[categoryName] || DEFAULT_CATEGORY_COLOR;
};

// Chart colors for different categories
export const CHART_COLORS = [
  '#fce7f3', // Shopping - Pink
  '#dbeafe', // Travel - Blue
  '#fef3c7', // Bills - Yellow
  '#dcfce7', // Food - Green
  '#f3e8ff', // Transport - Purple
  '#fee2e2', // Others - Red
  '#fef3c7', // Education - Yellow
  '#e0e7ff', // Additional - Indigo
  '#fef7cd', // Additional - Amber
  '#f0fdf4'  // Additional - Emerald
];

// Month names for filters
export const MONTHS = [
  { value: '', label: 'All Months' },
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

// Date formatting helper - using a simple format for display
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
