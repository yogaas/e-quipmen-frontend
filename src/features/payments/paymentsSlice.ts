// features/Payments/PaymentSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  readPayment,
} from "../payments/paymentsService";
import type { Payment, PaymentState } from "./payments.type";
import getErrorMessage from "../../app/error";

export const fetchPayments = createAsyncThunk(
  "Payments/fetch",
  async (params: any) => {
    const res = await getPayments(params);
    return res.data;
  },
);

export const createPaymentThunk = createAsyncThunk(
  "Payments/create",
  async (data: Partial<Payment>, { rejectWithValue }) => {
    try {
      const res = await createPayment(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updatePaymentThunk = createAsyncThunk(
  "Payments/update",
  async ({ id, data }: { id: number; data: Partial<Payment> }) => {
    const res = await updatePayment(id, data);
    return res.data.data;
  },
);

export const readPaymentThunk = createAsyncThunk(
  "Payments/read",
  async ({ id }: { id: number }) => {
    const res = await readPayment(id);
    return res.data.data;
  },
);

export const deletePaymentThunk = createAsyncThunk(
  "Payments/delete",
  async (id: number) => {
    await deletePayment(id);
    return id;
  },
);

const initialState: PaymentState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Payment: null,
  error: null,
};

const PaymentSlice = createSlice({
  name: "Payments",
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
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchPayments.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createPaymentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updatePaymentThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readPaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Payment = action.payload;
      })

      /* DELETE */
      .addCase(deletePaymentThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = PaymentSlice.actions;
export default PaymentSlice.reducer;
