import React from 'react';
import { ArrowUpRight, BarChart3, Building2, Factory, ShieldCheck } from 'lucide-react';
import { MotionReveal, SectionHeading } from './ui.jsx';
import { useLang } from '../i18n.js';

const LEVELS_BASE = [
  {
    id: 'l1', icon: Factory, accent: 'from-cyan-500/70', line: '#06B6D4', num: '01', tag: 'Level 1',
    idT: {
      name: 'Mid-Enterprise / B2B Industrial',
      suit: 'Perusahaan manufaktur / teknologi tunggal',
      focus: ['Katalog solusi produk', 'Sertifikasi ISO', 'Portal klien korporat'],
    },
    enT: {
      name: 'Mid-Enterprise / B2B Industrial',
      suit: 'Single manufacturing / technology company',
      focus: ['Product solutions catalog', 'ISO certification', 'Corporate client portal'],
    },
    stack: ['React 18', 'Headless CMS', 'ISO Showcase', 'i18n'],
  },
  {
    id: 'l2', icon: Building2, accent: 'from-indigo-500/70', line: '#6366F1', num: '02', tag: 'Level 2',
    idT: {
      name: 'Holding & Multi-Subsidiary Group',
      suit: 'Grup bisnis dengan banyak anak perusahaan',
      focus: ['Direktori entitas bisnis', 'Navigasi grup terpadu', 'Design System multi-brand'],
    },
    enT: {
      name: 'Holding & Multi-Subsidiary Group',
      suit: 'Business group with many subsidiaries',
      focus: ['Business-entity directory', 'Unified group navigation', 'Multi-brand design system'],
    },
    stack: ['React 18', 'Next.js', 'Strapi', 'Multi-entity'],
  },
  {
    id: 'l3', icon: BarChart3, accent: 'from-emerald-500/70', line: '#34D399', num: '03', tag: 'Level 3',
    idT: {
      name: 'Public Listed (Tbk) & ESG Portal',
      suit: 'Perusahaan terbuka',
      focus: ['Financial reports interaktif', 'Grafik saham real-time', 'Laporan keberlanjutan ESG'],
    },
    enT: {
      name: 'Public Listed (Tbk) & ESG Portal',
      suit: 'Publicly listed company',
      focus: ['Interactive financial reports', 'Real-time stock charts', 'ESG sustainability reports'],
    },
    stack: ['React 18', 'Recharts', 'Contentful', 'News SEO'],
  },
];

function LevelPreview({ t }) {
  return (
    <div className="dark-window bg-[#070A12]">
      <div className={`h-1 w-full bg-gradient-to-r ${t.accent}`} />
      <div className="flex items-center justify-between px-5 py-2.5">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-white/10 text-white"><t.icon size={11} /></span>
        <span className="font-mono text-[7px] tracking-[0.3em] text-slate-500">{t.tag}</span>
      </div>
      <div className="px-5 pb-4">
        <div className="h-2 w-3/4 rounded bg-white/15" />
        <div className="mt-2 h-1.5 w-1/2 rounded bg-white/10" />
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-8 rounded-md border border-white/10 bg-white/[0.04]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CorporateShowcase() {
  const { lang } = useLang();
  const LEVELS = LEVELS_BASE.map((t) => ({ ...t, ...(lang === 'en' ? t.enT : t.idT) }));
  const { kicker, title, desc, suit } = lang === 'en'
    ? {
        kicker: 'Solutions by Organizational Complexity',
        title: 'Pick the right architecture for your organization',
        desc: 'Three engagement levels matched to how your group is structured — from a single B2B company to a publicly listed conglomerate.',
        suit: 'Best for:',
      }
    : {
        kicker: 'Pilihan Solusi Berdasarkan Kompleksitas',
        title: 'Pilih arsitektur yang tepat untuk organisasi Anda',
        desc: 'Tiga level engagement yang disesuaikan dengan struktur grup Anda — dari perusahaan B2B tunggal hingga konglomerasi publik.',
        suit: 'Cocok untuk:',
      };

  return (
    <section id="templates" className="relative py-14 md:py-16">
      <div className="pointer-events-none absolute right-[6%] top-32 h-80 w-80 rounded-full bg-indigo-500/[0.07] blur-3xl" aria-hidden />
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading kicker={kicker} title={title} desc={desc} />
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {LEVELS.map((t, i) => (
            <MotionReveal key={t.id} delay={(i % 3) * 90} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
                <div className="m-4 overflow-hidden rounded-xl border border-slate-800/70">
                  <LevelPreview t={t} />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6">
                  <div className="flex items-center gap-2">
                    <span className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${t.accent} font-heading text-sm font-bold text-obsidian`}>{t.num}</span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300/90">{t.tag}</p>
                  </div>
                  <h3 className="mt-3 flex items-center gap-2 font-heading text-lg font-bold text-slate-100">{t.name}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">{suit} <span className="text-slate-300">{t.suit}</span></p>
                  <ul className="mt-4 space-y-2">
                    {t.focus.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                        <ShieldCheck size={13} className="shrink-0 text-emerald-400" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.stack.map((s) => (
                      <span key={s} className="rounded-full border border-slate-700/60 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-medium text-slate-300">{s}</span>
                    ))}
                  </div>
                  <a href="#quote" className="group/link mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-cyan-300">
                    {lang === 'en' ? 'See scope & package' : 'Lihat scope & paket'}
                    <ArrowUpRight size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
