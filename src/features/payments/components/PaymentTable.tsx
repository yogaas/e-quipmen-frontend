import { DataTable } from "../../../components/common/DataTable";
import type { Payment } from "../payments.type";
import { usePaymentsListPage } from "./utils/usePaymentsListPage";
import { getPaymentColumns } from "./utils/paymentsColumns";

interface PaymentTableProp {
  handleEdit: (id: number) => void;
  openDeleteModal: (id: number) => void;
}

export default function PaymentTable({
  handleEdit,
  openDeleteModal,
}: PaymentTableProp) {
  const {
    list,
    loading,
    pageIndex,
    pageSize,
    totalCount,
    orderByFieldName,
    sortOrder,
    onSearch,
    onSort,
    onPageChange,
    onPageSizeChange,
  } = usePaymentsListPage();

  const columns = getPaymentColumns({
    onEdit: handleEdit,
    onDelete: openDeleteModal,
  });

  return (
    <DataTable<Payment>
      data={list}
      columns={columns}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={totalCount}
      setSearch={onSearch}
      setSort={onSort}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortOrder={sortOrder}
      sortField={orderByFieldName}
      searchPlaceholder="Find Payments..."
      isLoading={loading}
    />
  );
}
