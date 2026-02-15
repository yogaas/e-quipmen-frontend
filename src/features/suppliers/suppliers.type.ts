export interface Supplier {
  id: number; // integer Auto Increment
  name: string;
  company: string;
  phone: string;
  email: string;
  address: number;
}

export interface SupplierQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface SupplierState {
  list: Supplier[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Supplier: Supplier | null;
}
