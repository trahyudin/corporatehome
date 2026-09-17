# Bab 2 — Daftar Project & Modul

## 2.1 Inventarisasi Project

Selama masa KP, **satu project** digarap:

| # | Project | Deskripsi | Teknologi Utama | Status |
|---|---------|-----------|-----------------|--------|
| P-1 | **Korpora Web Atelier — Landing Page Solusi Website Enterprise** | SPA satu halaman sebagai *digital sales room* untuk menjual jasa arsitektur/pengembangan website ke korporasi, konglomerasi, dan holding group. Mencakup presentasi nilai (pilar, level solusi, case study, FAQ), portofolio live, pusat laporan, dan tiga jalur *lead capture*. | React 18, Tailwind CSS, Framer Motion, Recharts, lucide-react, esbuild-wasm | Selesai (frontend) |

**Struktur berkas project:**

```
main.pjs                  # metadata SEO generator (title/description/tags)
index.html                # shell: font, Tailwind Play CDN, tema, animasi, #root
src/
  app.js                  # entry point aplikasi (App shell)
  i18n.js                 # konteks bahasa ID/EN
  bundle.js               # HASIL BUILD (artefak, jangan diedit manual)
  favicon.svg             # ikon generator
  components/             # 14 komponen UI (lihat 2.2)
  README.md               # catatan arsitektur untuk developer
```

**Ukuran:** ±87 KB kode sumber (JS/JSX) → **bundle produksi ±95 KB** (`src/bundle.js` = 97.451 byte, sudah termasuk dep eksternal tidak ikut ter-bundle).

## 2.2 Daftar Modul / Sub-Fitur

### A. Modul Infrastruktur Aplikasi

| # | Modul | Berkas | Ukuran | Fungsi Utama |
|---|-------|--------|--------|--------------|
| M-01 | **App Shell** | `src/app.js` | 2,3 KB | Membuat root React, memegang state global **tema** (`korpora-theme`) dan **modal konsultasi**, menyusun urutan seluruh section, membungkus aplikasi dengan `LangProvider`. |
| M-02 | **i18n Provider** | `src/i18n.js` | 0,7 KB | `LangProvider` + hook `useLang()`. Menyimpan bahasa aktif (`id`\|`en`) ke `localStorage['korpora-lang']`, default `id`. |
| M-03 | **UI Primitives** | `src/components/ui.jsx` | 4,9 KB | Kumpulan komponen dasar yang dipakai ulang: `MotionReveal`, `Reveal`, `AnimatedNumber` (counter angka), `Button` (6 varian), `Badge`, `Kicker`, `SectionHeading`, `GlassCard`. |

### B. Modul Section Halaman (urut tampil)

