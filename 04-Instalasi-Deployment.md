# Bab 4 — Panduan Instalasi & Deployment (Setup Guide)

## 4.1 Prasyarat Sistem (Prerequisites)

| Kebutuhan | Versi minimum | Diperlukan untuk |
|---|---|---|
| **Node.js** | ≥ 18 (LTS disarankan) | Build `bundle.js` & menjalankan server lokal di luar Perchance |
| **npm** | ≥ 9 | Memasang `esbuild` dan `serve` |
| **Browser modern** | Chrome/Edge/Firefox/Safari versi 2 tahun terakhir | Menjalankan aplikasi (ESM + `localStorage`) |
| Koneksi internet | — | Mengambil React/Framer Motion/Recharts/lucide-react dari **esm.sh** dan font dari Google Fonts |
| Editor kode | — | VS Code + ekstensi ESLint/Prettier (disarankan) |
| **Opsional**: MySQL / PHP / Python | — | **Tidak diperlukan** — project ini tidak punya backend/database |

> Untuk menjalankan di **Perchance** (cara termudah, tanpa install apa pun) cukup browser. Node.js hanya dibutuhkan bila project di-*export* menjadi repo mandiri.

## 4.2 Menjalankan di Lingkungan Lokal (Development)

### Opsi A — Langsung di Perchance (cara yang dipakai saat KP)

1. Buka editor generator di `https://perchance.org/<nama-generator>#edit`.
2. Sunting `main.pjs`, `index.html`, atau berkas di `src/`. Preview di panel kanan akan diperbarui (kode dijalankan di *iframe* terisolasi).
3. Simpan (Save) untuk mempublikasikan versi terbaru.
4. **Penting:** bila mengubah `src/*.jsx`, jalankan ulang langkah build di §4.3, karena yang dimuat `index.html` adalah `src/bundle.js`.

### Opsi B — Repo Mandiri di Komputer Lokal

Karena `src/bundle.js` sudah jadi dan seluruh dependency bersifat *runtime-CDN*, project bisa dijalankan dengan **static server biasa**.

**1. Siapkan struktur repo hasil ekspor:**

```
korpora-landing/
├── index.html
├── main.pjs                  # opsional (metadata khusus Perchance)
├── package.json
├── scripts/build.mjs
├── .env.example
└── src/
    ├── app.js
    ├── i18n.js
    ├── bundle.js
    ├── favicon.svg
    ├── README.md
    └── components/*.jsx
```

**2. `package.json` minimal:**

```json
{
  "name": "korpora-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "serve -l 5173 .",
    "build": "node scripts/build.mjs",
    "build:css": "tailwindcss -i ./src/tailwind.css -o ./src/tailwind.build.css --minify"
  },
  "devDependencies": {
    "esbuild": "^0.21.5",
    "serve": "^14.2.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**3. Install & jalankan:**

```bash
npm install
npm run build          # kompilasi JSX -> src/bundle.js
npm run dev            # http://localhost:5173
```

**4. Verifikasi:** buka `http://localhost:5173`, pastikan header, hero (dengan grafik), dan footer tampil, serta Console bersih (hanya peringatan Tailwind Play CDN).

> Catatan: jika memakai `file://` langsung (tanpa server), impor ESM dari CDN masih berjalan, tetapi beberapa browser memblokir modul pada origin `file://`. **Selalu gunakan server.**

## 4.3 Build Bundle (Wajib setelah mengubah `.jsx`)

Berkas `src/bundle.js` adalah **artefak**. Sumber kebenarannya ada di `src/*.jsx` dan `src/*.js`.

**`scripts/build.mjs`:**

