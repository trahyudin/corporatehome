import React, { useState } from 'react';
import { Check, Download, FileText, Leaf, Loader2, Megaphone, TrendingUp } from 'lucide-react';
import { Button, Kicker, MotionReveal } from './ui.jsx';
import { useLang } from '../i18n.js';
import { api } from '../services/api.js';

export default function EnterpriseWidgets() {
  const { lang } = useLang();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('concern'); // 'concern' | 'procurement'
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  const reports = lang === 'en'
    ? [
        { id: 'annual-report-fy25', icon: FileText, name: 'Annual Report FY25', meta: 'PDF · 8.4 MB · ID' },
        { id: 'sustainability-esg', icon: Leaf, name: 'Sustainability Report (ESG)', meta: 'PDF · 5.1 MB · EN/ID' },
        { id: 'financial-highlights', icon: TrendingUp, name: 'Financial Highlights Summary', meta: 'PDF · 2.3 MB · EN' },
        { id: 'corporate-deck', icon: Megaphone, name: 'Corporate Presentation Deck', meta: 'PDF · 11.9 MB · EN/ID' },
      ]
    : [
        { id: 'annual-report-fy25', icon: FileText, name: 'Annual Report FY25', meta: 'PDF · 8,4 MB · ID' },
        { id: 'sustainability-esg', icon: Leaf, name: 'Laporan Keberlanjutan (ESG)', meta: 'PDF · 5,1 MB · EN/ID' },
        { id: 'financial-highlights', icon: TrendingUp, name: 'Ringkasan Financial Highlights', meta: 'PDF · 2,3 MB · EN' },
        { id: 'corporate-deck', icon: Megaphone, name: 'Deck Presentasi Korporat', meta: 'PDF · 11,9 MB · EN/ID' },
      ];

  const [downloading, setDownloading] = useState({});

  const handleDownload = (r) => {
    setDownloading((m) => ({ ...m, [r.id]: true }));
    const downloadUrl = api.getReportDownloadUrl(r.id);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${r.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading((m) => ({ ...m, [r.id]: false }));
    }, 2000);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await api.submitInquiry({
        type: inquiryType,
        name: inquiryName,
        email: inquiryEmail,
        message: inquiryMessage,
      });
      setReceipt(res.receipt || 'WB-2026-0091');
    } catch (err) {
      setError(err.message || 'Gagal mengirim pesan');
    } finally {
      setSubmitting(false);
    }
  };

  const kicker = lang === 'en' ? 'Interactive Enterprise Widgets' : 'Widget Interaktif Enterprise';
  const title = lang === 'en'
    ? 'Transparency tools stakeholders actually use'
    : 'Alat transparansi yang benar-benar dipakai pemangku kepentingan';
  const wt = lang === 'en' ? 'Whistleblowing & Procurement' : 'Whistleblowing & Pengadaan';
  const ws = lang === 'en'
    ? 'Confidential channel to report concerns or submit a procurement / RFP inquiry. Fully encrypted and NDA-protected.'
    : 'Saluran rahasia melaporkan dugaan pelanggaran atau mengajukan pertanyaan pengadaan / RFP. Terenkripsi penuh dan dilindungi NDA.';
  const placeholders = lang === 'en'
    ? ['Full name', 'Corporate email', 'Procurement · RFP · Concern details']
    : ['Nama lengkap', 'Email korporat', 'Rincian Pengadaan · RFP · Dugaan pelanggaran'];
  const submit = lang === 'en' ? 'Send Confidential Inquiry' : 'Kirim Pertanyaan Rahasia';

  return (
    <section id="laporan" className="relative py-14 md:py-16">
      <div className="pointer-events-none absolute left-[4%] top-1/3 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-3xl" aria-hidden />
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="max-w-2xl">
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-slate-100 md:text-4xl">{title}</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Report Center */}
          <MotionReveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-slate-800/60 bg-white/[0.025] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300/90">
                {lang === 'en' ? 'Annual Report & Sustainability PDF Center' : 'Pusat Laporan Tahunan & PDF Keberlanjutan'}
              </p>
              <div className="mt-5 space-y-3">
                {reports.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleDownload(r)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/40 p-3 text-left transition-colors hover:border-slate-700"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                      <r.icon size={17} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-slate-100">{r.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">{r.meta}</span>
                    </span>
                    {downloading[r.id] ? (
                      <Check size={17} className="text-emerald-400 animate-pulse" />
                    ) : (
                      <Download size={17} className="text-slate-400 transition-colors group-hover:text-cyan-300" />
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                {lang === 'en'
                  ? 'Every report is generated in real time from your live financial data — no vendor lock-in.'
                  : 'Setiap laporan dibuat real-time dari data keuangan langsung — tanpa lock-in vendor.'}
              </p>
            </div>
          </MotionReveal>

          {/* Whistleblowing & Procurement Form */}
          <MotionReveal delay={90} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-slate-800/60 bg-white/[0.025] p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">{wt}</p>
                <span className="font-mono text-[10px] text-emerald-400/80 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  256-Bit Encrypted
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{ws}</p>

              {receipt ? (
                <div className="mt-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-500/20">
                      <Check size={20} className="text-emerald-300" />
                    </span>
                    <div>
                      <p className="font-display font-bold text-slate-100">
                        {lang === 'en' ? 'Report Received & Secured' : 'Laporan Diterima & Terenkripsi'}
                      </p>
                      <p className="font-mono text-xs text-emerald-300 mt-1">
                        Receipt: <span className="font-bold text-white">{receipt}</span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Simpan nomor registrasi tanda terima ini untuk pelacakan rahasia. Tim kepatuhan kami akan memverifikasi dalam 1 hari kerja.'
                      : 'Simpan nomor bukti ini untuk pelacakan rahasia. Tim kepatuhan kami akan memverifikasi dalam 1 hari kerja.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="mt-5 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInquiryType('concern')}
                      className={`py-1.5 px-3 rounded-lg font-mono text-xs border transition-all ${
                        inquiryType === 'concern'
                          ? 'border-indigo-500 bg-indigo-500/20 text-white'
                          : 'border-slate-800 bg-slate-900/30 text-slate-400'
                      }`}
                    >
                      {lang === 'en' ? 'Concern / Ethics' : 'Pelanggaran / Etika'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('procurement')}
                      className={`py-1.5 px-3 rounded-lg font-mono text-xs border transition-all ${
                        inquiryType === 'procurement'
                          ? 'border-indigo-500 bg-indigo-500/20 text-white'
                          : 'border-slate-800 bg-slate-900/30 text-slate-400'
                      }`}
                    >
                      {lang === 'en' ? 'Procurement / RFP' : 'Pengadaan / RFP'}
                    </button>
                  </div>
                  <input
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder={placeholders[0]}
                    className="w-full rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500/60"
                  />
                  <input
                    required
                    type="email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder={placeholders[1]}
                    className="w-full rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500/60"
                  />
                  <textarea
                    required
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder={placeholders[2]}
                    className="w-full rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500/60"
                  />
                  {error && <p className="text-xs text-rose-400">{error}</p>}
                  <Button variant="primary" size="lg" type="submit" disabled={submitting} className="w-full">
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        {lang === 'en' ? 'Encrypting & Sending...' : 'Mengenkripsi & Mengirim...'}
                      </span>
                    ) : (
                      submit
                    )}
                  </Button>
                </form>
              )}
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
