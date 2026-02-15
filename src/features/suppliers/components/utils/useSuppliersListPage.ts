import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchSuppliers,
  setSearch,
  setSort,
  setPagination,
  deleteSupplierThunk,
  readSupplierThunk,
} from "../../suppliersSlice";
import type { Supplier } from "../../suppliers.type";

/**
 * Encapsulates list state and handlers for Suppliers CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useSuppliersListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchSuppliers({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchSuppliers({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchSuppliers({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchSuppliers({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchSuppliers({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchSupplierForEdit = async (id: number): Promise<Supplier | null> => {
    const result = await dispatch(readSupplierThunk({ id }));
    if (readSupplierThunk.fulfilled.match(result)) {
      return result.payload as Supplier;
    }
    return null;
  };

  const deleteSupplier = (id: number) => {
    dispatch(deleteSupplierThunk(id));
    dispatch(fetchSuppliers({ pageIndex, pageSize }));
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
    fetchSupplierForEdit,
    deleteSupplier,
  };
}
