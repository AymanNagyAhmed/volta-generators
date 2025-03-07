export interface CreateUserPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  role: 'user' | 'admin';
  email: string;
  fullName: string | null;
  phoneNumber: string | null;
  dateOfBirth: string;
  password: string;
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

export interface CreateUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  data: User;
}

// Type that can be either successful response or error response
export type CreateUserResult = CreateUserResponse | ApiErrorResponse;

// Additional types needed for updateUserProfile
export interface UpdateUserProfileData {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  password?: string;
  role?: 'user' | 'admin';
}

export class UserApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public path: string
  ) {
    super(message);
    this.name = 'UserApiError';
  }
}

export type ApiResponse = CreateUserResponse | ApiErrorResponse;
