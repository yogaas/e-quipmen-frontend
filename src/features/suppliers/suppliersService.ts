// features/Suppliers/SupplierService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Supplier, SupplierQuery } from "./suppliers.type";

export const getSuppliers = (params: SupplierQuery) =>
  api.get<ApiListResponse<Supplier[]>>("/suppliers", { params });

export const createSupplier = (data: Partial<Supplier>) =>
  api.post<ApiResponse<Supplier>>("/suppliers", data);

export const updateSupplier = (id: number, data: Partial<Supplier>) =>
  api.put<ApiResponse<Supplier>>(`/suppliers/${id}`, data);

export const deleteSupplier = (id: number) =>
  api.delete<ApiResponse<null>>(`/suppliers/${id}`);

export const readSupplier = (id: number) =>
  api.get<ApiResponse<Supplier>>(`/suppliers/${id}`);
