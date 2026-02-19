// features/Accounts/AccountService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Account, AccountQuery } from "./accounts.type.ts";

export const getAccounts = (params: AccountQuery) =>
  api.get<ApiListResponse<Account[]>>("/accounts", { params });

export const createAccount = (data: Partial<Account>) =>
  api.post<ApiResponse<Account>>("/accounts", data);

export const updateAccount = (id: number, data: Partial<Account>) =>
  api.put<ApiResponse<Account>>(`/accounts/${id}`, data);

export const deleteAccount = (id: number) =>
  api.delete<ApiResponse<null>>(`/accounts/${id}`);

export const readAccount = (id: number) =>
  api.get<ApiResponse<Account>>(`/accounts/${id}`);
