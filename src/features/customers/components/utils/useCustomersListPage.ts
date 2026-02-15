import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchCustomers,
  setSearch,
  setSort,
  setPagination,
  deleteCustomerThunk,
  readCustomerThunk,
} from "../../customersSlice";
import type { Customer } from "../../customers.type";

/**
 * Encapsulates list state and handlers for Customers CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useCustomersListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.customers);

  useEffect(() => {
    dispatch(
      fetchCustomers({
        pageIndex,
        pageSize,
        orderByFieldName: "id",
        sortOrder: "desc",
      }),
    );
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchCustomers({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchCustomers({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchCustomers({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchCustomers({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchCustomers({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchCustomerForEdit = async (id: number): Promise<Customer | null> => {
    const result = await dispatch(readCustomerThunk({ id }));
    if (readCustomerThunk.fulfilled.match(result)) {
      return result.payload as Customer;
    }
    return null;
  };

  const deleteCustomer = (id: number) => {
    dispatch(deleteCustomerThunk(id));
    dispatch(fetchCustomers({ pageIndex, pageSize }));
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
    fetchCustomerForEdit,
    deleteCustomer,
  };
}
