// features/Sections/SectionSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getSections,
  createSection,
  updateSection,
  deleteSection,
  readSection,
} from "../sections/sectionsService";
import type { Section, SectionState } from "./sections.type";
import getErrorMessage from "../../app/error";

export const fetchSections = createAsyncThunk(
  "Sections/fetch",
  async (params: any) => {
    const res = await getSections(params);
    return res.data;
  },
);

export const createSectionThunk = createAsyncThunk(
  "Sections/create",
  async (data: Partial<Section>, { rejectWithValue }) => {
    try {
      const res = await createSection(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateSectionThunk = createAsyncThunk(
  "Sections/update",
  async ({ id, data }: { id: number; data: Partial<Section> }) => {
    const res = await updateSection(id, data);
    return res.data.data;
  },
);

export const readSectionThunk = createAsyncThunk(
  "Sections/read",
  async ({ id }: { id: number }) => {
    const res = await readSection(id);
    return res.data.data;
  },
);

export const deleteSectionThunk = createAsyncThunk(
  "Sections/delete",
  async (id: number) => {
    await deleteSection(id);
    return id;
  },
);

const initialState: SectionState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Section: null,
  error: null,
};

const SectionSlice = createSlice({
  name: "Sections",
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
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchSections.rejected, (state) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createSectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSectionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createSectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateSectionThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readSectionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Section = action.payload;
      })

      /* DELETE */
      .addCase(deleteSectionThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = SectionSlice.actions;
export default SectionSlice.reducer;
