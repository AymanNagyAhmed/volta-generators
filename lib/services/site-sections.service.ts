import Cookies from 'js-cookie'
import {
  CreateSiteSectionPayload,
  CreateSiteSectionResult,
  GetSiteSectionResult,
  GetSiteSectionsResult,
  DeleteSiteSectionResponse,
  UpdateSiteSectionPayload,
  UpdateSiteSectionResponse
} from '@/lib/types/site-sections.types'
import { ApiError } from '@/lib/types/response.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const createSiteSection = async (payload: CreateSiteSectionPayload): Promise<CreateSiteSectionResult> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new ApiError('Unauthorized', 401, '/site-sections')
  }

  try {
    const response = await fetch(`${API_URL}/api/site-sections`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    })

    const responseData: CreateSiteSectionResult = await response.json()

    if (!response.ok) {
      throw new ApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData
  } catch (error) {
    console.error('Error in createSiteSection:', error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      'Network error',
      500,
      '/api/site-sections'
    )
  }
}

export const getAllSiteSections = async (): Promise<GetSiteSectionsResult> => {
  try {
    const response = await fetch(`${API_URL}/api/site-sections`, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: 'include',
    })

    const responseData: GetSiteSectionsResult = await response.json()

    if (!response.ok) {
      throw new ApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData
  } catch (error) {
    console.error('Error in getAllSiteSections:', error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      'Network error',
      500,
      '/api/site-sections'
    )
  }
}

export const getSiteSectionById = async (id: string): Promise<GetSiteSectionResult> => {
  try {
    const response = await fetch(`${API_URL}/api/site-sections/${id}`, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: 'include',
    })

    const responseData: GetSiteSectionResult = await response.json()

    if (!response.ok) {
      throw new ApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData
  } catch (error) {
    console.error('Error in getSiteSectionById:', error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      'Network error',
      500,
      `/api/site-sections/${id}`
    )
  }
}

export const updateSiteSection = async (id: string, payload: UpdateSiteSectionPayload): Promise<UpdateSiteSectionResponse> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new ApiError('Unauthorized', 401, '/site-sections')
  }

  try {
    const response = await fetch(`${API_URL}/api/site-sections/${id}`, {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    return response.json();
  } catch (error) {
    console.error('Error in updateSiteSection:', error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Network error', 500, `/api/site-sections/${id}`)
  }
}

export const deleteSiteSection = async (id: string): Promise<DeleteSiteSectionResponse> => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    throw new ApiError('Unauthorized', 401, '/site-sections')
  }

  try {
    const response = await fetch(`${API_URL}/api/site-sections/${id}`, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include',
    });

    const responseData: DeleteSiteSectionResponse = await response.json()

    if (!response.ok) {
      throw new ApiError(
        responseData.message,
        responseData.statusCode,
        responseData.path
      )
    }

    return responseData;
  } catch (error) {
    console.error('Error in deleteSiteSection:', error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Network error', 500, `/api/site-sections/${id}`)
  }
}