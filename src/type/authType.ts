export interface SignupData {
  email: string;
  password: string;
  userName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  userId?: number;
  token?: string;
  error?: string;
  userName?: string;
}
