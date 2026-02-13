
// features/users/userSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {  
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  readUser, } from '../users/usersService'
import type { User, UserState } from './users.type'
import getErrorMessage from '../../app/error'

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (params: any) => {
      const res = await getUsers(params)
      return res.data
  }
)

export const createUserThunk = createAsyncThunk(
  'users/create',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const res = await createUser(data)

      if (!res.data.success) {
        return rejectWithValue(getErrorMessage(res.data))
      }

      return res.data.data
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error?.response?.data))
    }
  }
)

export const updateUserThunk = createAsyncThunk(
  'users/update',
  async ({ id, data }: { id: number; data: Partial<User> }) => {
    const res = await updateUser(id, data)
    return res.data.data
  }
)

export const readUserThunk = createAsyncThunk(
  'users/read',
  async ({ id }: { id: number}) => {
    const res = await readUser(id)
    return res.data.data
  }
)

export const deleteUserThunk = createAsyncThunk(
  'users/delete',
  async (id: number) => {
    await deleteUser(id)
    return id
  }
)

const initialState: UserState = {
  list: [],
  totalCount: 0,
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  sortOrder: '',
  orderByFieldName: '',
  search : '',
  user: null,
  error: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.pageIndex = 0 // reset page saat search
    },
    setSort(
      state,
      action: PayloadAction<{
        field: string
        order: 'asc' | 'desc'
      }>
    ) {
      state.orderByFieldName = action.payload.field
      state.sortOrder = action.payload.order
    },
    setPagination(
      state,
      action: PayloadAction<{
        pageIndex: number
        pageSize: number
      }>
    ) {
      state.pageIndex = action.payload.pageIndex
      state.pageSize = action.payload.pageSize
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.data
        state.totalCount = action.payload.totalCount ?? 0
        state.pageIndex = action.payload.pageIndex ?? 0
        state.pageSize = action.payload.pageSize ?? 10
        state.sortOrder = action.payload.sortOrder ?? ''
        state.orderByFieldName = action.payload.orderByFieldName ?? ''
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false
      })

      /* CREATE */
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.list.push(action.payload)
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* UPDATE */
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (u) => u.id === action.payload.id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })

       /* READ */
       .addCase(readUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })

      /* DELETE */
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload)
        state.totalCount -= 1
      })
  },
})

export const { setSearch, setSort, setPagination } = userSlice.actions
export default userSlice.reducer