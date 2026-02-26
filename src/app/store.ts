import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/usersSlice";
import roleReducer from "../features/roles/rolesSlice";
import categoryReducer from "../features/categories/categoriesSlice";
import itemReducer from "../features/items/itemsSlice";
import supplierReducer from "../features/suppliers/suppliersSlice";
import customerReducer from "../features/customers/customersSlice";
import sectionReducer from "../features/sections/sectionsSlice";
import accountReducer from "../features/accounts/accountsSlice";
import paymentReducer from "../features/payments/paymentsSlice";
import saleReducer from "../features/sales/salesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    categories: categoryReducer,
    items: itemReducer,
    suppliers: supplierReducer,
    customers: customerReducer,
    accounts: accountReducer,
    sections: sectionReducer,
    payments: paymentReducer,
    sales: saleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
