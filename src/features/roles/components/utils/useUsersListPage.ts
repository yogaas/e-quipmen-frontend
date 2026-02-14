import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  fetchRoles,
  setSearch,
  setSort,
  setPagination,
  deleteRoleThunk,
  readRoleThunk,
} from './../../rolesSlice'
import type { Role } from '../../roles.type'

export function useRolesListPage() {
  const dispatch = useAppDispatch()
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.roles)

  useEffect(() => {
    dispatch(fetchRoles({ pageIndex, pageSize }))
  }, [dispatch, pageIndex, pageSize])

  const onSearch = (value: string) => {
    dispatch(setSearch(value))
    dispatch(fetchRoles({ pageIndex, pageSize, search: value }))
  }

  const onSort = (field: string, order: 'asc' | 'desc') => {
    dispatch(setSort({ field, order }))
    dispatch(
      fetchRoles({ pageIndex, pageSize, orderByFieldName: field, sortOrder: order })
    )
  }

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }))
    dispatch(fetchRoles({ pageIndex: page, pageSize }))
  }

  const onPageSizeChange = (size: number) => {
    dispatch(fetchRoles({ pageIndex: 0, pageSize: size ?? 10 }))
  }

  const onReload = () => {
    dispatch(fetchRoles({ pageIndex: 0, pageSize: 10 }))
  }

  const fetchRoleForEdit = async (role: string): Promise<Role | null> => {
    const result = await dispatch(readRoleThunk({ id: role }))
    if (readRoleThunk.fulfilled.match(result)) {
      return result.payload as Role
    }
    return null
  }

  const deleteRole = (role: string) => {
    dispatch(deleteRoleThunk(role))
    dispatch(fetchRoles({ pageIndex, pageSize }))
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
    fetchRoleForEdit,
    deleteRole,
  }
}
