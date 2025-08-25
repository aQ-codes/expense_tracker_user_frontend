'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthService } from '@/module/auth/services/auth-service';

export default function CatchAllPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthService();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          // If authenticated, redirect to dashboard instead of showing 404
          router.replace('/dashboard');
        }
        // If not authenticated, stay on this page and show 404
      } catch (error) {
        console.error('Auth check failed:', error);
        // Stay on this page and show 404
      }
    };

    checkAuthAndRedirect();
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
