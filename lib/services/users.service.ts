import Cookies from 'js-cookie'
import {
  UpdateUserProfileData,
  ApiResponse,
  UserApiError
} from '@/lib/types/users.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const updateUserProfile = async (userId: number, data: UpdateUserProfileData): Promise<ApiResponse> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new UserApiError('Not authenticated', 401, '/api/users')
  }

  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
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
