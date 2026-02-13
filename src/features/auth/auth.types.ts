export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthState {
    user: User | null;
    access_token: string | null;
    refresh_token: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    access_token: string;
    refresh_token: string;
  }
  
  export interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
  }