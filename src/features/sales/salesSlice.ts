// features/Sales/SaleSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getSales,
  createSale,
  updateSale,
  deleteSale,
  readSale,
} from "../sales/salesService";
import type { Sale, SaleState } from "./sales.type";
import getErrorMessage from "../../app/error";

export const fetchSales = createAsyncThunk(
  "Sales/fetch",
  async (params: any) => {
    const res = await getSales(params);
    return res.data;
  },
);

export const createSaleThunk = createAsyncThunk(
  "Sales/create",
  async (data: Partial<Sale>, { rejectWithValue }) => {
    try {
      const res = await createSale(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateSaleThunk = createAsyncThunk(
  "Sales/update",
  async ({ id, data }: { id: string; data: Partial<Sale> }) => {
    const res = await updateSale(id, data);
    return res.data.data;
  },
);

export const readSaleThunk = createAsyncThunk(
  "Sales/read",
  async ({ id }: { id: string }) => {
    const res = await readSale(id);
    return res.data.data;
  },
);

export const deleteSaleThunk = createAsyncThunk(
  "Sales/delete",
  async (id: string) => {
    await deleteSale(id);
    return id;
  },
);

const initialState: SaleState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Sale: null,
  error: null,
};

const SaleSlice = createSlice({
  name: "Sales",
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
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchSales.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createSaleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSaleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createSaleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateSaleThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (u) => u.unique_code === action.payload.unique_code,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readSaleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Sale = action.payload;
      })

      /* DELETE */
      .addCase(deleteSaleThunk.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (u) => u.unique_code !== action.payload.toString(),
        );
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = SaleSlice.actions;
export default SaleSlice.reducer;