```js
import * as esbuild from 'esbuild';

// Versi dependency WAJIB dipin. React harus 18.3.1 di SEMUA entri.
const CDN = {
  'react': 'https://esm.sh/react@18.3.1',
  'react-dom/client': 'https://esm.sh/react-dom@18.3.1/client',
  'react/jsx-runtime': 'https://esm.sh/react@18.3.1/jsx-runtime',
  'framer-motion': 'https://esm.sh/framer-motion@11.18.2?deps=react@18.3.1,react-is@18.3.1',
  'recharts': 'https://esm.sh/recharts@2?deps=react@18.3.1,react-is@18.3.1',
  'lucide-react': 'https://esm.sh/lucide-react@0.469.0?deps=react@18.3.1',
};

// Petakan impor bare -> URL esm.sh, lalu tandai external (tidak ikut di-bundle).
const cdnExternals = {
  name: 'cdn-externals',
  setup(build) {
    build.onResolve({ filter: /^[^./]/ }, (args) => {
      const url = CDN[args.path];
      return url ? { path: url, external: true } : null;
    });
  },
};

await esbuild.build({
  entryPoints: ['src/app.js'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  outfile: 'src/bundle.js',
  platform: 'browser',
  target: ['es2020'],
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
  plugins: [cdnExternals],
  minify: false,
  sourcemap: false,
  logLevel: 'info',
});
```

Jalankan:

```bash
node scripts/build.mjs      # atau: npm run build
```

Bila berhasil, `src/bundle.js` diperbarui dan akan berbunyi seperti:

```js
import ... from "https://esm.sh/react@18.3.1";
import ... from "https://esm.sh/lucide-react@0.469.0?deps=react@18.3.1";
```

## 4.4 Deployment ke Server Produksi

### Opsi A — Perchance (kondisi saat ini)

1. Pastikan semua perubahan sudah diterapkan dan preview bersih.
2. Tekan **Save** di editor.
3. Halaman publik: `https://perchance.org/<nama-generator>` (di dalamnya berjalan di `https://<generatorPublicId>.perchance.org/<nama-generator>`).
4. Ganti nama generator hanya melalui tombol pengaturan; **mengganti nama mengubah origin**, sehingga `localStorage`/data lama tidak terbaca lagi.

### Opsi B — Static Hosting (Vercel / Netlify / Cloudflare Pages / GitHub Pages)

1. `npm run build` untuk memperbarui `src/bundle.js`.
2. Deploy folder root (berisi `index.html` + `src/`) dengan preset **"Other"/"Static"** dan *output directory* `.`:
   ```bash
   npx vercel deploy --prod      # Vercel
   # atau drag-and-drop folder ke Netlify / Cloudflare Pages
   ```
3. Tidak ada *build command* yang wajib dijalankan platform (kecuali Anda memindahkan build ke CI): bila ya, set *build command* = `npm run build`, *output* = `.`.

### Opsi C — Server Sendiri (Nginx)

```nginx
server {
  listen 80;
  server_name korpora.example.co.id;
  root /var/www/korpora-landing;

  gzip on;
  gzip_types text/css application/javascript image/svg+xml;

  location ~* \.(js|css|svg|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }

  location / { try_files $uri /index.html; }
}
```

