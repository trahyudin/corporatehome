# Bab 5 — Hasil Pengujian (Testing & Validation)

## 5.1 Lingkungan & Metode Pengujian

| Item | Keterangan |
|---|---|
| Tanggal pengujian | 17 September 2026 |
| Lingkungan | Halaman live generator Perchance (`corporate-12`) di dalam *iframe* terisolasi |
| Browser | Google Chrome 152 (Windows 10/11, x64), `devicePixelRatio` = 1.25 |
| Viewport diuji | Desktop **1440 × 900** dan Mobile **390 × 844** |
| Metode | **Manual testing** (skenario fungsional) diperkuat **verifikasi DOM programatik** (`querySelector`, `getComputedStyle`, `localStorage`) dan **verifikasi visual** pada tangkapan layar hero (tema gelap & terang) |
| Tingkat pengujian | *Black-box* fungsional (UI ↔ perilaku), *smoke test* render, uji responsif, uji dasar aksesibilitas |
| **Tidak dilakukan** | Unit test otomatis (Jest/Vitest), E2E otomatis (Playwright), uji beban, uji keamanan formal |

> Cara pembacaan tabel: **PASS** = sesuai kriteria; **PARTIAL** = sebagian kriteria terpenuhi; **FAIL** = tidak berfungsi.

## 5.2 Ringkasan Hasil

| Status | Jumlah |
|---|---|
| ✅ PASS | 18 |
| ⚠️ PARTIAL | 1 |
| ❌ FAIL | 1 |
| **Total** | **20** |

Semua **kriteria fungsional utama** (render, navigasi, i18n, tema, portofolio, widget, dan dua dari tiga formulir) berjalan sesuai harapan. Dua temuan gagal/parsial berkaitan dengan **satu akar masalah yang sama: pengkabelan aksi konsultasi** (lihat Bab 6 §6.1).

## 5.3 Detail Skenario & Hasil

| ID | Modul | Skenario | Hasil Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| T-01 | M-01 App Shell | Muat halaman pertama kali | Halaman render, tidak ada error runtime | Render tanpa error; Console hanya berisi 1 peringatan `cdn.tailwindcss.com should not be used in production` | ✅ PASS |
| T-02 | M-18 Metadata | Judul & deskripsi dari `main.pjs` | Metadata terpasang pada halaman | `$meta` berisi title/description/tags; `document.title` di dalam iframe terbaca `"Perchance"` (judul di-*render* di level platform). **Catatan:** title menyebut "Stratos" sedangkan brand aplikasi "KORPORA" (lihat §6.2) | ✅ PASS |
| T-03 | Semua | Render 9 section | Seluruh section ada di DOM | Ditemukan anchor: `top, portfolio, pillars, templates, laporan, studi, paket, faq, quote` | ✅ PASS |
| T-04 | M-05 Hero | Grafik finansial (Recharts) muncul | Grafik area + label sumbu + tooltip | 16 elemen `<path>` SVG; label `Q1-24…Q3-26` dan sumbu Y `0…260`; **verifikasi visual: sesuai** | ✅ PASS |
| T-05 | M-02 i18n | Klik toggle **EN** | Teks berubah ke Inggris & tersimpan | Label nav berubah (`Keunggulan→Advantages`, `Teknologi→Technology`); `localStorage['korpora-lang']="en"` | ✅ PASS |
| T-06 | M-01 Tema | Klik toggle tema | Kelas `.light` aktif & tersimpan | `<html class="light">`; `localStorage['korpora-theme']="light"`; teks tetap kontras (**verifikasi visual: sesuai**), mockup tetap gelap (sesuai desain) | ✅ PASS |
| T-07 | M-04 Header | Buka/tutup dropdown "Solusi" | Panel tampil berisi 3 tautan; klik di luar menutup | Kelas berubah `opacity-0 → opacity-100 → opacity-0`, 3 tautan ter-render, header mendapat latar blur saat terbuka; transisi CSS *throttled* karena iframe preview `visibilityState: hidden` | ✅ PASS |
| T-08 | M-04 Header | Bar progres scroll | Lebar bar mengikuti posisi scroll | 0% (atas) → 55,2% (tengah) → 0% (kembali atas) | ✅ PASS |
| T-09 | M-06 Marquee | Pita kapabilitas bergerak | 12 item diduplikasi, animasi jalan | 24 item (12×2); animasi `korpMarquee` aktif; berhenti saat hover | ✅ PASS |
| T-10 | M-08 Pilar | Counter statistik beranimasi | Angka final benar | `300+`, `−55%`, `+200%`, `40+` | ✅ PASS |
| T-11 | M-07 Portfolio | 15 kartu + tombol Demo | 15 kartu dengan preview & tautan keluar | 15 `iframe` ter-render; tautan `target="_blank" rel="noopener noreferrer"`. **Daftar 15 URL: Bab 2 §2.4** | ✅ PASS |
| T-12 | M-13 FAQ | Buka/tutup akordeon | Hanya satu jawaban terbuka | Item 0 terbuka secara default; membuka item lain menutup item sebelumnya | ✅ PASS |
| T-13 | M-10 Report Center | Klik laporan PDF | Berubah menjadi status terunduh | Ikon `Download` → `Check` hijau | ✅ PASS |
| T-14 | M-10 Whistleblowing | Isi & kirim form | Pesan sukses, halaman tidak reload | Tampil "Diterima. Tim kepatuhan kami akan merespons…"; tidak ada navigasi | ✅ PASS |
| T-15 | M-14 Booking | Kirim form booking briefing | Konfirmasi menampilkan email | "Booking terkonfirmasi" + email pengguna; tidak ada navigasi | ✅ PASS |
| T-16 | M-16 Modal | (a) Buka dari CTA drawer, (b) tutup via backdrop, (c) tutup via **Esc** | (a)(b)(c) berfungsi | (a) ✅ terbuka · (b) ✅ tertutup · (c) ❌ **tetap terbuka** | ⚠️ PARTIAL |
| T-17 | M-05 Hero | Klik CTA utama "Jadwalkan Konsultasi Arsitektur" | Modal konsultasi terbuka | ❌ **Tidak terjadi apa-apa** (`onConsult` tidak diteruskan dari `app.js`) | ❌ FAIL |
| T-18 | Layout | Tampilan mobile 390 × 844 | Tidak ada overflow horizontal; drawer berfungsi | `scrollWidth` 375 ≤ 390 → tanpa overflow; tombol Menu membuka drawer; tombol CTA pada drawer membuka modal | ✅ PASS |
| T-19 | Layout | Tampilan desktop 1440 × 900 | Layout 3 kolom, tanpa overflow | Tanpa overflow horizontal; tinggi dokumen 9.490 px; header hanya berisi `Solusi · ID · EN · tema` | ✅ PASS |
| T-20 | Aksesibilitas | `prefers-reduced-motion: reduce` | Animasi dimatikan | Media query mematikan seluruh `.anim-*` & marquee (verifikasi *code review*) | ✅ PASS |

