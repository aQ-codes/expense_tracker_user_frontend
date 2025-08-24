'use client';

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 w-full">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Expense Tracker</h1>
        </div>

        {/* Right side - Logout */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
