import {
  Archive,
  BadgeDollarSign,
  Calculator,
  Calendar,
  CreditCard,
  DollarSign,
  Landmark,
  List,
  NotebookTabs,
  Package,
  Percent,
  Plus,
  Save,
  ScissorsLineDashed,
  Search,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  User,
  Utensils,
  X,
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import LookupCustomer from "./components/LookupCustomer";
import {
  SaleSchema,
  type Sale,
  type SaleDetails,
  type SaleFormValues,
} from "./sales.type";
import type { Item } from "../items/items.type";
import LookupItem from "./components/LookupItems";
import { formatNumberID } from "../../utils/helpers";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMapper } from "../../app/mapper";
import { useFieldArray, useForm } from "react-hook-form";
import type { Customer } from "../customers/customers.type";
import type { Section } from "../sections/sections.type";
import LookupSection from "./components/LookupSection";
import { useToast } from "../../components/common/ToastContext";
import FormSaleCart from "./components/FormSaleCart";
import Lookuptable from "./components/LookupTable";
import LookupTable from "./components/LookupTable";

const mapToFormValues = IMapper<SaleFormValues>({
  tanggal: (s) => s?.tanggal ?? new Date().toISOString().slice(0, 16),
  section_id: (s) => s?.section_id ?? "",
  section_name: (s) => s?.section_name ?? "",
  customer_id: (s) => s?.customer_id ?? "",
  customer_name: (s) => s?.customer_name ?? "",
  price_discount: (s) => s?.price_discount.toString() ?? "0",
  price_shipping: (s) => s?.price_shipping.toString() ?? "0",
  details: (s) =>
    s?.details?.map((d: any) => ({
      item_id: d.item_id?.toString() ?? "",
      item_name: d.item_name ?? "",
      price: d.price ?? 0,
      qty: d.qty ?? 1,
      amount: d.amount ?? 0,
    })) ?? [],
});