Wajib pakai **HTTPS** (Let's Encrypt) bila ada formulir apa pun.

### Sebelum Naik Produksi — Checklist

- [ ] Ganti Tailwind Play CDN dengan **Tailwind CLI/PostCSS** (`npm run build:css`) untuk menghapus peringatan produksi & mengecilkan payload.
- [ ] Aktifkan minifikasi bundle (`minify: true`).
- [ ] Self-host font (Google Fonts) untuk privasi & performa.
- [ ] Tambahkan `og:image`, `twitter:card`, dan JSON-LD (SEO).
- [ ] Pasang CSP, `Referrer-Policy`, `X-Content-Type-Options`.
- [ ] Validasi angka/klaim (mis. "−55% biaya maintenance") bersama tim legal/marketing — angka saat ini adalah **data demo**.

## 4.5 Konfigurasi Variabel Lingkungan (`.env`)

**Status saat ini: project TIDAK memerlukan variabel lingkungan apa pun.** Seluruh konfigurasi (warna, font, daftar portofolio, endpoint imajiner) berada langsung di dalam kode, dan aplikasi tidak melakukan request ke backend.

Karena itu, berkas `.env` di bawah ini adalah **kerangka untuk fase integrasi backend berikutnya** — *belum dibaca oleh kode*:

```dotenv
# =========================================================
# .env.example  —  KORPORA WEB ATELIER
# SEMUA VARIABEL OPSIONAL. Belum dipakai oleh kode saat ini.
# JANGAN pernah menaruh kredensial rahasia di berkas ini:
# apa pun yang berawalan VITE_ akan TERTANAM di bundle publik.
# =========================================================

# --- Umum ---
APP_ENV=development                  # development | staging | production
APP_BASE_URL=http://localhost:5173   # origin publik website

# --- Integrasi Lead / CRM (fase berikutnya) ---
VITE_API_BASE_URL=https://api.example.co.id
VITE_LEAD_ENDPOINT=/api/v1/leads/consultation
VITE_INQUIRY_ENDPOINT=/api/v1/inquiries

# --- Report Center (fase berikutnya) ---
VITE_REPORT_CENTER_BASE_URL=https://cdn.example.co.id/reports

# --- Analytics & anti-bot (opsional) ---
VITE_ANALYTICS_ID=
VITE_RECAPTCHA_SITE_KEY=              # hANYA site key (publik). Secret key HARUS di server.

# --- Nilai yang HANYA boleh ada di server (JANGAN di bundle frontend) ---
# SMTP_URL=
# CRM_API_KEY=
# RECAPTCHA_SECRET_KEY=
# DATABASE_URL=
```

**Aturan penamaan & keamanan:**

| Aturan | Penjelasan |
|---|---|
| Prefix `VITE_` | Hanya variabel ber-prefix ini yang di-*inject* ke bundle (konvensi Vite). |
| Tanpa rahasia di frontend | API key, token, SMTP, kredensial DB **wajib** disimpan di server/secret manager. |
| Build-time | Untuk static hosting, nilai `VITE_*` **dibekukan saat build**; mengubahnya perlu build ulang. |
| Jangan commit | Tambahkan `.env`, `.env.local` ke `.gitignore`; commit hanya `.env.example`. |

## 4.6 Troubleshooting

| Gejala | Penyebab | Solusi |
|---|---|---|
| Halaman **blank**, error `Cannot read properties of null (reading 'useContext')` | esm.sh menarik React **19** untuk salah satu paket | Pastikan **semua** URL memakai `?deps=react@18.3.1,react-is@18.3.1` untuk paket React-ekosistem, dan `react`/`react-dom` dipin `18.3.1` |
| Perubahan `.jsx` tidak muncul | `bundle.js` belum dibangun ulang | Jalankan `node scripts/build.mjs` (§4.3), lalu muat ulang halaman |
| Peringatan `cdn.tailwindcss.com should not be used in production` | Tailwind Play CDN | Normal saat dev; ganti dengan Tailwind CLI untuk produksi |
| Kelas Tailwind tidak berefek | Kelas dinamis dibangun dari string yang tidak terdeteksi JIT | Tulis kelas secara literal, atau tambahkan ke `theme.extend` di `tailwind.config` |
| Grafik hero kosong | Recharts gagal dimuat / kontainer tanpa tinggi | Beri tinggi eksplisit pada kontainer (`h-44` sudah ada); periksa koneksi ke esm.sh |
| Preview portofolio kosong | Situs pihak ketiga memblokir `iframe` (`X-Frame-Options`/CSP) atau sedang *down* | Ganti `iframe` live dengan *screenshot* statis (lihat Bab 6) |
| `localStorage` error saat mode privat | Storage diblokir | Sudah ditangani `try/catch` → default dipakai; tidak perlu tindakan |
| Halaman di-*subpath* | Path `src/bundle.js` relatif | Pastikan `index.html` dan `src/` berada pada level yang sama |
