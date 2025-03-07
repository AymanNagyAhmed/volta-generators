import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = [
    '/',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/api',
    '/forgot-password',
  ].includes(path) || 
    path.startsWith('/_next') || 
    path.startsWith('/static') ||
    path.includes('.') // For static files like images, etc.
  
  // Check if user is authenticated by looking for the access token
  const token = request.cookies.get('access_token')?.value
  const isAuthenticated = !!token
  
  // Get user data to check role for admin routes
  const userData = request.cookies.get('user_data')?.value
  let isAdmin = false
  
  if (userData) {
    try {
      const user = JSON.parse(userData)
      isAdmin = user.role === 'admin'
    } catch (error) {
      console.error('Error parsing user data in middleware:', error)
    }
  }
  
  // Define admin paths that require admin role
  const isAdminPath = path.startsWith('/dashboard') || path.startsWith('/admin')
  
  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to login if trying to access protected route without authentication
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (isAuthenticated && (path === '/login' || path === '/register')) {
    // Redirect to home if trying to access login/register while already authenticated
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  if (isAdminPath && !isAdmin) {
    // Redirect to home if trying to access admin routes without admin role
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes that might be handled by API routes
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization files)
     * 4. /favicon.ico (favicon file)
     * 5. /public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 