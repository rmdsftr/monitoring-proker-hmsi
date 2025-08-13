export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface StandardResponse<T = any> {
  status: 'success' | 'failed';
  message: string;
  data?: T;
  error?: any;
}