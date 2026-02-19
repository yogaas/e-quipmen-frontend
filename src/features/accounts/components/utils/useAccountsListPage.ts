import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchAccounts,
  setSearch,
  setSort,
  setPagination,
  deleteAccountThunk,
  readAccountThunk,
} from "../../accountsSlice";
import type { Account } from "../../accounts.type";

/**
 * Encapsulates list state and handlers for Accounts CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useAccountsListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts({ pageIndex, pageSize: 999 }));
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchAccounts({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchAccounts({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchAccounts({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchAccounts({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchAccounts({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchAccountForEdit = async (id: number): Promise<Account | null> => {
    const result = await dispatch(readAccountThunk({ id }));
    if (readAccountThunk.fulfilled.match(result)) {
      return result.payload as Account;
    }
    return null;
  };

  const deleteAccount = (id: number) => {
    dispatch(deleteAccountThunk(id));
    dispatch(fetchAccounts({ pageIndex, pageSize }));
  };

  const safeSortOrder: "asc" | "desc" | undefined =
    sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;

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
    fetchAccountForEdit,
    deleteAccount,
  };
}
