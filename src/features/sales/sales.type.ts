export interface Section {
  id: number;
  name: string;
  tag: string;
  active: number;
}

export interface SectionQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface SectionState {
  list: Section[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Section: Section | null;
}