| # | Modul | Berkas | Anchor | Fungsi Utama |
|---|-------|--------|--------|--------------|
| M-04 | **Header & Navigasi** | `EnterpriseHeader.jsx` | — | Header *fixed*: logo `KORPORA`, dropdown **Solusi** (3 entri), toggle bahasa ID/EN, toggle tema, badge SOC2/GDPR, tombol CTA (versi drawer), **bar progres scroll**, drawer mobile < `lg`. Mengekspor `Logo` untuk dipakai Footer. |
| M-05 | **Hero** | `EnterpriseHero.jsx` | `#top` | Positioning line, badge, headline gradien, 2 CTA, 3 *trust checkmark*, dan **mockup "browser window"** berisi `FinancialPreview` (grafik area **Recharts**) + 3 kartu KPI + tombol unduh laporan. |
| M-06 | **Capability Marquee** | `CapabilityMarquee.jsx` | — | Pita berjalan 12 kapabilitas enterprise (CSS *marquee*, pause saat hover). |
| M-07 | **Portfolio** | `Portfolio.jsx` | `#portfolio` | 15 kartu website klien dengan **pratinjau `iframe` live** (di-*scale* 0.34), badge "Live", tag stack, dan tombol **Demo** yang membuka situs di tab baru. **Daftar lengkap 15 URL demo: §2.4.** |
| M-08 | **Pilar Enterprise** | `BenefitPillars.jsx` | `#pillars` | Strip 4 statistik dengan **counter animasi** + 4 pilar nilai: GCG, B2B/Investor, Visibilitas & aksesibilitas, Produktivitas & multi-brand. |
| M-09 | **Showcase Level Solusi** | `CorporateShowcase.jsx` | `#templates` | 3 level kompleksitas organisasi (L1 B2B Industrial / L2 Holding multi-subsidiary / L3 Publik Tbk & ESG) dengan mockup mini, fokus, dan stack. |
| M-10 | **Widget Interaktif** | `EnterpriseWidgets.jsx` | `#laporan` | Dua widget: **Report Center** (4 laporan PDF dengan state unduh) dan form **Whistleblowing & Pengadaan** (nama, email, pesan) dengan status sukses. |
| M-11 | **Mini Case Studies** | `CaseStudies.jsx` | `#studi` | 2 kartu studi kasus format **Tantangan → Solusi → Hasil** dengan metrik utama (−55% biaya maintenance; +200% closing B2B). |
| M-12 | **Scope & Paket** | `ScopePaket.jsx` | `#paket` | 4 fase implementasi + 3 add-on opsional (integrasi ERP/CRM, server dedicated, SLA maintenance). |
| M-13 | **FAQ Korporat** | `EnterpriseFaq.jsx` | `#faq` | Akordeon 3 pertanyaan kepercayaan (NDA, kepemilikan source code, multi-bahasa & audit) — mode *single-open*, animasi `AnimatePresence`. |
| M-14 | **CTA & Booking** | `EnterpriseCta.jsx` | `#quote` | Banner gradien dengan form booking briefing (nama + email), daftar slot waktu, dan badge kepatuhan SOC 2 / ISO 27001 / GDPR / WCAG AA. |
| M-15 | **Footer** | `Footer.jsx` | — | Footer 6 kolom: profil studio + 3 kolom tautan (Solusi/Teknologi/Perusahaan), kontak, dan hak cipta bertahun dinamis. |
| M-16 | **Modal Konsultasi** | `EnterpriseModal.jsx` | — | Modal *overlay* untuk meminta konsultasi (input email), menutup via backdrop; menampilkan status sukses. |

### C. Modul Build & Aset

| # | Modul | Berkas | Fungsi |
|---|-------|--------|--------|
| M-17 | **Shell HTML & Konfigurasi Tema** | `index.html` | Memuat Google Fonts + Tailwind Play CDN, mendefinisikan `tailwind.config` (warna `obsidian`, `electric`, `corporate`; font `Syne`/`Space Grotesk`/`Inter`/`JetBrains Mono`; keyframes), ~30 animasi CSS, dan seluruh *override* CSS tema terang (`.light`, `.dark-window`). |
| M-18 | **Metadata SEO** | `main.pjs` | `$meta` generator: title, description, tags. |
| M-19 | **Build Pipeline** | `src/bundle.js` | Artefak hasil kompilasi JSX→ESM memakai `esbuild-wasm`; `index.html` memuatnya sebagai `<script type="module">`. **Tidak diedit manual** — sumbernya ada di `src/*.jsx`. |

## 2.3 Fitur Silang-Modul (Cross-cutting Features)

| Fitur | Implementasi | Dampak |
|---|---|---|
| **Dwibahasa ID/EN** | `useLang()` + peta string per komponen; toggle di header; persisten di `localStorage` | Seluruh *copy* utama punya versi ID & EN; bahasa ID jadi default |
| **Tema terang/gelap** | class `.light` pada `<html>` + blok CSS *override* besar di `index.html`; mockup tetap gelap lewat `.dark-window` | Nyaman dibaca di ruangan terang; mockup tetap tampil "seperti screenshot" |
| **Animasi** | CSS keyframes (`korpFloat`, `korpMarquee`, …), `AnimatedNumber`, `AnimatePresence` untuk FAQ | Kesan premium; dihormati `prefers-reduced-motion` |
| **Responsif** | Tailwind *mobile-first*, breakpoint `lg` untuk drawer | Tanpa *overflow* horizontal pada 390 px maupun 1440 px |
| **Aksesibilitas dasar** | `aria-label` pada tombol ikon, `aria-hidden` untuk elemen dekoratif, kontras diuji manual | Fondasi menuju WCAG 2.1 AA |


## 2.4 Daftar Link Website Portofolio (Preview & Demo Live)

