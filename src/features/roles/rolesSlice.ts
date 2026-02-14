// features/Roles/RoleSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  readRole,
  readAllMenus,
} from "../roles/rolesService";
import type { Role, RoleState } from "./roles.type";
import getErrorMessage from "../../app/error";

export const fetchRoles = createAsyncThunk(
  "Roles/fetch",
  async (params: any) => {
    const res = await getRoles(params);
    return res.data;
  },
);

export const fetchAllMenu = createAsyncThunk("Menus/fetch", async () => {
  const res = await readAllMenus();
  return res.data;
});

export const createRoleThunk = createAsyncThunk(
  "Roles/create",
  async (data: Partial<Role>, { rejectWithValue }) => {
    try {
      const res = await createRole(data);

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data));
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data));
    }
  },
);

export const updateRoleThunk = createAsyncThunk(
  "Roles/update",
  async ({ id, data }: { id: string; data: Partial<Role> }) => {
    const res = await updateRole(id, data);
    return res.data.data;
  },
);

export const readRoleThunk = createAsyncThunk(
  "Roles/read",
  async ({ id }: { id: string }) => {
    const res = await readRole(id);
    return res.data.data;
  },
);

export const deleteRoleThunk = createAsyncThunk(
  "Roles/delete",
  async (id: string) => {
    await deleteRole(id);
    return id;
  },
);

const initialState: RoleState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: "",
  orderByFieldName: "",
  search: "",
  Role: null,
  error: null,
  Menu: null,
};

const RoleSlice = createSlice({
  name: "Roles",
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
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount ?? 0;
        state.pageIndex = action.payload.pageIndex ?? 0;
        state.pageSize = action.payload.pageSize ?? 10;
        state.sortOrder = action.payload.sortOrder ?? "";
        state.orderByFieldName = action.payload.orderByFieldName ?? "";
      })
      .addCase(fetchRoles.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchAllMenu.fulfilled, (state, action) => {
        state.Menu = action.payload.data;
      })

      /* CREATE */
      .addCase(createRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createRoleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE */
      .addCase(updateRoleThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (u) => u.role === action.payload.role,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      /* READ */
      .addCase(readRoleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Role = action.payload;
      })

      /* DELETE */
      .addCase(deleteRoleThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.role !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setSearch, setSort, setPagination } = RoleSlice.actions;
export default RoleSlice.reducer;