export default function SaleAddPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams<{ id: string }>();

  const [saleCollection, setSaleCollection] = useState<Sale | null>(null);
  const [isLookupTableOpen, setIsLookupTableOpen] = useState(false);
  const [isLookupItemOpen, setIsLookupItemOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<
    "DINE_IN" | "TAKEAWAY" | "DELIVERY"
  >("DINE_IN");

  const [transactionDetailsValues, setTransactionDetailsValues] = useState<
    SaleDetails[]
  >([]);

  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [notes, setNotes] = useState("");

  const defaultValues = mapToFormValues(saleCollection ?? undefined);

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SaleFormValues>({
    resolver: zodResolver(SaleSchema),
    defaultValues,
  });

  const watchform = watch();
  const fieldArray = useFieldArray({
    control,
    name: "details",
  });

  const [isLookupCustomerOpen, setIsLookupCustomerOpen] = useState(false);
  const selectedCustomer = (customer: Customer) => {
    setValue("customer_id", customer.id.toString());
    setValue("customer_name", customer.name);
  };

  const [isLookupSectionOpen, setIsLookupSectionOpen] = useState(false);
  const selectedSection = (section: Section) => {
    setValue("section_id", section.id.toString());
    setValue("section_name", section.name);
  };

  // --- Payment State ---
  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "TRANSFER" | "CREDIT_CARD"
  >("CASH");
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = transactionDetailsValues.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const tax = subtotal * 0.1; // 10% Tax Example
  const grandTotal = Math.max(
    0,
    subtotal + tax + shippingCost - discountAmount,
  );
  const change = Math.max(0, amountPaid - grandTotal);

  // --- Handlers ---
  const addToCart = (items: Item[]) => {
    items.forEach((product) => {
      const existing = fieldArray.fields.find((item) => item.id === product.id);
      if (existing) {
        const item = fieldArray.fields[product.id];
        fieldArray.update(product.id, {
          ...item,
          qty: item.qty + 1,
          amount: (item.qty + 1) * item.price,
        });
      } else {
        const newItem: any = {
          item_id: product.id,
          item_name: product.name,
          price: product.price_sale,
          qty: 1,
          unit: product.unit_sale,
          amount: product.price_sale,
        };

        fieldArray.append(newItem);
      }
    });
  };

  const applyDiscountCode = () => {
    // Mock discount logic
    if (discountCode.toUpperCase() === "DISCOUNT10") {
      setDiscountAmount(subtotal * 0.1); // 10% off
      alert("Discount applied: 10%");
    } else if (discountCode.toUpperCase() === "PROMO50") {
      setDiscountAmount(subtotal * 0.5);
      alert("Discount applied: $50");
    } else {
      alert("Invalid discount code");
      setDiscountAmount(0);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <PageHeader
          title={
            <>
              <ShoppingBasket className="text-blue-600" /> Sales Management {id}
            </>
          }
          description="Manage system Sales, roles, and access controls."
          action={
            <>
              <Button onClick={() => navigate("/sales")} className="gap-2">
                <NotebookTabs size={18} /> List Sales
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/sales")}
                className="gap-2"
              >
                <Archive size={18} /> List Draft
              </Button>
            </>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              <Landmark size={20} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Section
              </label>

              <input
                type="text"
                {...register("section_name")}
                placeholder="Select Section"
                className="w-full bg-transparent border-none p-0 text-sm font-medium text-gray-900 focus:ring-0 placeholder-gray-300"
                disabled={true}
              />
            </div>
            <button
              onClick={() => setIsLookupSectionOpen(true)}
              className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:bg-blue-600 hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-lg">
              <User size={20} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Customer
              </label>

              <input
                type="text"
                {...register("customer_name")}
                placeholder="Select Customer"
                className="w-full bg-transparent border-none p-0 text-sm font-medium text-gray-900 focus:ring-0 placeholder-gray-300"
                disabled={true}
              />
            </div>
            <button
              onClick={() => setIsLookupCustomerOpen(true)}
              className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:bg-blue-600 hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-lg">
              {transactionType === "DINE_IN" ? (
                <Utensils size={20} />
              ) : transactionType === "DELIVERY" ? (
                <ShoppingBag size={20} />
              ) : (
                <ShoppingBasket size={20} />
              )}
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Type
              </label>
              <select
                className="w-full bg-transparent border-none p-0 text-sm font-medium text-gray-900 focus:ring-0 cursor-pointer"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value as any)}
              >
                <option value="DINE_IN">Dine In</option>
                <option value="TAKEAWAY">Takeaway</option>
                <option value="DELIVERY">Delivery</option>
              </select>
            </div>
          </div>

          {transactionType === "DINE_IN" && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="p-4 bg-orange-50 text-orange-600 rounded-lg">
                <Utensils size={20} />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Table No
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-none p-0 text-sm font-medium text-gray-900 focus:ring-0 placeholder-gray-300"
                  value={watchform.customer_id ?? "-"}
                  disabled={true}
                />
              </div>

              <button
                onClick={() => setIsLookupTableOpen(true)}
                className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:bg-blue-600 hover:text-white"
              >
                <Plus size={16} />
              </button>
            </div>
          )}

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="p-4 bg-green-50 text-green-600 rounded-lg">
              <Calendar size={20} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Date
              </label>
              <input
                type="datetime-local"
                className="w-full bg-transparent border-none p-0 text-sm font-medium text-gray-900 focus:ring-0"
                value={watchform.tanggal}
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* --- LEFT COLUMN: CART & ADJUSTMENTS (8/12) --- */}
          <div className="lg:col-span-8 space-y-6">
            {/* Product Cart */}
            <FormSaleCart
              fieldArray={fieldArray}
              openLookup={() => setIsLookupItemOpen(true)}
            />

            {/* Transaction Adjustments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-4">
                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Tag size={18} className="text-gray-500" />
                      Discount / Coupon
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <ScissorsLineDashed
                          size={14}
                          className="absolute left-3 top-3 text-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Enter code (e.g. DISCOUNT10)"
                          className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={discountCode}
                          onChange={(e) => {
                            setDiscountCode(e.target.value);
                          }}
                        />
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={applyDiscountCode}
                      >
                        <ScissorsLineDashed size={14} className="mr-1" /> Apply
                        Coupon
                      </Button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-semibold text-gray-400">
                        Rp.
                      </span>
                      <input
                        type="text"
                        placeholder="0.00"
                        className="w-full pl-8 text-right pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={formatNumberID(watchform.price_discount || 0)}
                        onChange={(e) => {
                          setValue(
                            "price_discount",
                            e.target.value.replace(/\D/g, ""),
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-4">
                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Truck size={18} className="text-gray-500" /> Payment
                      Shipping & Logistic
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-semibold text-gray-400">
                        Rp.
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full pl-8  text-right pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={shippingCost || ""}
                        onChange={(e) =>
                          setShippingCost(parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Add internal notes..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: SUMMARY & PAYMENT (4/12) --- */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-4">
            {/* Calculations Card */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Calculator size={18} className="text-gray-500" /> Payment
                  Summary
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
                    {formatNumberID(shippingCost.toFixed(2))}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-green-600 font-medium">
                  <span>Discount</span>
                  <span>{formatNumberID(discountAmount.toFixed(2))}</span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-gray-900 font-bold">
                      Total Payable
                    </span>
                    <span className="text-3xl font-bold text-blue-600 tracking-tight">
                      {formatNumberID(grandTotal.toFixed(2))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 flex flex-row gap-2 border-t border-gray-100">
                <Button
                  className="w-full py-3.5 text-base shadow-lg shadow-blue-200 mb-3"
                  disabled={
                    transactionDetailsValues.length === 0 &&
                    watchform.section_id != null
                  }
                  onClick={() => {
                    setAmountPaid(grandTotal);
                  }}
                >
                  <CreditCard size={18} className="mr-2" />
                  Proceed to Payment
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-3.5 text-base shadow-lg shadow-blue-200 mb-3"
                  disabled={
                    transactionDetailsValues.length === 0 &&
                    watchform.customer_id != null
                  }
                  onClick={() => {
                    setAmountPaid(grandTotal);
                  }}
                >
                  <Save size={18} className="mr-2" />
                  Save Draft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LookupSection
        onSelect={(section) => {
          selectedSection(section[0] as Section);
          setIsLookupSectionOpen(false);
        }}
        onClose={() => setIsLookupSectionOpen(false)}
        isOpen={isLookupSectionOpen}
      />

      <LookupCustomer
        onSelect={(customer) => {
          selectedCustomer(customer[0] as Customer);
          setIsLookupCustomerOpen(false);
        }}
        onClose={() => setIsLookupCustomerOpen(false)}
        isOpen={isLookupCustomerOpen}
      />

      <LookupItem
        onSelect={(item) => {
          addToCart(item);
          setIsLookupItemOpen(false);
        }}
        onClose={() => setIsLookupItemOpen(false)}
        isOpen={isLookupItemOpen}
      />

      <LookupTable
        isTableModalOpen={isLookupTableOpen}
        setIsTableModalOpen={(open) => setIsLookupTableOpen(open)}
        setTableNumber={() => {}}
        tableNumber=""
      />
    </>
  );
}
