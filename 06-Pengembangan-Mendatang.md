# Bab 6 — Catatan Pengembangan Mendatang (Future Improvements / Known Bugs)

Bab ini ditujukan untuk **developer internal** yang akan melanjutkan project. Semua temuan disertai lokasi berkas dan rekomendasi perbaikan konkret.

## 6.1 Prioritas Tinggi — Bug Fungsional

### BUG-01 · CTA utama Hero tidak melakukan apa pun

- **Lokasi:** `src/app.js` (baris render `<EnterpriseHero />`) & `src/components/EnterpriseHero.jsx` (`onClick={onConsult}`).
- **Penyebab:** prop `onConsult` tidak diteruskan sehingga bernilai `undefined`.
- **Perbaikan (2 baris):**

```jsx
// src/app.js — di dalam <main>
<EnterpriseHero onConsult={openModal} />
```

- **Sekaligus disarankan** mengimplementasikan *event bus* yang selama ini hanya ada di dokumentasi, agar CTA di section mana pun bisa membuka modal tanpa *prop drilling*:

```jsx
// src/app.js — tambahkan efek berikut di dalam App()
useEffect(() => {
  const onConsultEvent = () => setModalOpen(true);
  window.addEventListener('korpora:consult', onConsultEvent);
  return () => window.removeEventListener('korpora:consult', onConsultEvent);
}, []);
```

### BUG-02 · Modal tidak menutup dengan tombol `Esc`

- **Lokasi:** `src/components/EnterpriseModal.jsx`.
- **Penyebab:** tidak ada listener `keydown`.
- **Perbaikan:** tambahkan `useEffect` **sebelum** baris `if (!open) return null;` (aturan *hooks*), sekaligus kunci scroll halaman:

```jsx
useEffect(() => {
  if (!open) return;
  const onKey = (e) => { if (e.key === 'Escape') onClose(); };
  document.addEventListener('keydown', onKey);
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = prevOverflow;
  };
}, [open, onClose]);
```

- **Peningkatan sekaligus:** tambahkan `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pada judul, **focus trap** (pindahkan fokus ke input lalu kembalikan ke elemen pemicu saat ditutup), dan tutup drawer mobile dengan `Esc`.

### BUG-03 · Header desktop tidak memiliki tombol CTA

- **Lokasi:** `src/components/EnterpriseHeader.jsx` — blok `hidden … lg:flex` hanya berisi `LangToggle`, badge SOC, dan toggle tema.
- **Perbaikan:** tambahkan `<Button variant="primary" size="sm" onClick={onConsult}>{T.quote}</Button>` di blok tersebut. Prop `onConsult` sudah tersedia dari `app.js`.

## 6.2 Prioritas Sedang — Bug Minor & Inkonsistensi

| ID | Temuan | Lokasi | Rekomendasi |
|---|---|---|---|
| BUG-04 | Brand **"Stratos"** di metadata ≠ brandaplikasi **"KORPORA"** | `main.pjs` | Selaraskan title/description; tetapkan satu nama brand |
| BUG-05 | `MotionReveal` & `Reveal` kini hanya *wrapper* statis — tidak ada animasi *scroll reveal*, padahal `src/README.md` menyebut framer-motion scroll reveal | `src/components/ui.jsx` | Pulihkan dengan `whileInView`/`useInView` + `initial/animate`, atau hapus animasi dari dokumen agar jujur |
| BUG-06 | Impor tidak terpakai: `motion` (ui.jsx), `ArrowRight` (ui.jsx), `AnimatePresence` (`EnterpriseHero.jsx`), `Calendar` (`EnterpriseModal.jsx`) | beberapa berkas | Hapus untuk mengecilkan bundle & menghindari kebingungan |
| BUG-07 | Objek string `t.name` ("Nama lengkap"/"Full name") didefinisikan tetapi **tidak ada field nama** di modal | `EnterpriseModal.jsx` | Tambahkan input nama, atau hapus string mati |
| BUG-08 | Tombol **Report Center** hanya mengubah state; **tidak ada berkas yang benar-benar terunduh**, sedangkan teks mengklaim "dibuat real-time dari data keuangan langsung" | `EnterpriseWidgets.jsx` | Sambungkan ke URL PDF nyata (`<a href download>`) atau tandai sebagai demo |
| BUG-09 | **Semua** tautan Footer mengarah ke `#top` (bukan halaman sebenarnya) | `Footer.jsx` | Arahkan ke section/halaman relevan, atau ubah menjadi teks non-tautan sampai halaman tersedia |
| BUG-10 | Tombol "Unduh Katalog Solusi Korporat" hanya *anchor* ke `#laporan` | `EnterpriseHero.jsx` | Ganti menjadi unduhan berkas sungguhan |
| BUG-11 | Pita `#59` — selektor `.text-cyan-300\/90` & duplikasi `.border-slate-800\/60` pada blok override tema terang | `index.html` | Rapikan (tidak menyebabkan bug, hanya pemeliharaan) |
| BUG-12 | Semua form bersifat *client-side*: tanpa validasi server, tanpa proteksi bot, tanpa pengiriman email | `EnterpriseCta`, `EnterpriseWidgets`, `EnterpriseModal` | Tambahkan backend + honeypot/CAPTCHA + *rate limit* (lihat §6.3) |
| BUG-13 | Tidak ada indikator *loading*/disabled saat submit, dan status sukses hilang begitu komponen *re-mount* | ketiga komponen form | Tambahkan state `submitting`, disable tombol, dan pesan error |
| BUG-14 | Akordeon & dropdown belum memakai `aria-expanded`/`aria-controls` | `EnterpriseFaq`, `EnterpriseHeader` | Lengkapi atribut ARIA agar ramah *screen reader* |
| BUG-15 | Angka statistik & metrik studi kasus adalah **data demo** ("300+ korporat", "−55% biaya", "±200% closing") | `BenefitPillars`, `CaseStudies`, `EnterpriseHero` | Validasi/dokumentasikan sumbernya sebelum publikasi — berisiko secara legal jika dianggap klaim faktual |

