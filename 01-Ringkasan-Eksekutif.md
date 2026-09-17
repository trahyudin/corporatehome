# Bab 1 — Laporan Ringkas / Executive Summary

## 1.1 Latar Belakang

`[NAMA_PERUSAHAAN]` bergerak di bidang jasa **arsitektur & pengembangan website kelas korporat**. Segmen pelanggan perusahaan adalah *large enterprise*, **konglomerasi**, dan **holding group** — organisasi yang sering memiliki banyak anak perusahaan, portal *Investor Relations* (IR), laporan tahunan/ESG, serta kewajiban tata kelola (*Good Corporate Governance*/GCG) dan kepatuhan (SOC 2, ISO 27001, GDPR, WCAG).

Masalah yang ditemukan di lapangan sebelum project ini:

1. **Materi sales tidak "berbicara bahasa korporat".** Proposal/downloadable deck yang ada bersifat teknis (portofolio desain, fitur teknis), sementara pengambil keputusan di perusahaan besar adalah direksi, *board*, dan tim *procurement* yang menilai sesuatu dari sisi **tata kelola, kepatuhan, keamanan, dan reputasi**, bukan sekadar estetika.
2. **Bukti kompetensi tidak terkumpul dalam satu tempat.** Portofolio tersebar, tidak ada satu halaman yang secara meyakinkan memetakan *"masalah organisasi Anda → arsitektur yang kami bangun → hasil terukur"*.
3. **Belum ada kanal akuisisi mandiri (self-serve).** Calon klien harus menghubungi via email biasa; tidak ada jalur untuk meminta *quote*, *booking briefing*, atau *pengajuan RFP* langsung dari website, dan tidak ada *content center* (laporan tahunan, katalog, ringkasan finansial) yang bisa diakses tanpa negosiasi.
4. **Tim marketing perlu mengubah konten tanpa developer.** Tidak ada satu tempat untuk melihat struktur penawaran (level kompleksitas organisasi, scope kerja, paket, add-on) yang bisa dipakai ulang sebagai *source of truth* sales.

## 1.2 Tujuan / Problem Statement

Project KP ini bertujuan membangun **satu landing page B2B yang menjadi "digital sales room"** untuk penjualan jasa website enterprise. Secara spesifik, problem statement yang diselesaikan:

> **PS-1** — Bagaimana menyampaikan nilai jasa arsitektur website ke *stakeholder* perusahaan besar dalam bahasa **governance, compliance, dan skala bisnis** (bukan bahasa kode), dalam **satu halaman yang bisa dipakai sales sebagai rujukan tunggal**?

> **PS-2** — Bagaimana menyediakan **jalur konversi mandiri** (konsultasi, permintaan quote, pengajuan RFP/pengadaan) langsung dari halaman, tanpa bergantung pada percakapan email manual?

> **PS-3** — Bagaimana menyajikan **bukti & materi pendukung** (portofolio live, studi kasus Challenge→Solution→Result, pusat laporan tahunan/ESG, FAQ kepercayaan) yang meyakinkan *board* dan tim kepatuhan untuk melangkah ke tahap negosiasi?

> **PS-4** — Bagaimana membuat halaman tersebut **mudah dikelola** (dwibahasa, tema, konten terstruktur) sehingga tim marketing non-teknis dapat memeliharanya?

## 1.3 Tujuan Project (Deliverable)

