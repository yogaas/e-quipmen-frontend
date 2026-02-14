import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchCategorys,
  setSearch,
  setSort,
  setPagination,
  deleteCategoryThunk,
  readCategoryThunk,
} from "../../categoriesSlice";
import type { Category } from "../../categories.type";

/**
 * Encapsulates list state and handlers for Categorys CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useCategorysListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategorys({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchCategorys({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchCategorys({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchCategorys({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchCategorys({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchCategorys({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchCategoryForEdit = async (id: number): Promise<Category | null> => {
    const result = await dispatch(readCategoryThunk({ id }));
    if (readCategoryThunk.fulfilled.match(result)) {
      return result.payload as Category;
    }
    return null;
  };

  const deleteCategory = (id: number) => {
    dispatch(deleteCategoryThunk(id));
    dispatch(fetchCategorys({ pageIndex, pageSize }));
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
    fetchCategoryForEdit,
    deleteCategory,
  };
}