## 6.3 Fitur yang Belum Dikembangkan (Backlog)

Disusun berdasarkan prioritas dampak bisnis.

### P1 — Wajib sebelum dipakai sebagai kanal akuisisi nyata

| # | Fitur | Alasan | Estimasi |
|---|---|---|---|
| P1-1 | **Endpoint lead → email/CRM** (`POST /api/v1/leads/consultation`) | Tanpa ini, semua lead hilang — inti fungsi *sales page* | 2–3 hari |
| P1-2 | **Kanal whistleblowing yang benar-benar aman** (anonim, terenkripsi, bukti terima, akses terbatas) | Formulir kepatuhan tidak boleh *fake*; ada risiko reputasi/hukum | 3–5 hari |
| P1-3 | **Anti-bot & rate limiting** (honeypot + reCAPTCHA + throttle per IP) | Cegah spam pada form publik | 1 hari |
| P1-4 | **Unduhan PDF nyata** pada Report Center | Klaim transparansi harus riil | 1 hari |
| P1-5 | **Pengujian otomatis + CI** (Vitest + Testing Library; Playwright untuk alur form & toggle) | Mencegah regresi seperti BUG-01 | 3–5 hari |
| P1-6 | **Tailwind build produksi + minifikasi bundle + self-host font** | Menghapus peringatan konsol & mempercepat muat | 1 hari |

### P2 — Nilai bisnis tinggi

| # | Fitur | Alasan |
|---|---|---|
| P2-1 | **Headless CMS** (Contentful/Strapi) untuk konten portofolio, paket, FAQ | Halaman menjanjikan CMS; tim marketing perlu ubah konten tanpa developer |
| P2-2 | **Screenshot statis portofolio** menggantikan 15 `iframe` live (plus tombol "buka situs") | 15 iframe = beban jaringan/CLS besar & rawan blank |
| P2-3 | **Analytics + cookie consent** | Tanpa data, tidak bisa optimasi konversi; consent wajib untuk GDPR |
| P2-4 | **SEO lanjutan**: `og:image`, Twitter Card, JSON-LD `Organization`/`Service`, sitemap, `hreflang` ID/EN | Halaman B2B harus bisa ditemukan |
| P2-5 | **Integrasi penjadwalan** (Calendly/Google Calendar) untuk slot briefing | Slot saat ini hanya label statis |
| P2-6 | **PWA ringan** (manifest + service worker untuk aset inti) | Muat ulang lebih cepat, kesan premium |

### P3 — Pengembangan lanjutan

