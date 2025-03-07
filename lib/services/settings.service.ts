import Cookies from 'js-cookie'
import { SettingsFileUploadPayload, SettingsFileUploadResponse, SettingsMultipleFilesUploadPayload, SettingsMultipleFilesUploadResponse, CreateSettingPayload, CreateSettingResponse, GetAllSettingsResponse, UpdateSettingPayload, UpdateSettingResponse, DeleteSettingResponse } from '../types/settings.types';
import { ApiError } from '../types/response.types';


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const settingsService = {
  async uploadSingleFile(payload: SettingsFileUploadPayload): Promise<SettingsFileUploadResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings/upload-single')
    }

    try {
      const formData = new FormData();
      formData.append('file', payload.file);

      const response = await fetch(`${API_URL}/api/settings/upload-single`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to upload file',
          response.status,
          '/settings/upload-single'
        );
      }

      return data;
    } catch (error) {
      console.error('Error in uploadSingleFile:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to upload file. Please try again.', 500, '/settings/upload-single');
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

      const response = await fetch(`${API_URL}/api/settings/upload-multiple`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to upload files',
          response.status,
          '/settings/upload-multiple'
        );
      }

      return data;
    } catch (error) {
      console.error('Error in uploadMultipleFiles:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to upload files. Please try again.', 500, '/settings/upload-multiple');
    }
  },

  async createSetting(payload: CreateSettingPayload): Promise<CreateSettingResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings')
    }

    try {
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to create setting',
          response.status,
          '/settings'
        );
      }

      return data;
    } catch (error) {
      console.error('Error in createSetting:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to create setting. Please try again.', 500, '/settings');
    }
  },

  async getAllSettings(): Promise<GetAllSettingsResponse> {
    try {
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to fetch settings',
          response.status,
          '/settings'
        );
      }

      return data;
    } catch (error) {
      console.error('Error in getAllSettings:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch settings. Please try again.', 500, '/settings');
    }
  },

  async updateSetting(id: string, payload: UpdateSettingPayload): Promise<UpdateSettingResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings')
    }

    try {
      const response = await fetch(`${API_URL}/api/settings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to update setting',
          response.status,
          '/settings'
        );
      }

      return data;
    } catch (error) {
      console.error('Error in updateSetting:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update setting. Please try again.', 500, '/settings');
    }
  },

  async deleteSetting(id: string): Promise<DeleteSettingResponse> {
    const accessToken = Cookies.get('access_token')

    if (!accessToken) {
      throw new ApiError('Unauthorized', 401, '/settings')
    }

    try {
      const response = await fetch(`${API_URL}/api/settings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Failed to delete setting',
          response.status,
          '/settings'
        );
      }

      return data;
    } catch (error) {
      console.error('Error in deleteSetting:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to delete setting. Please try again.', 500, '/settings');
    }
  },
};