| Kode | Tujuan | Status |
|---|---|---|
| G-1 | Landing page responsif satu halaman dengan narasi enterprise (GCG, kepatuhan, multi-entity) | ✅ Selesai |
| G-2 | Sistem **dwibahasa (ID/EN)** dengan prioritas Bahasa Indonesia, persisten | ✅ Selesai |
| G-3 | **Tema gelap/terang** yang bisa diganti pengguna dan disimpan | ✅ Selesai |
| G-4 | Halaman portofolio berisi **preview live** dari karya yang sudah dirilis | ✅ Selesai |
| G-5 | **Widget interaktif**: pusat laporan/PDF + kanal *whistleblowing* & pengadaan | ✅ Selesai |
| G-6 | **Jalur lead capture** (modal konsultasi, booking briefing, form pengadaan) | ✅ Selesai (validasi klien) |
| G-7 | Struktur penawaran: pilar enterprise, level kompleksitas organisasi, scope/paket, add-on, FAQ | ✅ Selesai |
| G-8 | Integrasi pengiriman lead ke backend/CRM | ⛔ Belum (lihat Bab 6) |
| G-9 | Unduhan PDF asli dari *Report Center* | ⛔ Belum (saat ini hanya state UI) |

## 1.4 Scope (Batasan) Fitur

**Termasuk dalam scope KP:**

- Frontend SPA React (satu halaman, *scrolling sections*).
- Dwibahasa ID/EN untuk seluruh *copy* utama.
- Tema gelap/terang dengan mode gelap sebagai default.
- Komponen visual interaktif: dropdown navigasi, drawer mobile, akordeon FAQ, grafik finansial (Recharts), *marquee* kapabilitas, kartu portofolio dengan *live iframe*, *counter* angka animasi.
- Formulir *client-side* dengan validasi HTML5 dan tampilan status sukses: (a) modal konsultasi, (b) booking briefing, (c) *whistleblowing*/pengadaan.

**Di luar scope KP (secara eksplisit):**

- **Backend, REST/GraphQL API, database** — project ini murni *static frontend*. Data konten adalah konstanta di dalam kode.
- **Pengiriman email/notifikasi nyata** — formulir hanya menampilkan status sukses di UI; tidak ada request jaringan keluar.
- **Autentikasi, otorisasi, panel admin/CMS** — konten diubah dengan mengedit kode.
- **Unduhan file PDF asli** — tombol *Report Center* hanya mengubah state (belum mengunduh berkas).
- **Analytics/pelacakan pengunjung, cookie consent.**
- Pengujian otomatis (unit/E2E) — pengujian dilakukan manual + verifikasi DOM programatik (lihat Bab 5).
- Deployment ke domain produksi milik perusahaan — saat ini berjalan sebagai generator Perchance (lihat Bab 4).

## 1.5 Batasan & Asumsi Teknis

- Aplikasi dijalankan di **browser** (`browser-only`); tidak ada proses server milik sendiri. Karena tidak bisa memakai *import map* di lingkungan target, **JSX wajib dikompilasi** ke satu file `bundle.js` memakai `esbuild-wasm`.
- Seluruh *dependency* pihak ketiga dimuat dari CDN **esm.sh** dengan versi *pinned*; halaman membutuhkan koneksi internet saat pertama kali dimuat.
- Versi React **wajib dipin di 18.3.1** pada setiap URL esm.sh; jika tidak, esm.sh menarik React 19 dan `react-dom@18` gagal (`useContext` pada `null`).
- Konten (metrik, studi kasus, angka statistik) saat ini adalah **data contoh untuk keperluan demo** dan harus divalidasi tim marketing/legal sebelum publikasi produksi.
- Font dimuat dari Google Fonts; ada *fallback* font sistem bila gagal.

## 1.6 Hasil Singkat

- 1 project, **16 file sumber** di `src/` (14 komponen di `src/components/` + `app.js` + `i18n.js`), bundle produksi **~95 KB**.
- 9 section fungsional dengan navigasi *anchor*: `#top`, `#portfolio`, `#pillars`, `#templates`, `#laporan`, `#studi`, `#paket`, `#faq`, `#quote`.
- Pengujian manual 17 skenario: **15 lulus**, **2 tidak lulus** (CTA hero tidak berfungsi; modal tidak menutup dengan tombol Escape) — detail dan perbaikannya ada di Bab 5 & 6.
- Detail hasil teknis lengkap: lihat Bab 3 (arsitektur) dan Bab 5 (pengujian).
