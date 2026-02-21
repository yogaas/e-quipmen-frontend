import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../features/auth/authSlice";
import type { AppDispatch } from "../../app/store";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle,
  Settings2,
  ChevronDown,
  ShoppingCart,
  UserStar,
  UserSearch,
  KeySquare,
  Warehouse,
  CreditCard,
  ShoppingBasket,
  ShoppingBag,
  Book,
  NotebookPen,
  BookOpen,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  subItems?: { name: string; path: string; icon?: React.ReactNode }[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    navigate("/login", { replace: true });
  };

  const sections: MenuSection[] = [
    {
      title: "General",
      items: [
        {
          name: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/dashboard",
        },
      ],
    },
    {
      title: "Transaction",
      items: [
        {
          name: "Sales (POS)",
          icon: <ShoppingCart size={18} />,
          path: "/sales/add",
        },
        {
          name: "Sales",
          icon: <ShoppingBasket size={18} />,
          path: "/sales",
        },
        {
          name: "Purchases",
          icon: <ShoppingBag size={18} />,
          path: "/purchases",
        },
      ],
    },
    {
      title: "Accountans",
      items: [
        {
          name: "Journals",
          icon: <NotebookPen size={18} />,
          path: "/customers",
        },
        {
          name: "General Ledger",
          icon: <Book size={18} />,
          path: "/customers",
        },
        {
          name: "Trial Balance",
          icon: <BookOpen size={18} />,
          path: "/customers",
        },
      ],
    },
    {
      title: "Master Data",
      items: [
        {
          name: "Users",
          icon: <Users size={18} />,
          path: "/users",
          subItems: [
            { name: "User", path: "/users" },
            { name: "Roles & Permissions", path: "/roles" },
          ],
        },
        {
          name: "Products",
          icon: <Package size={18} />,
          path: "/products",
          subItems: [
            { name: "Products", path: "/items" },
            { name: "Categories", path: "/categories" },
          ],
        },
        { name: "Customer", icon: <UserStar size={18} />, path: "/customers" },
        {
          name: "Supplier",
          icon: <UserSearch size={18} />,
          path: "/suppliers",
        },
        { name: "Section", icon: <Warehouse size={18} />, path: "/sections" },
        {
          name: "COA (Accounts)",
          icon: <KeySquare size={18} />,
          path: "/accounts",
        },
        {
          name: "Type Payment",
          icon: <CreditCard size={18} />,
          path: "/type-payments",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          name: "Settings",
          icon: <Settings size={18} />,
          path: "/settings",
          subItems: [
            {
              name: "Profile",
              path: "/settings/user",
              icon: <UserCircle size={14} />,
            },
            {
              name: "Platform",
              path: "/settings/general",
              icon: <Settings2 size={14} />,
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.subItems?.some((sub) => location.pathname === sub.path)) {
          if (!expandedMenus.includes(item.name)) {
            setExpandedMenus((prev) => [...prev, item.name]);
          }
        }
      });
    });
  }, [location.pathname]);

  const toggleExpand = (name: string) => {
    setExpandedMenus((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  return (
    <aside
      className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-40 ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
        <div
          className={`flex items-center gap-2.5 overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
        >
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
            N
          </div>
          <span className="font-bold text-lg tracking-tight dark:text-white">
            Nexus
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            {isOpen && (
              <h5 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400/80 dark:text-slate-500">
                {section.title}
              </h5>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isExpanded = expandedMenus.includes(item.name);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isActive = location.pathname.startsWith(item.path);

                return (
                  <div key={item.name}>
                    {hasSubItems ? (
                      <button
                        onClick={() => isOpen && toggleExpand(item.name)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200
                          ${isActive && !isOpen ? "bg-primary-50 text-primary-600 dark:bg-primary-950/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`${isActive ? "text-primary-600" : ""}`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`text-sm font-medium transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 hidden"}`}
                          >
                            {item.name}
                          </span>
                        </div>
                        {isOpen && (
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                          ${isActive ? "bg-primary-50 text-primary-600 dark:bg-primary-950/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}
                        `}
                      >
                        {item.icon}
                        <span
                          className={`text-sm font-medium transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 hidden"}`}
                        >
                          {item.name}
                        </span>
                      </NavLink>
                    )}

                    {isOpen && hasSubItems && isExpanded && (
                      <div className="mt-1 ml-4 pl-4 border-l border-slate-100 dark:border-slate-800 space-y-1 animate-in slide-in-from-top-1 duration-200">
                        {item.subItems!.map((sub) => (
                          <NavLink
                            key={sub.name}
                            to={sub.path}
                            className={({ isActive }) => `
                              block px-3 py-1.5 text-[13px] rounded-md transition-all
                              ${isActive ? "text-primary-600 font-semibold bg-primary-50/50 dark:bg-primary-950/10" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"}
                            `}
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 rounded-xl transition-all duration-200"
        >
          <LogOut size={18} />
          <span
            className={`text-sm font-medium ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
          >
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
