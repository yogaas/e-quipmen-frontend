// features/Roles/RoleService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Menus, Role, RoleQuery } from "./roles.type";

export const getRoles = (params: RoleQuery) =>
  api.get<ApiListResponse<Role[]>>("/roles", { params });

export const createRole = (data: Partial<Role>) =>
  api.post<ApiResponse<Role>>("/roles", data);

export const updateRole = (id: string, data: Partial<Role>) =>
  api.put<ApiResponse<Role>>(`/roles/${id}`, data);

export const deleteRole = (id: string) =>
  api.delete<ApiResponse<null>>(`/roles/${id}`);

export const readRole = (id: string) =>
  api.get<ApiResponse<Role>>(`/roles/${id}`);

export const readAllMenus = () => api.get<ApiListResponse<Menus[]>>(`/menus`);
