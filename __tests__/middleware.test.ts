import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '../middleware';

// Mock NextResponse
jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      next: jest.fn(() => 'next response'),
      redirect: jest.fn((url) => ({ redirectUrl: url })),
    },
  };
});

describe('Authentication Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to create a mock request
  const createMockRequest = (path: string, cookies: Record<string, string> = {}) => {
    const url = `http://localhost:3000${path}`;
    const request = {
      nextUrl: new URL(url),
      url,
      cookies: {
        get: (name: string) => {
          if (cookies[name]) {
            return { value: cookies[name] };
          }
          return undefined;
        },
      },
    } as unknown as NextRequest;
    return request;
  };

  test('allows access to public paths without authentication', () => {
    const publicPaths = ['/', '/login', '/register', '/about', '/contact'];
    
    publicPaths.forEach(path => {
      const req = createMockRequest(path);
      middleware(req);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });

  test('redirects to login when accessing protected routes without authentication', () => {
    const protectedPaths = ['/profile', '/settings', '/orders'];
    
    protectedPaths.forEach(path => {
      const req = createMockRequest(path);
      middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(expect.objectContaining({
        pathname: '/login'
      }));
      expect(NextResponse.next).not.toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });

  test('allows authenticated users to access protected routes', () => {
    const protectedPaths = ['/profile', '/settings', '/orders'];
    const cookies = {
      'access_token': 'valid-token',
      'user_data': JSON.stringify({ id: '1', name: 'Test User', role: 'user' })
    };
    
    protectedPaths.forEach(path => {
      const req = createMockRequest(path, cookies);
      middleware(req);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });

  test('redirects authenticated users away from login/register pages', () => {
    const authPages = ['/login', '/register'];
    const cookies = {
      'access_token': 'valid-token',
      'user_data': JSON.stringify({ id: '1', name: 'Test User', role: 'user' })
    };
    
    authPages.forEach(path => {
      const req = createMockRequest(path, cookies);
      middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(expect.objectContaining({
        pathname: '/profile'
      }));
      expect(NextResponse.next).not.toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });

  test('redirects non-admin users from admin routes', () => {
    const adminPaths = ['/dashboard', '/admin/users'];
    const cookies = {
      'access_token': 'valid-token',
      'user_data': JSON.stringify({ id: '1', name: 'Test User', role: 'user' })
    };
    
    adminPaths.forEach(path => {
      const req = createMockRequest(path, cookies);
      middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(expect.objectContaining({
        pathname: '/profile'
      }));
      expect(NextResponse.next).not.toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });

  test('allows admin users to access admin routes', () => {
    const adminPaths = ['/dashboard', '/admin/users'];
    const cookies = {
      'access_token': 'valid-token',
      'user_data': JSON.stringify({ id: '1', name: 'Admin User', role: 'admin' })
    };
    
    adminPaths.forEach(path => {
      const req = createMockRequest(path, cookies);
      middleware(req);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });
}); 