import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchUsers,
  setSearch,
  setSort,
  setPagination,
  deleteUserThunk,
  readUserThunk,
} from './usersSlice'
import type { User } from './users.type'

/**
 * Encapsulates list state and handlers for Users CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useUsersListPage() {
  const dispatch = useAppDispatch()
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUsers({ pageIndex, pageSize }))
  }, [dispatch, pageIndex, pageSize])

  const onSearch = (value: string) => {
    dispatch(setSearch(value))
    dispatch(fetchUsers({ pageIndex, pageSize, search: value }))
  }

  const onSort = (field: string, order: 'asc' | 'desc') => {
    dispatch(setSort({ field, order }))
    dispatch(
      fetchUsers({ pageIndex, pageSize, orderByFieldName: field, sortOrder: order })
    )
  }

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }))
    dispatch(fetchUsers({ pageIndex: page, pageSize }))
  }

  const onPageSizeChange = (size: number) => {
    dispatch(fetchUsers({ pageIndex: 0, pageSize: size ?? 10 }))
  }

  const onReload = () => {
    dispatch(fetchUsers({ pageIndex: 0, pageSize: 10 }))
  }

  const fetchUserForEdit = async (id: number): Promise<User | null> => {
    const result = await dispatch(readUserThunk({ id }))
    if (readUserThunk.fulfilled.match(result)) {
      return result.payload as User
    }
    return null
  }

  const deleteUser = (id: number) => {
    dispatch(deleteUserThunk(id))
    dispatch(fetchUsers({ pageIndex, pageSize }))
  }

  const safeSortOrder: 'asc' | 'desc' | undefined =
    sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : undefined

  return {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    orderByFieldName,
    sortOrder: safeSortOrder,
    onSearch,
    onSort,
    onPageChange,
    onPageSizeChange,
    onReload,
    fetchUserForEdit,
    deleteUser,
  }
}
