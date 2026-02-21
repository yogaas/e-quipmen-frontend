import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import UserPage from "../src/features/users/userPage";
import Products from "./pages/Products";
import Calendar from "./pages/Calendar";
import Email from "./pages/Email";
import Widgets from "./pages/Widgets";
import Sales from "./pages/Sales";
import UserSettings from "./pages/settings/UserSettings";
import GeneralSettings from "./pages/settings/GeneralSettings";
import AuthPage from "./features/auth/authPage";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/ui/Toast";
import { ToastProvider, useToast } from "./components/common/ToastContext";
import RolePage from "./features/roles/rolesPage";
import CategoryPage from "./features/categories/CategoryPage";
import ItemPage from "./features/items/ItemPage";
import SectionPage from "./features/sections/SectionPage";
import CustomerPage from "./features/customers/CustomerPage";
import SupplierPage from "./features/suppliers/SupplierPage";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AccountPage from "./features/accounts/AccountPage.tsx";
import PaymentPage from "./features/payments/PaymentPage.tsx";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <ToastContainer />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/*"
          element={
            <ProtectedLayout>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/users" element={<UserPage />} />
                  <Route path="/roles" element={<RolePage />} />
                  <Route path="/items" element={<ItemPage />} />
                  <Route path="/categories" element={<CategoryPage />} />
                  <Route path="/suppliers" element={<SupplierPage />} />
                  <Route path="/customers" element={<CustomerPage />} />
                  <Route path="/sections" element={<SectionPage />} />
                  <Route path="/accounts" element={<AccountPage />} />
                  <Route path="/type-payments" element={<PaymentPage />} />

                  <Route path="/products" element={<Products />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/email" element={<Email />} />
                  <Route path="/widgets" element={<Widgets />} />
                  <Route path="/settings/user" element={<UserSettings />} />
                  <Route
                    path="/settings/general"
                    element={<GeneralSettings />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </ProtectedLayout>
          }
        />
      </Routes>
    </ToastProvider>
  );
};

export default App;
