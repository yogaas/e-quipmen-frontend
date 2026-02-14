export interface Category {
  id: number;
  category: string;
}

export interface CategoryQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface CategoryState {
  list: Category[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Category: Category | null;
}
