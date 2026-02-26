import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchSales,
  setSearch,
  setSort,
  setPagination,
  deleteSaleThunk,
  readSaleThunk,
} from "../../salesSlice";
import type { Sale } from "../../sales.type";

/**
 * Encapsulates list state and handlers for Sales CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useSalesListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.sales);

  useEffect(() => {
    dispatch(
      fetchSales({
        pageIndex,
        pageSize,
        sortOrder: "desc",
        orderByFieldName: "time_created",
      }),
    );
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchSales({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchSales({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchSales({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchSales({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchSales({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchSaleForEdit = async (id: string): Promise<Sale | null> => {
    const result = await dispatch(readSaleThunk({ id }));
    if (readSaleThunk.fulfilled.match(result)) {
      return result.payload as Sale;
    }
    return null;
  };

  const deleteSale = (id: string) => {
    dispatch(deleteSaleThunk(id));
    dispatch(fetchSales({ pageIndex, pageSize }));
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
    fetchSaleForEdit,
    deleteSale,
  };
}
