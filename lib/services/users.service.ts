import Cookies from 'js-cookie'
import {
  UpdateUserProfileData,
  ApiResponse,
  UserApiError,
  User,
  CreateUserPayload
} from '@/lib/types/users.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const updateUserProfile = async (userId: number, data: UpdateUserProfileData): Promise<ApiResponse> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new UserApiError('Not authenticated', 401, '/api/users')
  }

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    const responseData: ApiResponse = await response.json()

    if (!response.ok) {
      throw new UserApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    if (responseData.success) {
      Cookies.set('user_data', JSON.stringify(responseData.data), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      })

      Cookies.set('userRegistered', 'true', {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      })
    }

    return responseData
  } catch (error) {
    console.error('Error in updateUserProfile:', error)
    if (error instanceof UserApiError) {
      throw error
    }
    throw new UserApiError(
      'Network error',
      500,
      '/api/users'
    )
  }
}

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new UserApiError('Not authenticated', 401, '/api/users')
  }

  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new UserApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData.data
  } catch (error) {
    if (error instanceof UserApiError) {
      throw error
    }
    throw new UserApiError(
      'Network error',
      500,
      '/api/users'
    )
  }
}

// Get user by ID
export const getUserById = async (userId: string): Promise<User> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new UserApiError('Not authenticated', 401, '/api/users')
  }

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new UserApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData.data
  } catch (error) {
    if (error instanceof UserApiError) {
      throw error
    }
    throw new UserApiError(
      'Network error',
      500,
      '/api/users'
    )
  }
}

// Create new user
export const createUser = async (userData: CreateUserPayload): Promise<User> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new UserApiError('Not authenticated', 401, '/api/users')
  }

  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new UserApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData.data
  } catch (error) {
    if (error instanceof UserApiError) {
      throw error
    }
    throw new UserApiError(
      'Network error',
      500,
      '/api/users'
    )
  }
}

// Update user (admin function)
export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new UserApiError('Not authenticated', 401, '/api/users')
  }

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new UserApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData.data
  } catch (error) {
    if (error instanceof UserApiError) {
      throw error
    }
    throw new UserApiError(
      'Network error',
      500,
      '/api/users'
    )
  }
}

// Delete user
export const deleteUser = async (userId: string): Promise<void> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new UserApiError('Not authenticated', 401, '/api/users')
  }

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const responseData = await response.json()
      throw new UserApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }
  } catch (error) {
    if (error instanceof UserApiError) {
      throw error
    }
    throw new UserApiError(
      'Network error',
      500,
      '/api/users'
    )
  }
}
