export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public path: string,
    public success: false = false,
    public timestamp: string = new Date().toISOString()
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface BaseResponse {
  success: boolean;
  message?: string;
  timestamp?: string;
}
