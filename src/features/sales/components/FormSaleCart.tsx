import { useFormContext, type UseFieldArrayReturn } from "react-hook-form";
import type { SaleFormValues } from "../sales.type";
import {
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useToast } from "../../../components/common/ToastContext";
import { formatNumberID } from "../../../utils/helpers";

interface Props {
  fieldArray: UseFieldArrayReturn<SaleFormValues, "details">;
  openLookup: () => void;
}

export default function FormSaleCart({ fieldArray, openLookup }: Props) {
  const { showToast } = useToast();
  const { fields, update, remove } = fieldArray;

  const updateQty = (index: number, qty: number) => {
    if (qty < 1) return;
    const item = fields[index];
    update(index, {
      ...item,
      qty,
      amount: qty * item.price,
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart size={18} className="text-gray-500" />
            Cart Items ({fields.length})
          </h3>

          <Button
            size="sm"
            className="justify-end ml-auto gap-2 shadow-lg shadow-primary-500/20"
            onClick={() => {
              if (false) {
                showToast("Silahkan pilih section terlebih dahulu.", "info");
              } else {
                openLookup();
              }
            }}
          >
            <Search size={18} />
            Add Product
          </Button>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 w-[45%]">Product</th>
                <th className="px-5 py-3 w-[15%] text-center">Price</th>
                <th className="px-5 py-3 w-[20%] text-center">Qty</th>
                <th className="px-5 py-3 w-[15%] text-right">Total</th>
                <th className="px-5 py-3 w-[5%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fields.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <ShoppingBag className="h-8 w-8 text-gray-300" />
                      </div>
                      <p className="text-gray-500 text-sm">
                        Cart is empty. Add products to start.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                fields.map((item, index) => (
                  <tr
                    key={item.item_id}
                    className="hover:bg-blue-50/30 group transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                          <Package size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.item_name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Unit : {item.unit}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center text-gray-600">
                      {formatNumberID(item.price)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="inline-flex items-center border border-gray-200 rounded-md bg-white shadow-sm h-8">
                        <button
                          onClick={() => updateQty(index, item.qty - 1)}
                          className="px-2 h-full hover:bg-gray-50 text-gray-500 rounded-l-md transition-colors border-r border-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 text-xs">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(index, item.qty + 1)}
                          className="px-2 h-full hover:bg-gray-50 text-gray-500 rounded-r-md transition-colors border-l border-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-gray-900">
                      {formatNumberID(item.amount)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => remove(item.item_id)}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
