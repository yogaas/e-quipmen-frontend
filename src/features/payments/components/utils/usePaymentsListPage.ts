import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchPayments,
  setSearch,
  setSort,
  setPagination,
  deletePaymentThunk,
  readPaymentThunk,
} from "../../paymentsSlice";
import type { Payment } from "../../payments.type";

/**
 * Encapsulates list state and handlers for Payments CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function usePaymentsListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchPayments({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchPayments({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchPayments({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchPayments({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchPayments({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchPayments({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchPaymentForEdit = async (id: number): Promise<Payment | null> => {
    const result = await dispatch(readPaymentThunk({ id }));
    if (readPaymentThunk.fulfilled.match(result)) {
      return result.payload as Payment;
    }
    return null;
  };

  const deletePayment = (id: number) => {
    dispatch(deletePaymentThunk(id));
    dispatch(fetchPayments({ pageIndex, pageSize }));
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
    fetchPaymentForEdit,
    deletePayment,
  };
}
