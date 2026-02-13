import { useAppSelector } from '../app/hooks'

export const useAuth = () => {
  const auth = useAppSelector(state => state.auth)

  return {
    user: auth.data,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    isAuthenticated: !!auth.accessToken,
    loading: auth.loading,
    error: auth.error,
  }
}
