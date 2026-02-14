// features/Items/ItemService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Item, ItemQuery } from "./items.type";

export const getItems = (params: ItemQuery) =>
  api.get<ApiListResponse<Item[]>>("/items", { params });

export const createItem = (data: Partial<Item>) =>
  api.post<ApiResponse<Item>>("/items", data);

export const updateItem = (id: number, data: Partial<Item>) =>
  api.put<ApiResponse<Item>>(`/items/${id}`, data);

export const deleteItem = (id: number) =>
  api.delete<ApiResponse<null>>(`/items/${id}`);

export const readItem = (id: number) =>
  api.get<ApiResponse<Item>>(`/items/${id}`);
