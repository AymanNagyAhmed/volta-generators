import { RegisterFormData, LoginFormData, type LoginResponse, RegisterResponse } from "@/lib/types/auth.types"
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number,
    public path: string
  ) {
    super(message)
    this.name = "AuthError"
  }
}

export const loginUser = async (credentials: LoginFormData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new AuthError(
        errorData.message || 'Login failed',
        response.status,
        '/api/auth/login'
      )
    }

    const data = await response.json()
    // Set cookies with all necessary data
    Cookies.set('access_token', data.data.access_token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    // Store full user data in cookies
    Cookies.set('user_data', JSON.stringify(data.data.user), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    return data
  } catch (error) {
    console.error('Login service error:', error)
    if (error instanceof AuthError) {
      throw error
    }
    throw new AuthError(
      "Network error",
      500,
      "/api/auth/login"
    )
  }
} 

export const registerUser = async (credentials: RegisterFormData): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return response.json();
  } catch (error) {
    console.error('Error in registerUser:', error)
    if (error) {
      throw error
    }
    throw new AuthError('Network error', 500, '/api/auth/register')
  }
}

// Get user data from cookies
export const getUserFromCookies = () => {
  const userDataCookie = Cookies.get('user_data');
  if (!userDataCookie) return null;
  
  try {
    return JSON.parse(userDataCookie);
  } catch (error) {
    console.error('Error parsing user data from cookies:', error);
    return null;
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = Cookies.get('access_token');
  const userData = getUserFromCookies();
  return !!token && !!userData;
}

// Check if user has admin role
export const isAdmin = () => {
  const userData = getUserFromCookies();
  return userData && userData.role === 'admin';
}

// Logout user by removing cookies
export const logoutUser = () => {
  Cookies.remove('access_token');
  Cookies.remove('user_data');
}