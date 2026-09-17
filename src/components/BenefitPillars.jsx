import React from 'react';
import { Accessibility, Building2, Layers, TrendingUp } from 'lucide-react';
import { AnimatedNumber, GlassCard, Kicker, MotionReveal } from './ui.jsx';
import { useLang } from '../i18n.js';

const PILLARS_BASE = [
  {
    icon: Building2,
    accent: 'from-indigo-500/25 to-indigo-500/5 text-indigo-300',
    line: 'from-indigo-500/70',
    id: { title: 'Branding & Good Corporate Governance (GCG)', desc: 'Mempertegas otoritas direksi, struktur kepemilikan saham, profil manajemen, dan transparansi laporan publik.' },
    en: { title: 'Branding & Good Corporate Governance (GCG)', desc: 'Strengthen board authority, share-ownership structure, management profiles, and transparent public reporting.' },
  },
  {
    icon: TrendingUp,
    accent: 'from-cyan-500/25 to-cyan-500/5 text-cyan-300',
    line: 'from-cyan-400/70',
    id: { title: 'B2B Marketing & Investor Attraction', desc: 'Mengakselerasi kerja sama B2B dan ekspansi pasar — Katalog Solusi Industri, Pengajuan RFP/Tender, Siaran Pers Terintegrasi.' },
    en: { title: 'B2B Marketing & Investor Attraction', desc: 'Accelerate B2B partnerships and market expansion — Industrial Solutions Catalog, RFP/Tender submissions, integrated Press Releases.' },
  },
  {
    icon: Accessibility,
    accent: 'from-emerald-500/25 to-emerald-500/5 text-emerald-300',
    line: 'from-emerald-400/70',
    id: { title: 'Visibility & Global Standard Accessibility', desc: 'Siap audit internasional — Multi-Bahasa i18n, Standar Aksesibilitas WCAG 2.1 AA, Semantic Schema Google News.' },
    en: { title: 'Visibility & Global Standard Accessibility', desc: 'Ready for international audits — Multilingual i18n, WCAG 2.1 AA accessibility, Google News Semantic Schema.' },
  },
  {
    icon: Layers,
    accent: 'from-violet-500/25 to-violet-500/5 text-violet-300',
    line: 'from-violet-400/70',
    id: { title: 'Productivity & Multi-Brand Management', desc: 'Efisiensi pengelolaan grup — satu Design System terpadu untuk semua sub-brand, Modular Headless CMS, Integrasi API Internal.' },
    en: { title: 'Productivity & Multi-Brand Management', desc: 'Group-wide efficiency — one unified Design System for all sub-brands, Modular Headless CMS, internal API integration.' },
  },
];

const STATS_BASE = {
  id: [
    { to: 300, suffix: '+', label: 'Korporat & grup diperkuat' },
    { to: 55, suffix: '%', prefix: '−', label: 'Biaya maintenance IT' },
    { to: 200, suffix: '%', prefix: '+', label: 'Closing kontrak B2B' },
    { to: 40, suffix: '+', label: 'Bahasa (i18n)' },
  ],
  en: [
    { to: 300, suffix: '+', label: 'Corporates & groups empowered' },
    { to: 55, suffix: '%', prefix: '−', label: 'IT maintenance cost' },
    { to: 200, suffix: '%', prefix: '+', label: 'B2B contract closing' },
    { to: 40, suffix: '+', label: 'Languages (i18n)' },
  ],
};

export default function BenefitPillars() {
  const { lang } = useLang();
  const STATS = STATS_BASE[lang];
  const PILLARS = PILLARS_BASE.map((p) => ({ ...p, ...(lang === 'en' ? p.en : p.id) }));
  const title = lang === 'en'
    ? <>The 4 pillars of <span className="anim-shimmer-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">enterprise-grade infrastructure</span></>
    : <>4 pilar <span className="anim-shimmer-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">infrastruktur kelas enterprise</span></>;
  const sub = lang === 'en'
    ? 'Not just code — governance, compliance, visibility, and scale that speak the language of business.'
    : 'Bukan sekadar kode — tata kelola, kepatuhan, visibilitas, dan skala yang berbicara bahasa bisnis.';

  return (
    <section id="pillars" className="relative py-14 md:py-16">
      <div className="pointer-events-none absolute right-[4%] top-24 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-3xl" aria-hidden />
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-800/40 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-obsidian px-5 py-6 text-center">
              <p className="font-display text-3xl font-bold text-white md:text-4xl">
                <AnimatedNumber to={s.to} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.decimals || 0} className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent" />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-2xl">
          <Kicker>{lang === 'en' ? 'The Enterprise Pillars' : 'Pilar Enterprise'}</Kicker>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-slate-100 md:text-4xl">{title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{sub}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <MotionReveal key={p.title} delay={(i % 2) * 90} className="h-full">
              <GlassCard className="relative flex h-full flex-col p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.accent}`}>
                    <p.icon size={22} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-slate-600">PILAR {i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-slate-100">{p.title}</h3>
                <span className={`mt-4 block h-1 w-10 rounded-full bg-gradient-to-r ${p.line}`} />
                <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{p.desc}</p>
              </GlassCard>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
