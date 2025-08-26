'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthService } from '@/module/auth/services/auth-service';
import { DashboardIcon, ExpensesIcon, MonthlyBreakdownIcon, UserProfileIcon } from '@/themes/images/icon';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SideNavbarProps {
  onClose?: () => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ onClose }) => {
  const pathname = usePathname();
  const { getCurrentUser } = useAuthService();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();

        if (userData && userData.name && userData.email) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Remove getCurrentUser from dependencies to prevent infinite loops

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      name: 'Expenses',
      href: '/expenses',
      icon: <ExpensesIcon />,
    },
    {
      name: 'Monthly Breakdown',
      href: '/monthly-breakdown',
      icon: <MonthlyBreakdownIcon />,
    },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col flex-shrink-0">
      {/* App Title */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
        
        {/* Close Button - Mobile Only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
            <UserProfileIcon />
          </div>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          ) : user ? (
            <>
              <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{user.email}</p>
            </>
          ) : (
            <div className="text-sm text-gray-500">User not found</div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
