// features/Categorys/CategoryService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Category, CategoryQuery } from "./categories.type";

export const getCategorys = (params: CategoryQuery) =>
  api.get<ApiListResponse<Category[]>>("/categories", { params });

export const createCategory = (data: Partial<Category>) =>
  api.post<ApiResponse<Category>>("/categories", data);

export const updateCategory = (id: number, data: Partial<Category>) =>
  api.put<ApiResponse<Category>>(`/categories/${id}`, data);

export const deleteCategory = (id: number) =>
  api.delete<ApiResponse<null>>(`/categories/${id}`);

export const readCategory = (id: number) =>
  api.get<ApiResponse<Category>>(`/categories/${id}`);
