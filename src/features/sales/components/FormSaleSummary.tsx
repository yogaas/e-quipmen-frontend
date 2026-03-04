import { Calculator, CreditCard, Save } from "lucide-react";
import { formatNumberID } from "../../../utils/helpers";
import { Button } from "../../../components/ui/Button";
import type { SaleFormValues } from "../sales.type";
import {
  useWatch,
  type Control,
  type UseFieldArrayReturn,
} from "react-hook-form";

interface Props {
  fieldArray: UseFieldArrayReturn<SaleFormValues, "details">;
  control: Control<SaleFormValues>;
}

export default function FormSaleSummary({ fieldArray, control }: Props) {
  const { fields } = fieldArray;

  const price_shipping = useWatch({
    control,
    name: "price_shipping",
  });

  const price_discount = useWatch({
    control,
    name: "price_discount",
  });

  const section_id = useWatch({
    control,
    name: "section_id",
  });

  const customer_id = useWatch({
    control,
    name: "customer_id",
  });

  const subtotal = fields.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1; // 10% Tax Example
  const grandTotal = Math.max(0, subtotal + tax + 0 - 0);

  return (
    <>
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Calculator size={18} className="text-gray-500" /> Payment Summary
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">
              {formatNumberID(subtotal.toFixed(2))}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (10%)</span>
            <span className="font-medium">
              {formatNumberID(tax.toFixed(2))}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="font-medium">
              {formatNumberID(price_shipping as string)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-green-600 font-medium">
            <span>Discount</span>
            <span>{formatNumberID(price_discount as string)}</span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4 mt-2">
            <div className="flex justify-between items-end mb-1">
              <span className="text-gray-900 font-bold">Total Payable</span>
              <span className="text-3xl font-bold text-blue-600 tracking-tight">
                {formatNumberID(grandTotal.toFixed(2))}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 flex flex-row gap-2 border-t border-gray-100">
          <Button
            className="w-full py-3.5 text-base shadow-lg shadow-blue-200 mb-3"
            disabled={fields.length === 0 && section_id != null}
            onClick={() => {}}
          >
            <CreditCard size={18} className="mr-2" />
            Proceed to Payment
          </Button>
          <Button
            variant="outline"
            className="w-full py-3.5 text-base shadow-lg shadow-blue-200 mb-3"
            disabled={fields.length === 0 && customer_id != null}
            onClick={() => {}}
          >
            <Save size={18} className="mr-2" />
            Save Draft
          </Button>
        </div>
      </div>
    </>
  );
}
