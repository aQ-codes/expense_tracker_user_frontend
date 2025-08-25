import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/themes/images/icon';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  position?: 'center' | 'top';
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  position = 'center'
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-8'
  };

  const modalContent = (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4 ${positionClasses[position]}`}>
      <div className={`bg-white rounded-xl p-6 w-full max-h-[90vh] overflow-y-auto ${sizeClasses[size]}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Content */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );

  // Render modal at root level using portal
  return createPortal(modalContent, document.body);
};

export default CustomModal;
