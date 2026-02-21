export interface Payment {
  id: number;
  paymen: string;
  type_transaction: string;
  account_id: number;
}

export interface PaymentQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface PaymentState {
  list: Payment[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Payment: Payment | null;
}
