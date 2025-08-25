import React from 'react';
import { 
  EmptyChartIcon
} from '@/themes/images/icon';

// ===== MONTHLY BREAKDOWN ICONS =====
export const MONTHLY_BREAKDOWN_ICONS: Record<string, React.ComponentType> = {
  emptyChart: EmptyChartIcon
};

// ===== HELPER FUNCTIONS =====
export const getMonthlyBreakdownIcon = (iconName: string): React.ComponentType => {
  return MONTHLY_BREAKDOWN_ICONS[iconName] || EmptyChartIcon;
};

// ===== CONVENIENCE EXPORTS =====
export {
  EmptyChartIcon
};
