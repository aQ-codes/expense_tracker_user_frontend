
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
          <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center">
            {/* Placeholder for first image */}
            <div className="w-64 h-64 bg-purple-200 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-purple-600 text-sm">Image 1</span>
            </div>
            
            {/* Placeholder for second image */}
            <div className="w-48 h-48 bg-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-purple-700 text-sm">Image 2</span>
            </div>
          </div>
        </div>
      </div>
  );
}