Modul **M-07 Portfolio** (`src/components/Portfolio.jsx`) menampilkan **15 website** hasil arsitektur studio dalam bentuk kartu. Setiap kartu menyimpan **satu URL live** yang dipakai dua kali sekaligus:

- sebagai **sumber `iframe` pratinjau** (`src={url}`, di-*scale* `0.34`, `loading="lazy"`, `pointerEvents: none`) sehingga pengunjung melihat tampilan situs asli tanpa harus membukanya, dan
- sebagai **target tombol "Demo"** (serta *overlay* kartu) yang membuka situs di tab baru dengan `target="_blank" rel="noopener noreferrer"`.

Seluruh tautan tertanam pada konstanta `SITES`, dan berikut **daftar lengkap 15 URL demo** yang saat ini aktif:

| # | Nama Situs | Kategori / Tag | URL Demo (Live) | Stack |
|---|-----------|----------------|-----------------|-------|
| 1 | **Aetheria** | Creative Tech Studio | https://aetheria-lac.vercel.app/ | React, Next.js, AI/ML, i18n |
| 2 | **Aetheris** | Corporate Creative Tech | https://comporate-oo1m.vercel.app/ | React 18, Framer Motion, Recharts |
| 3 | **Aetheris Quantum** | Quantum & Autonomous | https://komtrorate.vercel.app/ | Next.js, 3D / WebGL, Real-time |
| 4 | **Valence** | Intelligent Systems | https://corrcoorr.vercel.app/ | React, Spatial UI, AI |
| 5 | **Valence Dynamics** | Deep Tech / R&D | https://porrtat.vercel.app/ | Next.js, Data Viz, Security |
| 6 | **Nexaris Global** | Autonomous Systems | https://corrp1.vercel.app/ | React 18, Edge, i18n |
| 7 | **Kyron** | Digital Flagship | https://corrpp2.vercel.app/ | React 18, Framer Motion, SEO |
| 8 | **Synova Global** | Strategic Transformation | https://corrpp3.vercel.app/ | Next.js, Headless CMS, Analytics |
| 9 | **Aethis Global** | Applied Tech | https://croopp4.vercel.app/ | React, Dashboards, Cloud |
| 10 | **Aetheron Dynamics** | Digital HQ | https://croopp5.vercel.app/ | Next.js, 3D / WebGL, Edge |
| 11 | **Kordex** | Digital Architecture | https://croopp6.vercel.app/ | React 18, Spatial UI, Cloud |
| 12 | **Aetheron Command** | Command Center | https://corrp7.vercel.app/ | Recharts, Real-time, Security |
| 13 | **Valence Kinetic** | Kinetic Computing | https://croopp8.vercel.app/ | React, Animations, AI |
| 14 | **Aetheris Enterprise** | Enterprise Systems | https://croopp9.vercel.app/ | React 18, Framer Motion, SEO |
| 15 | **Aetheris Labs** | Future Lab / R&D | https://croopp10.vercel.app/ | Next.js, Data Viz, i18n |

| Ringkasan | Nilai |
|---|---|
| Jumlah tautan | **15** (semuanya berupa URL `https` aktif) |
| Domain | `*.vercel.app` (15/15) |
| Pola tautan | Semua kartu memakai *link* yang sama untuk `iframe` pratinjau **dan** tombol **Demo** |
| Sumber data | Array `SITES` di `src/components/Portfolio.jsx` (lihat Bab 3 §3.4 untuk skema `SITES`) |
| Deskripsi kartu | `descId` (Indonesia) & `descEn` (Inggris) per situs — mengikuti *toggle* bahasa |

> **Cara mengganti / menambah link:** ubah nilai `url` (atau tambahkan objek baru) pada array `SITES`, lalu **build ulang** `src/bundle.js` (lihat Bab 4). Pratinjau `iframe` dan tombol **Demo** otomatis mengikuti, dan tabel di atas perlu diperbarui manual agar dokumen tetap sinkron dengan kode.
>
> **Catatan pengujian:** 15 `iframe` ini adalah beban jaringan terbesar pada halaman dan bergantung pada situs pihak ketiga (bisa kosong jika `X-Frame-Options`/CSP memblokir). Lihat Bab 5 (T-11) dan Bab 6 (§6.2, P2-2).
