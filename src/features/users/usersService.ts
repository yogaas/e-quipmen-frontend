// features/users/userService.ts
import api from '../../api/api'
import type { ApiResponse, ApiListResponse } from '../../types/api'
import type { User, UserQuery } from './users.type'


export const getUsers = (params: UserQuery) =>
  api.get<ApiListResponse<User[]>>('/users', { params })

export const createUser = (data: Partial<User>) =>
  api.post<ApiResponse<User>>('/users', data)

export const updateUser = (id: number, data: Partial<User>) =>
  api.put<ApiResponse<User>>(`/users/${id}`, data)

export const deleteUser = (id: number) =>
  api.delete<ApiResponse<null>>(`/users/${id}`)

export const readUser = (id: number) =>
  api.get<ApiResponse<User>>(`/users/${id}`)
