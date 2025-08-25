import React from 'react';
import { 
  EyeIcon,
  EyeOffIcon
} from '@/themes/images/icon';

// ===== AUTH ICONS =====
export const AUTH_ICONS: Record<string, React.ComponentType> = {
  eye: EyeIcon,
  eyeOff: EyeOffIcon
};

// ===== HELPER FUNCTIONS =====
export const getAuthIcon = (iconName: string): React.ComponentType => {
  return AUTH_ICONS[iconName] || EyeIcon;
};

// ===== CONVENIENCE EXPORTS =====
export {
  EyeIcon,
  EyeOffIcon
};
