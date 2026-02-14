import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
  readCategory,
} from "../categories/categoriesService";
import type { Category, CategoryState } from "./categories.type";
import getErrorMessage from "../../app/error";

export const fetchCategorys = createAsyncThunk(
  "Categorys/fetch",
  async (params: any) => {
    const res = await getCategorys(params);
    return res.data;
  },
);

export const createCategoryThunk = createAsyncThunk(
  "Categorys/create",
  async (data: Partial<Category>, { rejectWithValue }) => {
    try {
      const res = await createCategory(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateCategoryThunk = createAsyncThunk(
  "Categorys/update",
  async ({ id, data }: { id: number; data: Partial<Category> }) => {
    const res = await updateCategory(id, data);
    return res.data.data;
  },
);

export const readCategoryThunk = createAsyncThunk(
  "Categorys/read",
  async ({ id }: { id: number }) => {
    const res = await readCategory(id);
    return res.data.data;
  },
);

export const deleteCategoryThunk = createAsyncThunk(
  "Categorys/delete",
  async (id: number) => {
    await deleteCategory(id);
    return id;
  },
);

const initialState: CategoryState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Category: null,
  error: null,
};

const CategorySlice = createSlice({
  name: "Categorys",
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
      .addCase(fetchCategorys.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchCategorys.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Category = action.payload;
      })

      /* DELETE */
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = CategorySlice.actions;
export default CategorySlice.reducer;
