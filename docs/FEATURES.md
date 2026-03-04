# 🌟 Dokumentasi Detail Fitur (Features Document)

Dokumen ini menjelaskan secara detail semua modul dan fitur yang tersedia pada aplikasi **e-quipments (Point of Sale)**.

## 1. 🔐 Modul Autentikasi (`/login`, `/register`)
Menangani sesi pengguna.
- **Login:** Menggunakan JWT token. Token disimpan di localStorage/cookie dan disisipkan di request header Axios.
- **Register:** Pendaftaran staf/pengguna baru.
- **Logout:** Menghapus sesi dan navigasi kembali ke `/login`.

## 2. 📊 Modul Dashboard (`/dashboard`)
Pusat informasi dan statistik ringkas untuk manajemen.
- **Metrik Utama:** Total Penjualan, Total Pendapatan, Jumlah Produk.
- **Grafik Tren:** Visualisasi data transaksi berdasarkan waktu.
- **Aktivitas Terkini:** Daftar transaksi langsung (real-time).

## 3. 👥 Manajemen Pengguna & Peran (`/users`, `/roles`)
Fitur kontrol akses dan administrasi staf.
- **Users:** Tabel pengguna aplikasi beserta peran mereka. Mendukung Add, Edit, Block/Delete User.
- **Roles:** Mendefinisikan peran spesifik. Admin dapat mengkonfigurasi permission mana saja yang boleh diakses oleh setiap role.

## 4. 🛍️ Manajemen Katalog & Inventaris (`/items`, `/categories`, `/sections`)
Modul utama untuk mengelola barang dagangan.
- **Items (Produk):** Mengelola barang yang dijual. Menetapkan SKU, Harga Beli, Harga Jual, Stok Minimum, Diskon, Kategori, dan gambar produk.
- **Categories (Kategori):** Pengelompokkan produk untuk mempermudah pencarian dan pelaporan.
- **Sections (Seksi/Area):** Berguna untuk bisnis berskala besar yang membagi barangnya berdasarkan lorong (Aisle), lantai, atau rak gudang tertentu.

## 5. 💰 Penjualan & Transaksi (`/sales`, `/sales/add`, `/sales/show/:id`)
Modul POS Kasir.
- **Point of Sale (Add Sale):** Antarmuka kasir. Pencarian cepat produk, penambahan jumlah (qty), perhitungan diskon, perpajakan (tax), dan grand total.
- **Sales History:** Riwayat transaksi. Admin/Manajer dapat melihat struk/invoice untuk transaksi masa lalu, atau membatalkan (void) transaksi jika ada kesalahan (tergantung Role).

## 6. 🤝 Mitra Bisnis (`/customers`, `/suppliers`)
Database relasi eksternal.
- **Customers (Pelanggan):** Pencatatan identitas pelanggan untuk program loyalitas, histori pembelanjaan, kontak, dan alamat pengiriman.
- **Suppliers (Pemasok):** Manajemen vendor tempat bisnis membeli stok. Berisi info kontak operasional, nomor rekening, dan rating keandalan vendor.

## 7. 💳 Keuangan (`/accounts`, `/type-payments`)
Mengelola arus uang masuk dan keluar.
- **Accounts (Akun/Rekening):** Pemetaan rekening tujuan aliran dana (Misal: Kas Utama, BCA Kasir 1, Mandiri).
- **Payment Types (Metode Pembayaran):** Jenis-jenis pembayaran yang bisa diterima di kasir (Cash, Transfer, Kartu Kredit, QRIS, E-Wallet).

## 8. 📅 Alat Produktivitas (`/calendar`, `/email`, `/widgets`)
Fitur penunjang produktivitas staf operasional.
- **Calendar:** Jadwal shift karyawan, tanggal kedatangan stok (delivery), kalender event promosi toko.
- **Email:** Fitur pengiriman pesan langsung ke pelanggan/supplier tanpa meninggalkan aplikasi (memanfaatkan backend API).
- **Widgets:** Komponen utilitas bawaan (kalkulator internal, cuaca lokasi toko, catatan tempel / sticky notes).

## 9. ⚙️ Pengaturan Aplikasi (`/settings/user`, `/settings/general`)
Kustomisasi aplikasi global.
- **User Settings:** Profil pengguna yang sedang login (Ganti password, personalisasi preferensi, foto profil).
- **General Settings:** Konfigurasi bisnis (Nama Toko, Alamat di Struk, Logo Toko, Mata Uang Utama, Format Tanggal, Pajak Default).
