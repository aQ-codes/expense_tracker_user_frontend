import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_COOKIE_NAME = 'token';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  // Debug logging

  // Allow all static assets to pass through
  if (
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|css|js)$/) || 
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Public routes (login, signup) - exclude root path
  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if token is valid (not empty or just whitespace)
  const isValidToken = token && token.trim().length > 0 && token !== 'undefined' && token !== 'null';

  // If user has a valid token and trying to access public routes, redirect to dashboard
  if (isValidToken && isPublicRoute) {

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!isValidToken && !isPublicRoute && pathname !== '/') {

    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For root path, let the page component handle the redirect
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Let the catch-all route handle invalid routes
  // This allows us to show 404 pages while staying on the same URL

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};