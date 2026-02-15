// features/Suppliers/SupplierSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  readSupplier,
} from "../suppliers/suppliersService";
import type { Supplier, SupplierState } from "./suppliers.type";
import getErrorMessage from "../../app/error";

export const fetchSuppliers = createAsyncThunk(
  "Suppliers/fetch",
  async (params: any) => {
    const res = await getSuppliers(params);
    return res.data;
  },
);

export const createSupplierThunk = createAsyncThunk(
  "Suppliers/create",
  async (data: Partial<Supplier>, { rejectWithValue }) => {
    try {
      const res = await createSupplier(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateSupplierThunk = createAsyncThunk(
  "Suppliers/update",
  async ({ id, data }: { id: number; data: Partial<Supplier> }) => {
    const res = await updateSupplier(id, data);
    return res.data.data;
  },
);

export const readSupplierThunk = createAsyncThunk(
  "Suppliers/read",
  async ({ id }: { id: number }) => {
    const res = await readSupplier(id);
    return res.data.data;
  },
);

export const deleteSupplierThunk = createAsyncThunk(
  "Suppliers/delete",
  async (id: number) => {
    await deleteSupplier(id);
    return id;
  },
);

const initialState: SupplierState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Supplier: null,
  error: null,
};

const SupplierSlice = createSlice({
  name: "Suppliers",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageIndex = 0; // reset page saat search
    },
    setSort(
      state,
      action: PayloadAction<{
        field: string;
        order: "asc" | "desc";
      }>,
    ) {
      state.orderByFieldName = action.payload.field;
      state.sortOrder = action.payload.order;
    },
    setPagination(
      state,
      action: PayloadAction<{
        pageIndex: number;
        pageSize: number;
      }>,
    ) {
      state.pageIndex = action.payload.pageIndex;
      state.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchSuppliers.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createSupplierThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateSupplierThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Supplier = action.payload;
      })

      /* DELETE */
      .addCase(deleteSupplierThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = SupplierSlice.actions;
export default SupplierSlice.reducer;
