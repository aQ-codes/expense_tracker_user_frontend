'use client';

import React, { useState } from 'react';
import { LogoutIcon } from '@/themes/images/icon';
import { useRouter } from 'next/navigation';
import { useAuthService } from '@/module/auth/services/auth-service';
import ToastNotification from './toast-notification';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const { logout } = useAuthService();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    setIsLoggingOut(true);
    try {
  
      
      const response = await logout();
      
      
      if (response.status) {
        setToast({
          isVisible: true,
          message: 'Logged out successfully',
          type: 'success'
        });
        
        // Force redirect to login page immediately

        
        // Clear any cached state
        router.refresh();
        
        // Force a hard redirect to clear everything and bypass any cached cookies
        setTimeout(() => {
          // Clear any localStorage or sessionStorage
          localStorage.clear();
          sessionStorage.clear();
          
          // Force redirect with cache-busting
          window.location.href = '/login?logout=' + Date.now();
        }, 100);
      } else {
        setToast({
          isVisible: true,
          message: response.message || 'Logout failed',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      setToast({
        isVisible: true,
        message: 'An error occurred during logout',
        type: 'error'
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
        duration={3000}
        position="top-right"
      />
      
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 w-full flex-shrink-0 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Left Side - Mobile Menu Button and App Title */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* App Title - Mobile Only */}
            <h1 className="text-lg font-bold text-gray-900 lg:hidden ml-2">Expense Tracker</h1>
          </div>

          {/* Right Side - Logout Button */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center px-3 lg:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 ${
                isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoggingOut ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
              ) : (
                <LogoutIcon />
              )}
              <span className="font-medium hidden sm:inline">
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
