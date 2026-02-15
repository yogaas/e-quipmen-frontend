// features/Customers/CustomerSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  readCustomer,
} from "../customers/customersService";
import type { Customer, CustomerState } from "./customers.type";
import getErrorMessage from "../../app/error";

export const fetchCustomers = createAsyncThunk(
  "Customers/fetch",
  async (params: any) => {
    const res = await getCustomers(params);
    return res.data;
  },
);

export const createCustomerThunk = createAsyncThunk(
  "Customers/create",
  async (data: Partial<Customer>, { rejectWithValue }) => {
    try {
      const res = await createCustomer(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateCustomerThunk = createAsyncThunk(
  "Customers/update",
  async ({ id, data }: { id: number; data: Partial<Customer> }) => {
    const res = await updateCustomer(id, data);
    return res.data.data;
  },
);

export const readCustomerThunk = createAsyncThunk(
  "Customers/read",
  async ({ id }: { id: number }) => {
    const res = await readCustomer(id);
    return res.data.data;
  },
);

export const deleteCustomerThunk = createAsyncThunk(
  "Customers/delete",
  async (id: number) => {
    await deleteCustomer(id);
    return id;
  },
);

const initialState: CustomerState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Customer: null,
  error: null,
};

const CustomerSlice = createSlice({
  name: "Customers",
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
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateCustomerThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Customer = action.payload;
      })

      /* DELETE */
      .addCase(deleteCustomerThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = CustomerSlice.actions;
export default CustomerSlice.reducer;
