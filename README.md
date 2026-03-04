# 📦 e-quipments – Point of Sale (POS)

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Built with](https://img.shields.io/badge/built%20with-React%20%2B%20TypeScript-blue.svg)

Sistem Point of Sale modern yang komprehensif untuk mengelola penjualan, inventaris, pelanggan, dan laporan bisnis secara terintegrasi.

[🌐 Demo](#) • [📚 Dokumentasi API](#dokumentasi-api) • [🤖 Workflow AI](./docs/AI_WORKFLOW.md) • [📖 Detail Fitur](./docs/FEATURES.md)

</div>

---

## 📋 Daftar Isi

- [Tentang Aplikasi](#tentang-aplikasi)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Struktur Proyek](#struktur-proyek)
- [Panduan Penggunaan](#panduan-penggunaan)
- [Dokumentasi API](#dokumentasi-api)
- [Pengembangan](#pengembangan)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

---

## 💼 Tentang Aplikasi

**e-quipments** adalah aplikasi Point of Sale (POS) berbasis web yang dirancang khusus untuk memudahkan pengelolaan transaksi penjualan, manajemen inventaris, pelanggan, dan layanan bisnis modern. Dibangun dengan **TypeScript** dan **React.js**, aplikasi ini menawarkan antarmuka yang intuitif, responsif, dan dapat diandalkan untuk berbagai skala bisnis.

### 🎯 Target Pengguna

- Pemilik toko/usaha retail
- Manajer penjualan dan operasional
- Staff kasir dan administrasi
- Staf gudang dan inventaris

### 🏆 Keunggulan e-quipments

✅ **Terintegrasi Penuh** – Semua modul penjualan, inventaris, dan pelanggan dalam satu sistem  
✅ **Keamanan Data** – Sistem autentikasi berlapis, role-based access control  
✅ **User-Friendly** – Desain intuitif dan mudah dipelajari  
✅ **Performa Tinggi** – Dibangun dengan Vite untuk build yang cepat  
✅ **Scalable** – Arsitektur berbasis Redux Toolkit untuk state management yang robust  
✅ **Responsive** – Dapat diakses di desktop, tablet, dan mobile

---

## ✨ Fitur Utama

### 🔐 **Autentikasi & Keamanan**

- **Login System** – Autentikasi pengguna dengan email dan password
- **Session Management** – Manajemen token JWT dan session pengguna
- **Protected Routes** – Halaman dilindungi dari akses yang tidak sah
- **Hook useAuth** – Akses mudah data autentikasi di seluruh aplikasi

### 👥 **Manajemen Pengguna & Role**

- **CRUD Users** – Tambah, ubah, hapus data pengguna
- **Role-Based Access** – Penetapan peran khusus (admin, manajer, staff, dll)
- **Permission Control** – Kontrol akses per modul berdasarkan role
- **User Activity Tracking** – Pencatatan aktivitas pengguna untuk audit

### 🛍️ **Manajemen Produk & Kategori**

- **Categories Management** – Kelola kategori produk
  - Buat kategori baru
  - Edit nama dan deskripsi kategori
  - Hapus kategori yang tidak digunakan
  - Filter dan pencarian kategori

- **Items Management** – Kelola daftar produk/barang
  - Tambah produk dengan detail (nama, harga, stok, kategori)
  - Edit informasi produk
  - Hapus produk dari sistem
  - Track stok barang secara real-time
  - Search dan filter produk
  - DataTable untuk visualisasi daftar produk

### 💰 **Manajemen Penjualan**

- **Sales Dashboard** – Ringkasan transaksi penjualan
- **Add New Sale** – Form untuk membuat transaksi penjualan baru
  - Pilih produk dari katalog
  - Tentukan jumlah dan harga
  - Hitung diskon dan total pembayaran
  - Simpan detail penjualan

- **Sales History** – Riwayat semua transaksi penjualan
  - Filter berdasarkan tanggal, pelanggan, status
  - Lihat detail transaksi
  - Cetak atau ekspor laporan penjualan

### 👨‍💼 **Manajemen Pelanggan & Pemasok**

- **Customer Management**
  - Registrasi pelanggan baru
  - Edit data pelanggan (nama, alamat, kontak)
  - Riwayat pembelian pelanggan
  - Kategori pelanggan (regular, VIP, dll)

- **Supplier Management**
  - Data lengkap pemasok
  - Riwayat pembelian dari pemasok
  - Detail kontak pemasok
  - Kategori dan rating pemasok

### 💳 **Manajemen Pembayaran**

- **Payment Methods** – Kelola metode pembayaran
  - Cash, Debit, Credit Card, E-wallet, dll
  - Konfigurasi biaya untuk setiap metode
  - Track pembayaran per metode

- **Payment Tracking** – Lacak semua transaksi pembayaran
- **Reconciliation** – Rekonsiliasi pembayaran dengan transaksi

### 💼 **Manajemen Akun & Seksi**

- **Sections/Areas** – Kelola area atau divisi bisnis
  - Buat seksi operasional baru
  - Edit informasi seksi
  - Kelompok produk per seksi

- **Accounts** – Manajemen akun keuangan
  - Chart of Accounts
  - Kelola perkiraan (GL Account)
  - Track saldo akun

### 📊 **Dashboard & Pelaporan**

- **Dashboard** – Ringkasan statistik utama
  - Total penjualan hari/bulan
  - Produk terlaris
  - Grafik penjualan dan tren
  - Aktivitas terkini

- **Reports** – Berbagai laporan bisnis
  - Laporan penjualan (harian, mingguan, bulanan)
  - Laporan inventaris
  - Laporan pelanggan
  - Laporan laba-rugi

### 📧 **Alat Produktivitas & Sistem**

- **Toast Notifications** – Notifikasi real-time untuk aksi user
- **Email Module** – Sistem pengiriman email (Invoice, Notifikasi, dll)
- **Calendar** – Kalender interaktif untuk mengelola jadwal operasi dan event
- **Widgets** – Widget panel fungsional untuk produktivitas staf tambahan
- **Settings** – Akses pengaturan profil pengguna dan pengaturan umum toko (General)

### 🎨 **UI & UX**

- **Responsive Design** – Kompatibel dengan berbagai ukuran layar
- **Data Tables** – Tabel interaktif dengan sort, filter, pagination
- **Modal & Form** – Form input dengan validasi
- **Custom Components** – Button, Card, Badge, Select, dan komponen UI custom
- **Theme Support** – Styling konsisten di seluruh aplikasi

---

## 🛠️ Tech Stack

### **Frontend**

| Teknologi         | Versi  | Fungsi                    |
| ----------------- | ------ | ------------------------- |
| **React**         | 18+    | UI Library & Framework    |
| **TypeScript**    | Latest | Type Safety & Development |
| **Vite**          | Latest | Build Tool & Dev Server   |
| **Redux Toolkit** | Latest | State Management          |
| **React Router**  | v6     | Routing & Navigation      |
| **Axios**         | Latest | HTTP Client               |
| **CSS**           | Modern | Styling                   |

### **Build & Tools**

| Alat           | Fungsi                        |
| -------------- | ----------------------------- |
| **ESLint**     | Code Quality & Linting        |
| **esbuild**    | JavaScript Bundler (via Vite) |
| **npm / yarn** | Package Manager               |

### **Architecture**

- **Pattern:** Feature-Folder Architecture
- **State Management:** Redux Toolkit dengan Thunk Middleware
- **API Communication:** REST API dengan Axios
- **Code Organization:** Organized by feature dengan shared components

---

## 📦 Instalasi

### Prasyarat

Pastikan Anda memiliki:

- **Node.js** v16+ installed
- **npm** atau **yarn**
- Git untuk clone repository

### Langkah Instalasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/username/e-quipments.git
   cd e-quipments
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi Environment**
   Buat file `.env` di root directory:

   ```env
   VITE_API_URL=http://localhost:3001
   VITE_APP_NAME=e-quipments
   VITE_APP_VERSION=1.0.0
   ```

4. **Jalankan Development Server**

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173`

5. **Build Production**
   ```bash
   npm run build
   # atau
   yarn build
   ```
   Output build akan tersimpan di folder `dist/`

---

## 📁 Struktur Proyek

```
e-quipments/
├── 📄 index.html                 # Entry point HTML
├── 📄 package.json               # Dependencies & scripts
├── 📄 tsconfig.json              # TypeScript config utama
├── 📄 tsconfig.app.json          # TypeScript config aplikasi
├── 📄 tsconfig.node.json         # TypeScript config Node tools
├── 📄 vite.config.ts             # Vite configuration
├── 📄 eslint.config.js           # ESLint rules
├── 📄 README.md                  # Dokumentasi ini
│
├── 🔧 public/                    # Static assets
│   └── ... favicon, images, dll
│
└── 📂 src/
    │
    ├── 🔌 api/
    │   └── api.ts                # Axios instance & base API config
    │
    ├── 📦 app/
    │   ├── error.ts              # Error handling utilities
    │   ├── hooks.ts              # Custom app-level hooks
    │   ├── mapper.ts             # Data mapper/transformer
    │   └── store.ts              # Redux store configuration
    │
    ├── 🎨 components/
    │   ├── ProtectedRoute.tsx     # Route protection wrapper
    │   │
    │   ├── common/               # Reusable business components
    │   │   ├── DataTable.tsx      # Main data table component
    │   │   ├── DataTableLookup.tsx# Lookup table variant
    │   │   ├── PageHeader.tsx     # Page header component
    │   │   ├── TableRowActions.tsx# Action buttons for table rows
    │   │   └── ToastContext.tsx   # Toast notification context
    │   │
    │   ├── layout/               # Layout components
    │   │   ├── Sidebar.tsx        # Left navigation menu
    │   │   └── Topbar.tsx         # Top navigation bar
    │   │
    │   └── ui/                   # UI primitives & base components
    │       ├── Badge.tsx          # Badge component
    │       ├── Button.tsx         # Button component
    │       ├── Card.tsx           # Card container
    │       ├── ConfirmModal.tsx   # Confirmation dialog
    │       ├── FormInput.tsx      # Text input field
    │       ├── FormSelect.tsx     # Select dropdown
    │       ├── FormSelectSearch.tsx# Searchable select
    │       ├── Modal.tsx          # Modal dialog
    │       └── Toast.tsx          # Toast notification
    │
    ├── ⚙️ config/
    │   ├── env.ts                # Environment variables
    │   └── index.ts              # Config exports
    │
    ├── 🎯 features/              # Feature modules (Feature Folder Pattern)
    │   │
    │   ├── accounts/             # Akun keuangan
    │   │   ├── AccountPage.tsx
    │   │   ├── accounts.type.ts
    │   │   ├── accountsService.ts
    │   │   ├── accountsSlice.ts
    │   │   └── components/
    │   │
    │   ├── auth/                 # Authentication module
    │   │   ├── authPage.tsx
    │   │   ├── auth.types.ts
    │   │   ├── authService.ts
    │   │   ├── authSlice.ts
    │   │   └── components/
    │   │
    │   ├── categories/           # Product categories
    │   │   ├── CategoryPage.tsx
    │   │   ├── categories.type.ts
    │   │   ├── categoriesService.ts
    │   │   ├── categoriesSlice.ts
    │   │   └── components/
    │   │
    │   ├── customers/            # Customer management
    │   │   ├── CustomerPage.tsx
    │   │   ├── customers.type.ts
    │   │   ├── customersService.ts
    │   │   ├── customersSlice.ts
    │   │   └── components/
    │   │
    │   ├── items/                # Product items
    │   │   ├── ItemPage.tsx
    │   │   ├── items.type.ts
    │   │   ├── itemsService.ts
    │   │   ├── itemsSlice.ts
    │   │   └── components/
    │   │
    │   ├── payments/             # Payment management
    │   │   ├── PaymentPage.tsx
    │   │   ├── payments.type.ts
    │   │   ├── paymentsService.ts
    │   │   ├── paymentsSlice.ts
    │   │   └── components/
    │   │
    │   ├── roles/                # Role management
    │   │   ├── rolesPage.tsx
    │   │   ├── roles.type.ts
    │   │   ├── rolesService.ts
    │   │   ├── rolesSlice.ts
    │   │   └── components/
    │   │
    │   ├── sales/                # Sales transactions
    │   │   ├── SaleAddPage.tsx    # Form tambah penjualan
    │   │   ├── SalePage.tsx       # Daftar penjualan
    │   │   ├── sales.type.ts
    │   │   ├── salesService.ts
    │   │   ├── salesSlice.ts
    │   │   └── components/
    │   │
    │   ├── sections/             # Business sections/areas
    │   │   ├── SectionPage.tsx
    │   │   ├── sections.type.ts
    │   │   ├── sectionsService.ts
    │   │   ├── sectionsSlice.ts
    │   │   └── components/
    │   │
    │   ├── suppliers/            # Supplier management
    │   │   ├── SupplierPage.tsx
    │   │   ├── suppliers.type.ts
    │   │   ├── suppliersService.ts
    │   │   ├── suppliersSlice.ts
    │   │   └── components/
    │   │
    │   └── users/                # User management
    │       └── ... (struktur serupa)
    │
    ├── 🪝 hooks/                 # Custom React hooks
    │   ├── useAuth.ts            # Authentication hook
    │   ├── useDebounce.ts        # Debounce input
    │   ├── usePagination.ts      # Pagination logic
    │   ├── useQueryParams.ts     # URL query params
    │   └── useToggle.ts          # Toggle state
    │
    ├── 📄 pages/                 # Page components (routes)
    │   ├── Calendar.tsx          # Calendar page
    │   ├── Dashboard.tsx         # Dashboard
    │   ├── Email.tsx             # Email module
    │   ├── NotFoundPage.tsx      # 404 page
    │   ├── Products.tsx          # Products overview
    │   ├── Register.tsx          # Registration page
    │   ├── Sales.tsx             # Sales page
    │   ├── Widgets.tsx           # Widgets page
    │   ├── settings/             # Settings pages
    │   └── users/                # User pages
    │
    ├── 🔧 services/
    │   └── token.service.ts      # JWT token utilities
    │
    ├── 📝 types/
    │   └── api.ts                # API response types
    │
    ├── 🛠️ utils/
    │   ├── helpers.ts            # Helper functions
    │   ├── thunkToast.ts         # Redux thunk toast notifications
    │   └── ... (utility functions)
    │
    ├── 🎨 App.css                # Global styles
    ├── 🎨 App.tsx                # Main App component
    └── 🎨 main.tsx               # React root entry
```

### Penjelasan Struktur Feature Folder

Setiap feature mengikuti pola yang konsisten:

```
feature-name/
├── [FeatureName]Page.tsx     # Main page component
├── [featureName].type.ts     # TypeScript types/interfaces
├── [featureName]Service.ts   # Business logic & API calls
├── [featureName]Slice.ts     # Redux slice (state + reducers + thunks)
└── components/               # Feature-specific UI components
    ├── [Component1].tsx
    ├── [Component2].tsx
    └── ...
```

---

## 🎮 Panduan Penggunaan

### Akses Aplikasi

1. **Login**
   - Buka aplikasi di browser
   - Masukkan email dan password
   - Klik "Login"
   - Jika sukses, dashboard akan tampil

2. **Navigasi**
   - Gunakan **Sidebar** (kiri) untuk mengakses modul-modul
   - Gunakan **Topbar** (atas) untuk user profile dan logout

### Fitur Utama Per Modul

#### **Dashboard**

- Melihat ringkasan penjualan hari ini
- Grafik tren penjualan
- Produk terlaris
- Aktivitas terakhir

#### **Penjualan (Sales)**

- **Tambah Penjualan** (`SaleAddPage`)
  - Pilih pelanggan
  - Tambahkan produk ke keranjang
  - Tentukan metode pembayaran
  - Proses pembayaran
- **Riwayat Penjualan** (`SalePage`)
  - Lihat semua transaksi
  - Filter berdasarkan tanggal/pelanggan
  - Cetak invoice

#### **Produk (Items)**

- **Tambah Produk**
  - Isi nama, harga, stok
  - Pilih kategori
  - Simpan

- **Edit Produk**
  - Update harga, stok, kategori
  - Simpan perubahan

- **Hapus Produk**
  - Pilih produk dari daftar
  - Klik delete dan konfirmasi

#### **Kategori**

- CRUD kategori yang sama seperti produk

#### **Pelanggan**

- Registrasi pelanggan baru
- Lihat riwayat pembelian
- Edit data pelanggan
- Delete pelanggan

#### **Pemasok & Akun**

- Kelola data pemasok seperti pelanggan
- Kelola akun keuangan untuk laporan

---

## 📄 Dokumentasi Tambahan

Untuk referensi detail fitur UI maupun standar panduan pengembangan agen AI:
- [🤖 **Panduan Alur Kerja AI (AI Workflow)**](./docs/AI_WORKFLOW.md)
- [📖 **Dokumentasi Detail Fitur**](./docs/FEATURES.md)

---

## 📚 Dokumentasi API

### Base URL

```
http://localhost:3001/api
```

### Authentication

Semua request (kecuali login) memerlukan Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Endpoints Utama

#### **Authentication**

```http
POST   /auth/login           # Login user
POST   /auth/logout          # Logout user
POST   /auth/register        # Register user baru
POST   /auth/refresh         # Refresh token
```

#### **Items (Produk)**

```http
GET    /items                # Dapatkan daftar item
GET    /items/:id            # Dapatkan item by ID
POST   /items                # Buat item baru
PUT    /items/:id            # Update item
DELETE /items/:id            # Hapus item
```

#### **Categories**

```http
GET    /categories           # Dapatkan semua kategori
GET    /categories/:id       # Dapatkan kategori by ID
POST   /categories           # Buat kategori baru
PUT    /categories/:id       # Update kategori
DELETE /categories/:id       # Hapus kategori
```

#### **Customers**

```http
GET    /customers            # Dapatkan daftar pelanggan
GET    /customers/:id        # Dapatkan pelanggan by ID
POST   /customers            # Buat pelanggan baru
PUT    /customers/:id        # Update pelanggan
DELETE /customers/:id        # Hapus pelanggan
GET    /customers/:id/sales  # Riwayat pembelian pelanggan
```

#### **Sales**

```http
GET    /sales                # Dapatkan daftar penjualan
GET    /sales/:id            # Detail penjualan
POST   /sales                # Buat transaksi penjualan baru
PUT    /sales/:id            # Update penjualan
DELETE /sales/:id            # Batalkan penjualan
GET    /sales/report/daily   # Laporan penjualan harian
```

#### **Payments**

```http
GET    /payments             # Dapatkan metode pembayaran
POST   /payments             # Catat pembayaran
GET    /payments/reconcile   # Rekonsiliasi pembayaran
```

#### **Users & Roles**

```http
GET    /users                # Dapatkan daftar user
POST   /users                # Buat user baru
PUT    /users/:id            # Update user
DELETE /users/:id            # Hapus user
GET    /roles                # Dapatkan daftar role
POST   /roles                # Buat role baru
```

#### **Reports**

```http
GET    /reports/sales        # Laporan penjualan
GET    /reports/inventory    # Laporan inventaris
GET    /reports/customer     # Laporan pelanggan
```

---

## 🔧 Pengembangan

### Mode Development

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Preview Build

```bash
npm run preview
```

### Struktur Development

#### Redux Slice

Setiap feature memiliki slice untuk state management:

```typescript
// itemsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { itemsService } from "./itemsService";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (params, { rejectWithValue }) => {
    try {
      return await itemsService.getItems(params);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const itemsSlice = createSlice({
  name: "items",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemsSlice.reducer;
```

#### Service Layer

Services menangani business logic dan API calls:

```typescript
// itemsService.ts
import api from "../../api/api";
import { Items } from "./items.type";

export const itemsService = {
  getItems: async (params) => {
    const response = await api.get("/items", { params });
    return response.data;
  },

  getItemById: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  createItem: async (data: Items) => {
    const response = await api.post("/items", data);
    return response.data;
  },

  updateItem: async (id, data: Items) => {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  },

  deleteItem: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  },
};
```

#### Custom Hooks

Hooks tersedia untuk reusable logic:

```typescript
// useAuth.ts
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};

// useDebounce.ts
import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

---

## 🐛 Troubleshooting

### Masalah Umum

#### 1. **Aplikasi tidak berjalan di port 5173**

- Pastikan port 5173 tidak terpakai aplikasi lain
- Ubah port di `vite.config.ts`:
  ```typescript
  export default {
    server: { port: 3000 },
  };
  ```

#### 2. **CORS Error saat memanggil API**

- Pastikan backend API sudah running
- Cek URL API di `.env` apakah benar
- Backend harus mengizinkan CORS dari frontend URL

#### 3. **Token Expired**

- Token otomatis di-refresh lewat thunk interceptor
- Jika masih error, login ulang

#### 4. **Build Error - Module tidak ditemukan**

```bash
# Clear node_modules dan reinstall
rm -rf node_modules
npm install
```

#### 5. **TypeScript Error**

- Pastikan versi TypeScript compatible
- Run: `npm run build` untuk check semua errors

---

## 🚀 Roadmap

- [ ] **v1.1** – Fitur multi-bahasa (i18n)
- [ ] **v1.2** – Export ke Excel/PDF
- [ ] **v1.3** – Mobile app (React Native)
- [ ] **v1.4** – Integrasi pembayaran online (Stripe, Xendit)
- [ ] **v1.5** – Advanced analytics & charts
- [ ] **v1.6** – Barcode scanning
- [ ] **v2.0** – Fitur multi-toko / multi-branch
- [ ] **v2.1** – Integrasi inventory otomatis
- [ ] **v2.2** – AI-powered sales forecasting

---

## 🤝 Kontribusi

Kami menerima kontribusi dari komunitas! Untuk berkontribusi:

1. **Fork repository**
2. **Buat feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Buat Pull Request**

### Standar Kontribusi

- Follow code style yang ada (ESLint)
- Tambahkan test untuk fitur baru
- Update dokumentasi jika diperlukan
- Deskripsi PR harus jelas dan detail

---

## 📄 Lisensi

Project ini dilisensikan di bawah **MIT License** – lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

## 👨‍💻 Penulis

**Tim Pengembang e-quipments**

Untuk pertanyaan atau support, silakan buka issue di repository atau hubungi tim development.

---

<div align="center">

**[⬆ back to top](#-e-quipments--point-of-sale-pos)**

Dibuat dengan ❤️ menggunakan React + TypeScript

</div>
