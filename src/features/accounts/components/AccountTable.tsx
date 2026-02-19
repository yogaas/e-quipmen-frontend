import type { Account } from "../accounts.type";
import { useAccountsListPage } from "./utils/useAccountsListPage";
import {
  ChevronDown,
  Edit,
  FileText,
  Folder,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

interface AccountTableProp {
  handleEdit: (id: number) => void;
  openDeleteModal: (id: number) => void;
  handleAddChild: (id: number) => void;
}

export default function AccountTable({
  handleEdit,
  openDeleteModal,
  handleAddChild,
}: AccountTableProp) {
  const { list, loading } = useAccountsListPage();

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["1", "2", "4", "5"]),
  );

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const AccountRow = ({
    account,
    level,
  }: {
    account: Account;
    level: number;
  }) => {
    const childern = list.filter((a) => a.id_parent === account.id);

    const hasChildren = childern.length > 0;
    const isExpanded = expandedIds.has(account?.id?.toString());
    const matchesSearch =
      account.name_account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.code_account.includes(searchTerm);

    // If searching, always expand parents of matching nodes (simplified logic: just show all if search is active)
    const showNode = true; //searchTerm === "" || matchesSearch;

    // Recursive render helper
    const renderChildren = () => {
      if (!childern || childern.length === 0) return null;
      return childern.map((child) => (
        <AccountRow key={child.id} account={child} level={level + 1} />
      ));
    };

    if (searchTerm !== "" && !matchesSearch && !hasChildren) return null;

    return (
      <React.Fragment>
        {(showNode || (searchTerm !== "" && hasChildren)) && (
          <div
            className={`group flex items-center py-2.5 px-4 hover:bg-gray-50 border-b border-gray-50 transition-colors ${
              level == 0 ? "bg-gray-50/30 font-medium" : ""
            }`}
          >
            {/* Name & Tree Structure Column */}
            <div className="flex-1 flex items-center overflow-hidden">
              <div
                style={{ width: `${level * 24}px` }}
                className="shrink-0 transition-all duration-300"
              />

              <button
                onClick={() => toggleExpand(account.id.toString())}
                className={`mr-2 p-1 rounded hover:bg-gray-200 text-gray-400 transition-colors ${!hasChildren ? "invisible" : ""}`}
              >
                {isExpanded || searchTerm !== "" ? (
                  <ChevronDown
                    size={14}
                    className={isExpanded ? "rotate-180" : ""}
                  />
                ) : (
                  <ChevronDown size={14} className="rotate-0" />
                )}
              </button>
              <div
                className={`mr-3 p-1.5 rounded-md ${childern.length > 0 ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}
              >
                {childern.length > 0 ? (
                  <Folder size={16} />
                ) : (
                  <FileText size={16} />
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm ${childern.length > 0 ? "font-semibold text-gray-900" : "text-gray-700"}`}
                >
                  {account.code_account} - {account.name_account}
                </span>
              </div>
            </div>

            {/* Balance Column */}
            <div className="w-32 hidden md:block text-center">
              <Badge
                variant={account.normal_pos === "D" ? "success" : "danger"}
              >
                {account.normal_pos === "D" ? "DEBET" : "KREDIT"}
              </Badge>
            </div>

            {/* Actions Column */}
            <div className="w-20 flex justify-end gap-1 transition-opacity">
              <div className="flex items-center justify-end gap-1">
                {account.header == 1 && (
                  <button
                    type="button"
                    onClick={() => handleAddChild(account.id)}
                    aria-label="Add Child"
                    className="p-2 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleEdit(account.id)}
                  aria-label="Edit"
                  className="p-2 hover:bg-slate-100 hover:text-green-600 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => openDeleteModal(account.id)}
                  aria-label="Delete"
                  className="p-2 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 rounded-lg text-slate-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
        {(isExpanded || searchTerm !== "") && renderChildren()}
      </React.Fragment>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col min-h-[600px]">
      {/* Toolbar */}
      <div className="p-5 border-b border-gray-50 bg-white flex justify-between items-center gap-4">
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Search by code or name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 dark:text-slate-200 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExpandedIds(new Set())}
            className="hidden sm:flex"
          >
            Collapse All
          </Button>
        </div>
      </div>

      {/* Header Row */}
      <div className="flex items-center py-3 px-4 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="flex-1 pl-10">Account Name</div>
        <div className="w-40 text-center hidden sm:block">Type</div>
        <div className="w-30 text-right">Actions</div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-8 bg-gray-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : list.length > 0 ? (
          <div className="pb-4">
            {list
              .filter((account) => account.header == 1)
              .map((account) => (
                <AccountRow key={account.id} account={account} level={0} />
              ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <p>No accounts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
