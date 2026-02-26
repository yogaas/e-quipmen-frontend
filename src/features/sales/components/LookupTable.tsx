import { Modal } from "../../../components/ui/Modal";

interface LookuptableProp {
  isTableModalOpen: boolean;
  setIsTableModalOpen: (open: boolean) => void;
  setTableNumber: (table: string) => void;
  tableNumber: string;
}
export default function LookupTable({
  isTableModalOpen,
  setIsTableModalOpen,
  setTableNumber,
  tableNumber = "",
}: LookuptableProp) {
  return (
    <>
      <Modal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        title="Select Table"
      >
        <div className="grid grid-cols-3 gap-4 p-2">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => {
                setTableNumber(`Table ${num}`);
                setIsTableModalOpen(false);
              }}
              className={`
                h-16 rounded-xl border-2 font-bold text-lg flex items-center justify-center transition-all
                ${
                  tableNumber === `Table ${num}`
                    ? "border-blue-500 bg-blue-50 text-blue-600 shadow-md"
                    : "border-gray-100 bg-white text-gray-700 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
                }
              `}
            >
              {num}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
