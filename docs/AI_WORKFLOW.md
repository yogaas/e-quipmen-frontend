# 🤖 Panduan Alur Kerja AI (AI Workflow Guide)

Dokumen ini ditujukan untuk AI Assistant atau Software Engineer yang akan mengembangkan, memelihara, atau menambahkan fitur pada aplikasi **e-quipments Frontend**.

## 🏗️ 1. Arsitektur Proyek

Proyek ini menggunakan **Feature-Based Architecture (Screaming Architecture)**. Setiap modul mandiri dan berisi UI, logic, state, dan service-nya sendiri. 

Lokasi utama pekerjaan: `src/features/`

### Struktur Standard sebuah Feature Folder:
```text
src/features/[featureName]/
├── [FeatureName]Page.tsx       # Entry point halaman (didaftarkan di App.tsx)
├── [featureName].type.ts       # Definisi interface TypeScript (DTO dari/ke API)
├── [featureName]Service.ts     # Pemanggilan Axios API (GET, POST, PUT, DELETE)
├── [featureName]Slice.ts       # Redux Toolkit (State, Reducers, AsyncThunks)
└── components/                 # Komponen React khusus untuk fitur ini (Form, Table, Modal)
```

## 🔄 2. State Management & Data Flow

Proyek ini menggunakan **Redux Toolkit** dengan pola **Async Thunks** untuk state global.
Pola pengambilan data (Data Flow):
1. **Komponen** dispatch sebuah AsyncThunk (misal: `dispatch(fetchItems())`).
2. **Thunk** (di Slice) memanggil **Service** (Axios).
3. **Service** melakukan request ke Backend API dan mengembalikan data.
4. **Thunk** menerima `fulfilled`, dan reducer di Slice memperbarui Global State.
5. **Komponen** menggunakan `useSelector` bereaksi terhadap perubahan state dan merender ulang UI.

**Catatan AI:** Saat membuat fitur CRUD baru, JANGAN menggunakan local state untuk data utama. Wajib buat Thunk dan masukkan ke dalam Slice.

## 🧭 3. Routing & Navigasi

Semua routing diatur secara terpusat di `src/App.tsx`.
Pola Routing:
- **Public Routes:** `/login`, `/register`
- **Protected Routes:** Dibungkus oleh `<ProtectedLayout>` dan `<ProtectedRoute>`.
- Jika Anda membuat halaman baru, pastikan untuk meregistrasinya di dalam tag `<Route>` di `App.tsx` di dalam `ProtectedLayout`.

## 🛠️ 4. Langkah-langkah Menambah Fitur Baru (SOP AI)

Jika Anda (AI) diminta untuk **menambahkan fitur CRUD baru** (misalnya "Gudang"), ikuti alur kerja ini:

1. **Buat Type Definition:**
   Buat `src/features/warehouses/warehouses.type.ts` definisikan interface `Warehouse`.
2. **Buat Service:**
   Buat `src/features/warehouses/warehousesService.ts` dengan method Axios (GET, POST, dll).
3. **Buat Slice (Redux):**
   Buat `src/features/warehouses/warehousesSlice.ts`. Buat async thunks dan reducers.
   *Penting:* Registrasikan reducer ini di `src/app/store.ts`.
4. **Buat UI Components:**
   Buat tabel, form, modal di `src/features/warehouses/components/`. Gunakan reusable UI dari `src/components/common/` (seperti `DataTable.tsx`).
5. **Buat Page Component:**
   Buat `src/features/warehouses/WarehousePage.tsx` yang menggabungkan seluruh komponen.
6. **Daftarkan Route:**
   Tambahkan impor dan route di `src/App.tsx` (misal: `<Route path="/warehouses" element={<WarehousePage />} />`).
7. **Tambahkan Navigasi:**
   Jika diminta, tambahkan link di `src/components/layout/Sidebar.tsx`.

## 🎨 5. Sistem Styling dan UI Framework

- **Tailwind CSS** digunakan untuk seluruh styling UI.
- Kelas khusus seperti `.dark` diatur dari root document untuk **Dark Mode**.
- Pastikan komponen baru mendukung layout responsif (`md:`, `lg:`) dan warna standar dari tema, serta `dark:` modifier untuk dark mode.
- Jangan membuat custom CSS di `.css` jika bisa dicapai dengan utility class Tailwind.

## 📦 6. Dependensi Penting

- **Router:** `react-router-dom` v6
- **Form & Validasi:** `react-hook-form` + `@hookform/resolvers/zod` + `zod`
- **Tabel / Query:** Proyek memiliki `@tanstack/react-query` namun mayoritas state management dan fetching menggunakan `Redux Toolkit` Thunks. Cek implementasi fitur lain sebelum menambahkan Query.
- **Icon:** `lucide-react`

---
*Dengan mengikuti alur dokumen ini, setiap Agent AI dapat menjaga konsistensi arsitektur dan standar kode proyek e-quipments.*
