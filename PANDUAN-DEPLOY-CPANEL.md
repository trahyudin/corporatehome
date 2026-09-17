# Panduan Lengkap Deploy Website Korpora ke cPanel

Dokumen ini berisi panduan langkah-demi-langkah untuk mengunggah dan menjalankan website fullstack **Korpora Web Atelier** di server hosting cPanel (Apache / LiteSpeed + PHP + MySQL).

---

## 🚀 Ringkasan Cara Cepat (Quick Start)

1. Jalankan perintah build & package di komputer Anda:
   ```bash
   npm run package:cpanel
   ```
2. Anda akan mendapatkan file **`cpanel-deploy.zip`**.
3. Buka **cPanel** > **File Manager** > buka folder **`public_html`** (atau sub-domain Anda).
4. Klik **Upload** dan pilih file `cpanel-deploy.zip`.
5. Klik kanan pada file yang baru diunggah > **Extract**.
6. **Selesai!** Website dan REST API Anda sudah langsung online.

---

## 🗄️ Opsi Database di cPanel

Backend Korpora didesain cerdas dengan sistem **Dual-Engine / Auto-Fallback**:

### Opsi A — Langsung Jalan Tanpa Setup Database (Zero-Config SQLite)
Jika Anda belum membuat database MySQL di cPanel, backend akan **secara otomatis menggunakan SQLite lokal** di `api/data/korpora.sqlite`.
- Semua data lead konsultasi, booking, whistleblowing, dan counter download akan langsung tersimpan.
- Anda tidak perlu membuat database MySQL terlebih dahulu.

### Opsi B — Menggunakan MySQL / MariaDB cPanel (Disarankan untuk Produksi)
Jika Anda ingin data terhubung ke MySQL cPanel dan dapat dilihat via **phpMyAdmin**:

1. **Buat Database & User**:
   - Di cPanel, buka menu **MySQL® Databases** (atau **MySQL Database Wizard**).
   - Buat database baru, contoh: `username_korpora`.
   - Buat user baru, contoh: `username_dbuser` dengan password yang kuat.
   - Tambahkan user tersebut ke database dengan memberikan hak akses **ALL PRIVILEGES**.

2. **Import Skema Tabel**:
   - Di cPanel, buka menu **phpMyAdmin**.
   - Pilih database `username_korpora` di panel kiri.
   - Klik tab **Import** di bagian atas.
   - Klik **Choose File**, pilih file `database/schema.sql` (dan opsional `database/seed.sql` untuk data awal).
   - Klik **Go / Kirim** di bagian bawah.

3. **Konfigurasi File `.env`**:
   - Di File Manager cPanel, buat atau edit file `.env` di folder root (`public_html/.env`):
     ```dotenv
     DB_TYPE=mysql
     DB_HOST=localhost
     DB_NAME=username_korpora
     DB_USER=username_dbuser
     DB_PASS=PasswordDatabaseAnda
     VITE_API_BASE_URL=/api
     ```
   - Simpan file.

---

## 🔍 Cara Verifikasi & Pengujian di cPanel

1. **Cek Tampilan Website**:
   Buka domain Anda di browser (contoh: `https://domainanda.com`).
   - Pastikan header, dark/light theme toggle, dan dwibahasa ID/EN bekerja normal.
   - Pastikan grafik Recharts pada Hero muncul dengan data YoY.
   - Periksa 15 kartu portofolio dan klik tombol **Sneak Peek** untuk melihat preview interaktif.

2. **Cek Koneksi API & Database**:
   - Buka URL: `https://domainanda.com/api/health`
   - Respon JSON yang benar:
     ```json
     {
       "ok": true,
       "message": "KORPORA Enterprise API is online and running.",
       "db": "connected (mysql)",
       "driver": "mysql",
       "stats": {
         "leads": 0,
         "inquiries": 0,
         "portfolio": 15
       }
     }
     ```
   - Di bagian footer website, Anda juga dapat melihat status indikator: `● API & DB: connected (mysql)`.

3. **Cek Pengiriman Form**:
   - Coba isi form **Whistleblowing & Pengadaan** di section laporan. Anda akan mendapatkan kode tanda terima unik (misal: `WB-2026-XXXX`).
   - Coba tombol **Unduh** pada Report Center; browser akan mendownload file laporan berformat `.pdf`.
   - Coba isi modal **Jadwalkan Konsultasi** atau **Booking Briefing**.

---

## 🛠️ Troubleshooting cPanel

| Masalah | Penyebab | Solusi |
|---|---|---|
| **Halaman 404 saat refresh** | File `.htaccess` terlewat atau tidak aktif | Pastikan file `.htaccess` di-extract ke `public_html` (pastikan opsi *Show Hidden Files / Dotfiles* dicentang di File Manager). |
| **API Health check error 500** | Versi PHP server < 8.0 | Di cPanel, buka **Select PHP Version** atau **MultiPHP Manager**, ubah ke **PHP 8.1 / 8.2 / 8.3**. Pastikan ekstensi `pdo`, `pdo_mysql`, dan `pdo_sqlite` aktif. |
| **Database error connection refused** | User atau password MySQL salah | Periksa kembali nama database (biasanya berawalan prefix `usernamecpanel_`), nama user, dan password di file `.env`. |
| **Iframe portofolio lambat / putih** | Jaringan pihak ketiga | Fitur **Sneak Peek** dilengkapi tombol reload dan tombol langsung untuk membuka situs di tab baru. |
