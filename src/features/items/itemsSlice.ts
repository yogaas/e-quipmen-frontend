// features/Items/ItemSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  readItem,
} from "../items/itemsService";
import type { Item, ItemState } from "./items.type";
import getErrorMessage from "../../app/error";

export const fetchItems = createAsyncThunk(
  "Items/fetch",
  async (params: any) => {
    const res = await getItems(params);
    return res.data;
  },
);

export const createItemThunk = createAsyncThunk(
  "Items/create",
  async (data: Partial<Item>, { rejectWithValue }) => {
    try {
      const res = await createItem(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateItemThunk = createAsyncThunk(
  "Items/update",
  async ({ id, data }: { id: number; data: Partial<Item> }) => {
    const res = await updateItem(id, data);
    return res.data.data;
  },
);

export const readItemThunk = createAsyncThunk(
  "Items/read",
  async ({ id }: { id: number }) => {
    const res = await readItem(id);
    return res.data.data;
  },
);

export const deleteItemThunk = createAsyncThunk(
  "Items/delete",
  async (id: number) => {
    await deleteItem(id);
    return id;
  },
);

const initialState: ItemState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Item: null,
  error: null,
};

const ItemSlice = createSlice({
  name: "Items",
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
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createItemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateItemThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Item = action.payload;
      })

      /* DELETE */
      .addCase(deleteItemThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = ItemSlice.actions;
export default ItemSlice.reducer;
