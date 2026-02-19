export interface Account {
  id: number;
  id_parent: number;
  code_account: string;
  name_account: string;
  level: string;
  header: number;
  normal_pos: string;
  grouper: number;
}

export interface AccountQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface AccountState {
  list: Account[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Account: Account | null;
}
