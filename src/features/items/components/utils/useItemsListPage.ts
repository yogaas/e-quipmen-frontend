import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchItems,
  setSearch,
  setSort,
  setPagination,
  deleteItemThunk,
  readItemThunk,
} from "../../itemsSlice";
import type { Item } from "../../items.type";

/**
 * Encapsulates list state and handlers for Items CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useItemsListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchItems({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchItems({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchItems({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchItems({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchItems({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchItemForEdit = async (id: number): Promise<Item | null> => {
    const result = await dispatch(readItemThunk({ id }));
    if (readItemThunk.fulfilled.match(result)) {
      return result.payload as Item;
    }
    return null;
  };

  const deleteItem = (id: number) => {
    dispatch(deleteItemThunk(id));
    dispatch(fetchItems({ pageIndex, pageSize }));
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
    fetchItemForEdit,
    deleteItem,
  };
}
