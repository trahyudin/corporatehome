# Dokumentasi & Laporan Akhir KP — **Korpora Web Atelier**

Repositori dokumen ini berisi **dokumentasi teknis** dan **laporan akhir Kerja Praktik (KP)** untuk project *Korpora Web Atelier* — sebuah landing page B2B berbahasa Indonesia + Inggris yang menjual jasa *arsitektur website enterprise* kepada korporasi, konglomerasi, dan holding group.

> **Cara pakai:** semua section di bawah bisa digabung menjadi satu laporan (lihat `Laporan-KP-Korpora-Lengkap.md`), atau diambil per-bab sesuai kebutuhan pengumpulan tugas.

---

## Daftar Isi

| # | Dokumen | Isi |
|---|---------|-----|
| 1 | [`01-ringkasan-eksekutif.md`](./01-ringkasan-eksekutif.md) | Latar belakang, tujuan/problem statement, scope & batasan |
| 2 | [`02-daftar-project-modul.md`](./02-daftar-project-modul.md) | Inventarisasi project + daftar modul/komponen & fungsinya (termasuk **daftar 15 link demo website portofolio**) |
| 3 | [`03-arsitektur-perancangan.md`](./03-arsitektur-perancangan.md) | Tech stack, arsitektur sistem, skema data (pengganti ERD), API reference |
| 4 | [`04-panduan-instalasi-deployment.md`](./04-panduan-instalasi-deployment.md) | Prasyarat, cara jalan lokal, deploy produksi, konfigurasi `.env` |
| 5 | [`05-hasil-pengujian.md`](./05-hasil-pengujian.md) | Skenario & hasil pengujian (manual + verifikasi programatik) |
| 6 | [`06-pengembangan-mendatang.md`](./06-pengembangan-mendatang.md) | Future improvements, known bugs, backlog |
| — | [`Laporan-KP-Korpora-Lengkap.md`](./Laporan-KP-Korpora-Lengkap.md) | Gabungan semua bab di atas (siap submit) |

---

## Identitas (lengkapi sebelum submit)

| Field | Nilai |
|---|---|
| Nama Mahasiswa | `[NAMA_MAHASISWA]` |
| NIM | `[NIM]` |
| Universitas / Program Studi | `[UNIVERSITAS]` / `[PRODI]` |
| Perusahaan / Divisi | `[NAMA_PERUSAHAAN]` — `[DIVISI]` |
| Periode KP | `[TANGGAL_MULAI]` – `[TANGGAL_SELESAI]` |
| Pembimbing Lapangan | `[NAMA_PEMBIMBING_LAPANGAN]` |
| Pembimbing Kampus | `[NAMA_PEMBIMBING_KAMPUS]` |
| Judul Project | Korpora Web Atelier — Landing Page Solusi Website Enterprise |
| Repo / Preview | `https://perchance.org/[nama-generator]` |
| Versi Dokumen | 1.0 — `[TANGGAL_DOKUMEN]` |

---

## Ringkasan Satu Paragraf

Project KP ini menghasilkan **satu project web** berupa *single-page application* (SPA) untuk keperluan **sales & lead generation** sebuah studio web enterprise. Aplikasi dibangun dengan **React 18 + Tailwind CSS + Framer Motion + Recharts + lucide-react**, di-bundle dengan **esbuild-wasm** menjadi satu file `bundle.js`, serta mendukung **dwibahasa (ID/EN)**, **tema terang/gelap**, kalkulasi *lead capture* melalui tiga formulir, dan panel data finansial interaktif. Seluruh konten masih berupa data statis di sisi klien — **belum ada backend, database, maupun REST API** (lihat bagian *Batasan* di bab 1 dan rencana pengembangan di bab 6).
