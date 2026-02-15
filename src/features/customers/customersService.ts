// features/Customers/CustomerService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Customer, CustomerQuery } from "./customers.type";

export const getCustomers = (params: CustomerQuery) =>
  api.get<ApiListResponse<Customer[]>>("/customers", { params });

export const createCustomer = (data: Partial<Customer>) =>
  api.post<ApiResponse<Customer>>("/customers", data);

export const updateCustomer = (id: number, data: Partial<Customer>) =>
  api.put<ApiResponse<Customer>>(`/customers/${id}`, data);

export const deleteCustomer = (id: number) =>
  api.delete<ApiResponse<null>>(`/customers/${id}`);

export const readCustomer = (id: number) =>
  api.get<ApiResponse<Customer>>(`/customers/${id}`);
