// features/Payments/PaymentService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Payment, PaymentQuery } from "./payments.type";

export const getPayments = (params: PaymentQuery) =>
  api.get<ApiListResponse<Payment[]>>("/type-payment", { params });

export const createPayment = (data: Partial<Payment>) =>
  api.post<ApiResponse<Payment>>("/type-payment", data);

export const updatePayment = (id: number, data: Partial<Payment>) =>
  api.put<ApiResponse<Payment>>(`/type-payment/${id}`, data);

export const deletePayment = (id: number) =>
  api.delete<ApiResponse<null>>(`/type-payment/${id}`);

export const readPayment = (id: number) =>
  api.get<ApiResponse<Payment>>(`/type-payment/${id}`);
