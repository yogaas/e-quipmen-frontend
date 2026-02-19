// features/Accounts/AccountSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  readAccount,
} from "./accountsService";
import type { Account, AccountState } from "./accounts.type";
import getErrorMessage from "../../app/error";

export const fetchAccounts = createAsyncThunk(
  "Accounts/fetch",
  async (params: any) => {
    const res = await getAccounts(params);
    return res.data;
  },
);

export const createAccountThunk = createAsyncThunk(
  "Accounts/create",
  async (data: Partial<Account>, { rejectWithValue }) => {
    try {
      const res = await createAccount(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateAccountThunk = createAsyncThunk(
  "Accounts/update",
  async ({ id, data }: { id: number; data: Partial<Account> }) => {
    const res = await updateAccount(id, data);
    return res.data.data;
  },
);

export const readAccountThunk = createAsyncThunk(
  "Accounts/read",
  async ({ id }: { id: number }) => {
    const res = await readAccount(id);
    return res.data.data;
  },
);

export const deleteAccountThunk = createAsyncThunk(
  "Accounts/delete",
  async (id: number) => {
    await deleteAccount(id);
    return id;
  },
);

const initialState: AccountState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Account: null,
  error: null,
};

const AccountSlice = createSlice({
  name: "Accounts",
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
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchAccounts.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(updateAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* READ */
      .addCase(readAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Account = action.payload;
      })

      /* DELETE */
      .addCase(deleteAccountThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = AccountSlice.actions;
export default AccountSlice.reducer;
