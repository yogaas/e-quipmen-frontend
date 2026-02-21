import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchSections,
  setSearch,
  setSort,
  setPagination,
  deleteSectionThunk,
  readSectionThunk,
} from "../../sectionsSlice";
import type { Section } from "../../sections.type";

/**
 * Encapsulates list state and handlers for Sections CRUD page.
 * Reuse this pattern for other entities (e.g. useProductsListPage).
 */
export function useSectionsListPage() {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    sortOrder,
    orderByFieldName,
  } = useAppSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchSections({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
    dispatch(fetchSections({ pageIndex, pageSize, search: value }));
  };

  const onSort = (field: string, order: "asc" | "desc") => {
    dispatch(setSort({ field, order }));
    dispatch(
      fetchSections({
        pageIndex,
        pageSize,
        orderByFieldName: field,
        sortOrder: order,
      }),
    );
  };

  const onPageChange = (page: number) => {
    dispatch(setPagination({ pageIndex: page, pageSize }));
    dispatch(fetchSections({ pageIndex: page, pageSize }));
  };

  const onPageSizeChange = (size: number) => {
    dispatch(fetchSections({ pageIndex: 0, pageSize: size ?? 10 }));
  };

  const onReload = () => {
    dispatch(fetchSections({ pageIndex: 0, pageSize: 10 }));
  };

  const fetchSectionForEdit = async (id: number): Promise<Section | null> => {
    const result = await dispatch(readSectionThunk({ id }));
    if (readSectionThunk.fulfilled.match(result)) {
      return result.payload as Section;
    }
    return null;
  };

  const deleteSection = (id: number) => {
    dispatch(deleteSectionThunk(id));
    dispatch(fetchSections({ pageIndex, pageSize }));
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
    fetchSectionForEdit,
    deleteSection,
  };
}