| # | Fitur |
|---|---|
| P3-1 | **Kalkulator ROI interaktif** (pengunjung memperkirakan penghematan biaya maintenance) sebagai *lead magnet* |
| P3-2 | **Template configurator** — pratinjau langsung template yang berganti warna/logo sesuai brand calon klien |
| P3-3 | **Halaman detail per layanan & per studi kasus** (multi-page) |
| P3-4 | **Gated content** (laporan/whitepaper) dengan *progressive profiling* |
| P3-5 | **Chat/WhatsApp** untuk kontak langsung |
| P3-6 | **A/B testing** headline & CTA |
| P3-7 | **RTL & ekspansi bahasa** (Arab/Mandarin) sesuai klaim multi-bahasa |
| P3-8 | **Konsol admin internal** untuk melihat lead & audit pengiriman |

## 6.4 Perbaikan Teknis & Arsitektur Lanjutan

1. **i18n terpusat** — pindahkan seluruh string ke berkas kamus (`locales/id.json`, `locales/en.json`) + library i18n; saat ini string tersebar sebagai peta objek di 13 komponen (sulit dipelihara, rawan tidak konsisten).
2. **Migrasi ke tooling standar** — pindah dari Tailwind Play CDN + esbuild manual ke **Vite** (atau Next.js bila ingin SSR/SEO dan multi-page), agar HMR, optimasi, dan build produksi menjadi standar.
3. **Sumber tunggal konten** — keluarkan `SITES`, `PILLARS`, `FAQ_BASE`, dll. ke `content/*.json` agar mudah diganti tanpa menyentuh kode.
4. **Aksesibilitas menuju WCAG 2.1 AA** — audit menyeluruh: *focus visible*, urutan tab, `skip to content`, kontras (terutama tombol `outline` dan `Kicker` di tema terang yang kontrasnya rendah), `aria-*` pada komponen interaktif, uji dengan *screen reader*.
5. **Performa** — ukur LCP/INP/CLS, *preconnect* ke `esm.sh`, `loading="lazy"` (sudah ada) + *placeholder* pada preview, pertimbangkan **self-host dependency** untuk menghilangkan risiko TLS pihak ketiga.
6. **Keamanan** — CSP, `Referrer-Policy`, `X-Content-Type-Options`, dan jangan pernah menaruh kredensial di bundle frontend (lihat Bab 4 §4.5).
7. **Pemantauan** — error monitoring (mis. Sentry) + uptime check + pencatatan submit form.
8. **Deteksi preferensi sistem** — hormati `prefers-color-scheme` sebagai nilai awal tema (saat ini default selalu gelap).
9. **Penyimpanan state form** — pertahankan isian form di `localStorage` agar pengunjung tidak kehilangan data saat tidak sengaja *refresh*.
10. **Standar kode** — ESLint + Prettier, konvensi *Conventional Commits*, dan `README` per-modul.

## 6.5 Catatan Serah Terima (Handoff) untuk Developer Berikutnya

**Hal terpenting yang harus diketahui:**

1. **`src/bundle.js` adalah artefak build — JANGAN diedit manual.** Semua perubahan wajib di `src/*.jsx`, lalu bundle **dibangun ulang** (lihat Bab 4 §4.3). Jika perubahan JSX "tidak muncul", hampir pasti karena lupa rebuild.
2. **Versi React wajib dipin `18.3.1`** pada setiap URL `esm.sh`. Jika diubah, aplikasi akan *blank* dengan error `useContext` pada `null`.
3. **Konten teks ada di dalam komponen**, bukan di CMS. Setiap string dwibahasa muncul sebagai pasangan `id`/`en`.
4. **Gaya visual** dikendalikan oleh `tailwind.config` + blok *override* tema terang di `index.html`; kelas `.dark-window` sengaja "mengunci" mockup tetap gelap meski tema terang.
5. **Akar masalah dua bug utama (BUG-01 & BUG-02) adalah wiring aksi konsultasi + tidak adanya listener keyboard** — perbaikannya kecil dan berdampak besar; kerjakan lebih dulu.
6. **Semua angka pemasaran bersifat contoh** — jangan dipublikasikan sebagai klaim faktual tanpa validasi.
7. Jalankan `page_refresh`/hard reload setelah perubahan, dan **periksa Console**: aplikasi seharusnya hanya memunculkan 1 peringatan (Tailwind Play CDN) saat ini.
