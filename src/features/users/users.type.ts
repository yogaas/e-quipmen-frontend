export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  role: string;
  active: number;
}

export interface UserQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface UserState {
  list: User[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  user: User | null;
}
