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
      <div className="w-full lg:w-[45%] bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center px-6 lg:px-12 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/30 opacity-40"></div>
        
        <div className="max-w-md mx-auto w-full relative z-10">
          {/* Glassmorphism container */}
          <div className="backdrop-blur-sm bg-white/70 p-8 rounded-3xl shadow-xl border border-white/20">
            {children}
          </div>
        </div>
      </div>

      {/* Right Panel - Images and Decorative Elements */}
      <div className="hidden lg:block w-[55%] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Modern geometric background elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes with modern gradients */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl opacity-20 transform rotate-12 animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl opacity-30 transform -rotate-6"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-25 transform rotate-45"></div>
          
          {/* Modern line elements */}
          <div className="absolute bottom-10 right-10">
            <div className="w-32 h-[2px] bg-gradient-to-r from-purple-400 to-transparent rounded-full opacity-60"></div>
            <div className="w-[2px] h-32 bg-gradient-to-b from-purple-400 to-transparent rounded-full opacity-60 ml-auto"></div>
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl opacity-25 transform rotate-12"></div>
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
        </div>

        {/* Images Container */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-center">
          {/* Banner 1 - Larger image with modern styling */}
          <div className="flex items-center mb-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-md ml-8 border border-white/20 backdrop-blur-sm">
                <Image
                  src={banner1}
                  alt="Expense Tracker Banner 1"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
            
            {/* Logo and App Name with modern styling */}
            <div className="ml-8 max-w-xs">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent">
                  ExpenseTracker
                </h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Your personal finance companion for a smarter tomorrow
              </p>
            </div>
          </div>
          
          {/* Banner 2 - Smaller image with modern styling */}
          <div className="flex items-center justify-end">
            {/* Tagline with modern gradient text */}
            <div className="mr-12 text-right max-w-xs">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 leading-tight">
                Smart Spending,
              </h2>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                Brighter Future
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4 ml-auto"></div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative w-90 h-60 rounded-2xl overflow-hidden shadow-md mr-8 border border-white/20 backdrop-blur-sm">
                <Image
                  src={banner2}
                  alt="Expense Tracker Banner 2"
                  width={320}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-40 animate-ping animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-pink-400 rounded-full opacity-50 animate-ping animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
}