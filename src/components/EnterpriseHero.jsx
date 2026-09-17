import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Check, Download } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button, MotionReveal } from './ui.jsx';
import { useLang } from '../i18n.js';
import { api } from '../services/api.js';

const SERIES = {
  irAll: {
    label: 'IR Portal', color: '#6366F1', growth: '+12.4%',
    id: { name: 'Indeks Portofolio Grup', unit: 'IDR M' },
    en: { name: 'Group Portfolio Index', unit: 'IDR M' },
    data: [
      { l: 'Q1-24', v: 120, s: 84 }, { l: 'Q3-24', v: 148, s: 97 },
      { l: 'Q1-25', v: 166, s: 108 }, { l: 'Q3-25', v: 189, s: 124 },
      { l: 'Q1-26', v: 214, s: 139 }, { l: 'Q3-26', v: 242, s: 158 },
    ],
  },
  esg: {
    label: 'ESG / Sustainability', color: '#06B6D4', growth: '+9.1%',
    id: { name: 'Skor ESG Terkonsolidasi', unit: 'Skor' },
    en: { name: 'Consolidated ESG Score', unit: 'Score' },
    data: [
      { l: 'Q1-24', v: 78, s: 62 }, { l: 'Q3-24', v: 81, s: 70 },
      { l: 'Q1-25', v: 84, s: 76 }, { l: 'Q3-25', v: 87, s: 81 },
      { l: 'Q1-26', v: 90, s: 88 }, { l: 'Q3-26', v: 93, s: 94 },
    ],
  },
};

function FinancialPreview({ lang, onDownload }) {
  const { color, growth, data } = SERIES.irAll;
  const meta = lang === 'en' ? SERIES.irAll.en : SERIES.irAll.id;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-indigo-300">{meta.name} · {meta.unit}</p>
          <p className="mt-1 flex items-center gap-2 font-display text-xl font-bold text-white">
            IDR 9,412 M
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">{growth} YoY</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 font-mono text-[11px] font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/20"
        >
          <Download size={13} /> {lang === 'en' ? 'FY25 PDF' : 'PDF FY25'}
        </button>
      </div>
      <div className="mt-3 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 6, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="pw-rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.45" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <XAxis dataKey="l" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#0E1424', border: '1px solid rgba(51,65,85,0.6)', borderRadius: 10, fontSize: 12 }}
              labelStyle={{ color: '#94A3B8' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill="url(#pw-rev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function EnterpriseHero({ onConsult }) {
  const { lang } = useLang();
  const [dl, setDl] = useState(false);

  const handleDownload = () => {
    setDl(true);
    // Direct download trigger from API
    const url = api.getReportDownloadUrl('annual-report-fy25');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Annual-Report-FY25-KORPORA.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const T = lang === 'en'
    ? {
        position: 'Corporate Language & Business Compliance, Not Just Code',
        badge: 'Enterprise Web Architecture & Holding Group Solutions',
        headline: (
          <>
            Enterprise-Grade Website Infrastructure for Corporations that Put{' '}
            <span className="anim-shimmer-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Reputation, Scalability & GCG Governance
            </span>{' '}
            First
          </>
        ),
        sub: 'Fortune-500-standardized web solutions: combining multi-subsidiary architecture, Investor Relations portals, regulatory compliance, and bank-grade security performance.',
        cta1: 'Schedule a Web Architecture Consult',
        cta2: 'Download the Corporate Solutions Catalog',
        trust: ['100% source-code ownership', 'Pre-briefing NDA', 'Bank-grade security compliance'],
        mockSession: 'Interactive Financial Highlights · Report Center',
      }
    : {
        position: 'Bahasa Korporat & Kepatuhan Bisnis, Bukan Sekadar Kode Pemrograman',
        badge: 'Enterprise Web Architecture & Holding Group Solutions',
        headline: (
          <>
            Infrastruktur Website Kelas Enterprise untuk Korporat yang Mengutamakan{' '}
            <span className="anim-shimmer-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Reputasi, Skalabilitas, dan Tata Kelola GCG
            </span>
          </>
        ),
        sub: 'Solusi website terstandarisasi Fortune 500: memadukan arsitektur multi-anak perusahaan, portal Investor Relations, kepatuhan regulasi, dan performa keamanan bank-grade.',
        cta1: 'Jadwalkan Konsultasi Arsitektur Web',
        cta2: 'Unduh Katalog Solusi Korporat',
        trust: ['Kepemilikan source code 100%', 'NDA sebelum briefing', 'Kepatuhan keamanan bank-grade'],
        mockSession: 'Financial Highlights Interaktif · Report Center',
      };

  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-24 md:pt-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="anim-drift absolute -top-40 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.22),transparent_60%)] blur-2xl" />
        <div className="anim-float-slow absolute right-[6%] top-[24%] hidden h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl md:block" />
        <div className="anim-float absolute left-[4%] top-[54%] hidden h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mx-auto max-w-[820px] text-center">
          <MotionReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-indigo-300/90">{T.position}</p>
          </MotionReveal>
          <MotionReveal>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-200">
              {T.badge}
            </span>
          </MotionReveal>

          <MotionReveal>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.12] tracking-tight text-slate-100 md:text-[3.1rem]">{T.headline}</h1>
          </MotionReveal>

          <MotionReveal>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-400">{T.sub}</p>
          </MotionReveal>

          <MotionReveal>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="primary" size="lg" className="group w-full sm:w-auto" onClick={onConsult}>
                {T.cta1}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline" size="lg" as="a" href="#laporan" className="group w-full sm:w-auto">
                <Download size={16} /> {T.cta2}
              </Button>
            </div>
          </MotionReveal>

          <MotionReveal>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {T.trust.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[13px] font-medium text-slate-400">
                  <Check size={14} className="text-emerald-400" /> {t}
                </span>
              ))}
            </div>
          </MotionReveal>
        </div>

        <MotionReveal className="mt-12">
          <div className="dark-window relative mx-auto w-full max-w-[940px] overflow-hidden rounded-2xl border border-slate-800/70 bg-obsidian2/95 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="anim-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/[0.06] to-transparent" aria-hidden />
            <div className="flex items-center gap-2 border-b border-slate-800/70 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 flex-1 truncate rounded-md border border-slate-800/70 bg-obsidian3 px-3 py-1 font-mono text-[11px] text-slate-400">
                ir.korpagrup.co.id · {lang === 'en' ? 'investor-portal' : 'portal-investor'} <span className="anim-blink text-cyan-300">▍</span>
              </span>
              <span className="hidden rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-semibold text-emerald-300 sm:flex sm:items-center sm:gap-1.5">
                <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> IR LIVE
              </span>
            </div>
            <div className="p-6">
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                <Building2 size={13} className="text-cyan-300" /> {T.mockSession}
              </p>
              <FinancialPreview lang={lang} onDownload={handleDownload} />
              {dl && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 font-mono text-[11px] text-emerald-300"
                >
                  {lang === 'en' ? '✓ FY25 annual report downloaded — check your downloads or the Report Center.' : '✓ Laporan tahunan FY25 berhasil diunduh — periksa unduhan Anda atau Report Center.'}
                </motion.p>
              )}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[['GCG Score', '88/100'], [lang === 'en' ? 'IR Coverage' : 'Cakupan IR', '120+'], [lang === 'en' ? 'a11y (WCAG AA)' : 'a11y (WCAG AA)', 'Passed']].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-slate-800/70 bg-white/[0.03] p-3 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{k}</p>
                    <p className="mt-1 font-display text-sm font-bold text-white">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