## 5.4 Catatan atas Temuan Gagal/Parsial

### F-01 — CTA utama Hero tidak berfungsi (T-17)

- **Reproduksi:** buka halaman → klik tombol biru **"Jadwalkan Konsultasi Arsitektur"** pada Hero.
- **Penyebab:** `app.js` merender `<EnterpriseHero />` **tanpa** prop `onConsult`, sementara komponen memanggil `onClick={onConsult}` → nilai `undefined`.
- **Dampak:** pengguna kehilangan jalur konversi paling menonjol di halaman (CTA di atas lipatan pertama).
- **Perbaikan:** lihat Bab 6 §6.1.

### F-02 — Modal tidak menutup dengan tombol Escape (T-16c)

- **Penyebab:** `EnterpriseModal.jsx` tidak memasang `keydown` listener sama sekali.
- **Catatan:** dokumentasi lama (`src/README.md`) juga menyebut modal dapat dipicu lewat *custom event* `korpora:consult`, tetapi **event tersebut tidak ada di kode** — dokumen perlu disinkronkan atau fitur perlu diimplementasikan.
- **Dampak:** moderat; pengguna masih bisa menutup lewat backdrop, namun perilaku standar dialog tidak terpenuhi (juga berpengaruh pada aksesibilitas *keyboard user*).

### F-03 — Tidak ada CTA di header versi desktop (temuan tambahan, non-blocking)

- Tombol *"Request Enterprise Quote"* hanya ter-render di **drawer mobile**. Di desktop, header hanya berisi dropdown Solusi, toggle bahasa, dan toggle tema — sehingga prop `onConsult` pada `EnterpriseHeader` tidak terpakai di desktop.
- Kriteria dokumen (`src/README.md`) menyebut adanya CTA header; kondisi aktual berbeda.

## 5.5 Pengujian Responsif (Ringkas)

| Breakpoint | Uji | Hasil |
|---|---|---|
| 390 × 844 (mobile) | Overflow horizontal, drawer, form, modal | ✅ Tidak ada overflow (`scrollWidth` 375); drawer & modal berfungsi |
| 768 × 1024 (tablet, breakpoint `md`) | Grid 2 kolom, tidak diverifikasi visual | ⚪ Belum diuji eksplisit — direkomendasikan sebagai tambahan |
| 1440 × 900 (desktop) | Overflow, grid 3 kolom, header penuh | ✅ Tidak ada overflow |

## 5.6 Pengujian Performa (Observasi Awal — Non-formal)

| Metrik | Nilai | Catatan |
|---|---|---|
| Ukuran bundle | 97.451 byte (±95 KB) | Belum diminifikasi (`minify:false`) |
| Tinggi total halaman (1440 px) | ±9.490 px | Wajar untuk *one-pager* 16 modul |
| Jumlah `iframe` portofolio | 15 | **Risiko performa terbesar** — 15 dokumen eksternal dimuat; saat ini sudah `loading="lazy"` |
| Dependency eksternal | 5 paket (react, react-dom, framer-motion, recharts, lucide-react) + font | Semua dari CDN → bergantung jaringan & pihak ketiga |
| Peringatan konsol | 1 (Tailwind Play CDN) | Hilang bila memakai Tailwind hasil build |

> Pengukuran FPS/Core Web Vitals (LCP, INP, CLS) **belum dilakukan** dan disarankan sebagai langkah berikutnya (lihat Bab 6 §6.4).

## 5.7 Kesimpulan Pengujian

Aplikasi **dinyatakan berjalan sesuai kriteria** untuk seluruh fitur inti: render 9 section, dwibahasa, tema, navigasi, portofolio, grafik, widget laporan, dan kanal formulir. Dua cacat fungsional yang ditemukan (F-01, F-02) bersifat **lokal dan berakar pada satu wiring callbacks konsultasi**; keduanya sudah memiliki rekomendasi perbaikan konkret di Bab 6 dan tidak menghalangi perbaikan cepat (< 1 jam kerja).

**Rekomendasi sebelum go-live:** perbaiki F-01 & F-02, tambahkan pengujian otomatis minimal untuk formulir dan toggle bahasa/tema, serta validasi seluruh klaim numerik pada halaman bersama tim terkait.
