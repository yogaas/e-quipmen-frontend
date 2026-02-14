export interface Menus {
  menus: string;
  view: number;
  create: number;
  update: number;
  delete: number;
}

export interface Role {
  id: string;
  role: string;
  menus?: Menus[] | null;
}

export interface RoleQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface RoleState {
  list: Role[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Role: Role | null;
  Menu: Menus[] | null;
}
