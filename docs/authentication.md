# Authentication Middleware

This document explains how authentication is implemented in the application using Next.js middleware.

## Overview

The application uses a middleware-based approach to handle authentication and authorization at the routing level. This means that protected routes are secured before the page components are even loaded, providing better security and user experience.

## How It Works

1. **Middleware Execution**: Next.js middleware runs before a request is completed, allowing us to check authentication status and redirect users if needed.

2. **Authentication Check**: The middleware checks for the presence of an `access_token` cookie to determine if a user is authenticated.

3. **Role-Based Authorization**: For admin routes (like `/dashboard`), the middleware also checks the user's role from the `user_data` cookie.

4. **Redirects**:
   - Unauthenticated users trying to access protected routes are redirected to `/login`
   - Authenticated users trying to access login/register pages are redirected to `/profile`
   - Non-admin users trying to access admin routes are redirected to `/profile`

## Implementation Details

The middleware is implemented in the root `middleware.ts` file and uses Next.js's built-in middleware capabilities:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Authentication and authorization logic
  // ...
  
  // Redirect logic based on authentication status and user role
  // ...
  
  return NextResponse.next()
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
```

## Public vs. Protected Routes

- **Public Routes**: Routes like `/`, `/login`, `/register`, `/about`, `/contact` are accessible to all users.
- **Protected Routes**: Routes that require authentication, such as `/profile`, `/settings`, etc.
- **Admin Routes**: Routes that require admin role, such as `/dashboard`, `/admin/*`.

## Authentication Service

The authentication service (`auth.service.ts`) provides functions for:

- User login/registration
- Getting user data from cookies
- Checking authentication status
- Checking admin role
- Logging out users

## Client-Side vs. Middleware Authentication

While the middleware handles route protection at the server level, some components may still use client-side authentication checks for specific UI elements or actions. However, the primary security boundary is enforced by the middleware.

## Testing

The middleware is tested using Jest to ensure it correctly:

- Allows access to public paths without authentication
- Redirects to login when accessing protected routes without authentication
- Allows authenticated users to access protected routes
- Redirects authenticated users away from login/register pages
- Redirects non-admin users from admin routes
- Allows admin users to access admin routes

## Best Practices

1. Always use the middleware for route protection rather than relying solely on client-side checks
2. Keep sensitive user data out of client-side code
3. Use secure, HTTP-only cookies for storing authentication tokens
4. Implement proper token expiration and refresh mechanisms
5. Consider implementing rate limiting for authentication endpoints 