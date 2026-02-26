// features/Sales/SaleService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Sale, SaleQuery } from "./sales.type";

export const getSales = (params: SaleQuery) =>
  api.get<ApiListResponse<Sale[]>>("/sales", { params });

export const createSale = (data: Partial<Sale>) =>
  api.post<ApiResponse<Sale>>("/sales", data);

export const updateSale = (id: string, data: Partial<Sale>) =>
  api.put<ApiResponse<Sale>>(`/sales/${id}`, data);

export const deleteSale = (id: string) =>
  api.delete<ApiResponse<null>>(`/sales/${id}`);

export const readSale = (id: string) =>
  api.get<ApiResponse<Sale>>(`/sales/${id}`);
