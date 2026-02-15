export interface Customer {
  id: number; // integer Auto Increment
  name: string;
  company: string;
  phone: string;
  email: string;
  address: number;
}

export interface CustomerQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface CustomerState {
  list: Customer[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Customer: Customer | null;
}
