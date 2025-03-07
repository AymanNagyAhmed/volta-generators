export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface ApiSuccessResponse<T> {
    success: true;
    statusCode: number;
    message: string;
    path: string;
    timestamp: string;
    data: T;
  }
  
  export interface ApiErrorResponse {
    success: false;
    statusCode: number;
    message: string;
    path: string;
    timestamp: string;
  }
  
  export interface LoginResponseData {
    access_token: string;
    user: {
      _id: string;
      email: string;
      isEmailVerified: boolean;
      role: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }

  export interface RegisterResponseData {
    id: string;
    role: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    dateOfBirth: string;
    password: string;
  }

  export type LoginResponse = ApiSuccessResponse<LoginResponseData>; 

  export type RegisterResponse = ApiSuccessResponse<RegisterResponseData>;