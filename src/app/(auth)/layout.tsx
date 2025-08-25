
import React from 'react';
import Image from 'next/image';
import banner1 from '@/themes/images/banner1.webp';
import banner2 from '@/themes/images/banner2.webp';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <div className="min-h-screen flex">
        {/* Left Panel - Auth Form */}
        <div className="w-[45%] bg-white flex flex-col justify-center px-12">
          <div className="max-w-md mx-auto w-full">
            {children}
          </div>
        </div>

        {/* Right Panel - Images and Decorative Elements */}
        <div className="w-[55%] bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0">
            {/* Large decorative shapes */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 bg-purple-300 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-25"></div>
            
            {/* L-shaped decorative line */}
            <div className="absolute bottom-10 right-10 w-32 h-1 bg-purple-300 opacity-50"></div>
            <div className="absolute bottom-10 right-10 w-1 h-32 bg-purple-300 opacity-50"></div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-purple-400 rounded-full opacity-20"></div>
            <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-30"></div>
          </div>

          {/* Images Container */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center">
            {/* Banner 1 - Larger image, positioned slightly left */}
            <div className="flex items-center mb-6">
              <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg ml-8">
                <Image
                  src={banner1}
                  alt="Expense Tracker Banner 1"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Logo and App Name next to first image */}
              <div className="ml-6 max-w-xs">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-purple-800">ExpenseTracker</h2>
                </div>
                <p className="text-purple-600 text-sm leading-relaxed">
                  Your personal finance companion
                </p>
              </div>
            </div>
            
            {/* Banner 2 - Smaller image, positioned slightly right */}
            <div className="flex items-center justify-end">
              {/* Tagline next to second image */}
              <div className="mr-6 text-right max-w-xs">
                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  Smart Spending, 
                </h2>
                <h2 className="text-2xl font-bold text-purple-300">
                  Brighter Future
                </h2>
              </div>
              <div className="w-88 h-60 rounded-lg overflow-hidden shadow-lg mr-8">
                <Image
                  src={banner2}
                  alt="Expense Tracker Banner 2"
                  width={250}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}