import { BaseResponse } from './response.types';

// File upload request type
export interface SettingsFileUploadPayload {
  file: File;
}

// File upload response type
export interface SettingsFileUploadResponse extends BaseResponse {
  statusCode: number;
  path: string;
  data: {
    originalName: string;
    filename: string;
    path: string;
    size: number;
    mimetype: string;
  };
}

// Multiple files upload request type
export interface SettingsMultipleFilesUploadPayload {
  files: File[];
}

// Multiple files upload response type
export interface SettingsMultipleFilesUploadResponse extends BaseResponse {
  statusCode: number;
  path: string;
  data: Array<{
    originalName: string;
    filename: string;
    path: string;
    size: number;
    mimetype: string;
  }>;
}

export interface CreateSettingPayload {
  sectionTitle: string;
  key: string;
  value: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
}

export interface Setting {
  id: string;
  sectionTitle: string;
  sectionId: string;
  key: string;
  value: string;
  section: Section;
}

export interface CreateSettingResponse extends BaseResponse {
  statusCode: number;
  path: string;
  data?: Setting;
}

export interface GetAllSettingsResponse extends BaseResponse {
  statusCode: number;
  path: string;
  data: Setting[];
}

export interface UpdateSettingPayload {
  sectionTitle?: string;
  key?: string;
  value?: string;
}

export interface UpdateSettingResponse extends BaseResponse {
  statusCode: number;
  path: string;
  data?: Setting;
}

export interface DeleteSettingResponse extends BaseResponse {
  statusCode: number;
  path: string;
  data?: Setting;
}
