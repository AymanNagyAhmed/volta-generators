import Cookies from 'js-cookie'
import { SettingsFileUploadPayload, SettingsFileUploadResponse, SettingsMultipleFilesUploadPayload, SettingsMultipleFilesUploadResponse, CreateSettingPayload, CreateSettingResponse, GetAllSettingsResponse, UpdateSettingPayload, UpdateSettingResponse, DeleteSettingResponse } from '../types/settings.types';
import { ApiError } from '../types/response.types';


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const settingsService = {
  async uploadSingleFile(payload: SettingsFileUploadPayload): Promise<SettingsFileUploadResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings/upload-single')
    }

    try {

    const formData = new FormData();
    formData.append('file', payload.file);

    const response = await fetch(`${API_URL}/settings/upload-single`, {
      method: 'POST',
      body: formData,
    });

      return response.json();
    } catch (error) {
      console.error('Error in uploadSingleFile:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error', 500, '/settings/upload-single')
    }
  },

  async uploadMultipleFiles(payload: SettingsMultipleFilesUploadPayload): Promise<SettingsMultipleFilesUploadResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings/upload-multiple')
    }

    try {

    const formData = new FormData();
    payload.files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_URL}/settings/upload-multiple`, {
      method: 'POST',
      body: formData,
    });

      return response.json();
    } catch (error) {
      console.error('Error in uploadMultipleFiles:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error', 500, '/settings/upload-multiple')
    }
  },

  async createSetting(payload: CreateSettingPayload): Promise<CreateSettingResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings')
    }

    try {

    const response = await fetch(`${API_URL}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

      return response.json();
    } catch (error) {
      console.error('Error in createSetting:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error', 500, '/settings')
    }
  },

  async getAllSettings(): Promise<GetAllSettingsResponse> {
    const response = await fetch(`${API_URL}/settings`, {
      method: 'GET',
    });

    return response.json();
  },

  async updateSetting(id: string, payload: UpdateSettingPayload): Promise<UpdateSettingResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings')
    }

    try {

    const response = await fetch(`${API_URL}/settings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

      return response.json();
    } catch (error) {
      console.error('Error in updateSetting:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error', 500, '/settings')
    }
  },

  async deleteSetting(id: string): Promise<DeleteSettingResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings')
    }

    try {

    const response = await fetch(`${API_URL}/settings/${id}`, {
      method: 'DELETE',
    });

    return response.json();
    } catch (error) {
      console.error('Error in deleteSetting:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error', 500, '/settings')
    }
  },
};