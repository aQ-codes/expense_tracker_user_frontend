'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthService } from '@/module/auth/services/auth-service';
import ToastNotification from './toast-notification';

const Header: React.FC = () => {
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
      console.log('Starting logout process...');
      
      const response = await logout();
      console.log('Logout response:', response);
      
      if (response.status) {
        setToast({
          isVisible: true,
          message: 'Logged out successfully',
          type: 'success'
        });
        
        // Force redirect to login page immediately
        console.log('Redirecting to login page...');
        
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
      
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 w-full flex-shrink-0 h-16 flex items-center">
        <div className="flex items-center justify-end w-full">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 ${
              isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )}
            <span className="font-medium">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
