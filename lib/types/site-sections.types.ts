export interface CreateSiteSectionPayload {
  title: string;
  description: string;
}

export interface SiteSetting {
  id: string;
  sectionTitle: string;
  sectionId: string;
  key: string;
  value: string;
  section: SiteSection;
}

export interface SiteSection {
  id: string;
  title: string;
  description: string;
  settings: SiteSetting[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
}

export interface SiteSectionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  data: SiteSection;
}

export interface SiteSectionsListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  data: SiteSection[];
}

export interface DeleteSiteSectionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  data?: SiteSection; // Optional since it won't be present in error responses
}

export interface UpdateSiteSectionPayload {
  title?: string;
  description?: string;
}

export interface UpdateSiteSectionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  data?: SiteSection;
}

// Types for different API responses
export type CreateSiteSectionResult = SiteSectionResponse | ApiErrorResponse;
export type GetSiteSectionResult = SiteSectionResponse | ApiErrorResponse;
export type GetSiteSectionsResult = SiteSectionsListResponse | ApiErrorResponse;
export type DeleteSiteSectionResult = DeleteSiteSectionResponse | ApiErrorResponse;
export type UpdateSiteSectionResult = UpdateSiteSectionResponse | ApiErrorResponse;
