// features/Sections/SectionService.ts
import api from "../../api/api";
import type { ApiResponse, ApiListResponse } from "../../types/api";
import type { Section, SectionQuery } from "./sections.type";

export const getSections = (params: SectionQuery) =>
  api.get<ApiListResponse<Section[]>>("/sections", { params });

export const createSection = (data: Partial<Section>) =>
  api.post<ApiResponse<Section>>("/sections", data);

export const updateSection = (id: number, data: Partial<Section>) =>
  api.put<ApiResponse<Section>>(`/sections/${id}`, data);

export const deleteSection = (id: number) =>
  api.delete<ApiResponse<null>>(`/sections/${id}`);

export const readSection = (id: number) =>
  api.get<ApiResponse<Section>>(`/sections/${id}`);
