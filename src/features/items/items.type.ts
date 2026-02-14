export interface Item {
  id: number; // integer Auto Increment
  owner_id: number;
  section_id: number;
  category_id: number;
  name: string;
  unit_purchase: string;
  unit_sale: string;
  price_purchase: number;
  price_sale: number;
  minimum_stock: number;
  img_items?: string | null;
  active: number;
}

export interface ItemQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface ItemState {
  list: Item[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Item: Item | null;
}
