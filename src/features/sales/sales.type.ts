import { Type } from "lucide-react";
import type { Customer } from "../customers/customers.type";
import type { Section } from "../sections/sections.type";
import { z } from "zod";

export interface Sale {
  id: string;
  unique_code: string;
  section_id: number;
  customer_id: number;
  date_created: string; // format: YYYY-MM-DD
  time_created: string; // format: ISO datetime (YYYY-MM-DD HH:mm:ss)
  subtotal: number;
  percen_ppn: number;
  percen_discount: number;
  price_ppn: number;
  price_discount: number;
  total_price: number;
  status_paymen: number;
  status_cancel: number;
  status_jurnal: number;
  status_closebook: number;
  user_create: string;
  customer: Customer | null;
  section: Section | null;
  details: SaleDetails[];
  payments: SalePayments[];
}

export interface SaleDetails {
  unique_code: string;
  item_id: number;
  item_name: string;
  unit: string;
  price: number;
  qty: number;
  amount: number;
}

export interface SalePayments {
  unique_code: string;
  type_paymen_id: number;
  amount: number;
  type_transaction: string;
}

export interface SaleQuery {
  pageSize: number;
  pageIndex: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  orderByFieldName?: string;
}

export interface SaleState {
  list: Sale[];
  totalCount: number;
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  orderByFieldName: string;
  search: string;
  error: string | null;
  Sale: Sale | null;
}

export const SaleDetailSchema = z.object({
  item_id: z.number(),
  item_name: z.string().min(1, "Nama barang wajib ada"),
  unit: z.string().min(1, "Nama barang wajib ada"),
  price: z.number().min(1, "Harga tidak valid"),
  qty: z.number().min(1, "Qty minimal 1"),
  amount: z.number().min(0, "Jumlah tidak valid"),
});

export const SaleSchema = z.object({
  tanggal: z.string(),
  table: z.string(),
  section_id: z.string().min(1, "Section is required"),
  section_name: z.string().min(1, "Section is required"),
  customer_id: z.string().min(1, "Customer is required"),
  customer_name: z.string().min(1, "Customer is required"),
  type_transaction: z.string().min(1, "Type is required"),
  price_discount: z.string().optional(),
  price_shipping: z.string().optional(),
  details: z.array(SaleDetailSchema),
});

export type SaleFormValues = z.infer<typeof SaleSchema>;
