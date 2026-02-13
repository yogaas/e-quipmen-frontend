import axiosInstance from '../../api/api';
import type {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from '../../features/auth/auth.types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axiosInstance.post('/token', credentials);
    console.log(response.data);
    return response.data.data;
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await axiosInstance.post('/refresh-token', {
      refreshToken,
    });
    return response.data.data;
  }

  async logout(): Promise<void> {
    await axiosInstance.post('/logout');
  }
}

export default new AuthService();