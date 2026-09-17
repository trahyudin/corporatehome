import React from 'react';
import { Building2, Factory, TrendingDown, TrendingUp, Wrench } from 'lucide-react';
import { MotionReveal, SectionHeading } from './ui.jsx';
import { useLang } from '../i18n.js';

const CASES_BASE = [
  {
    icon: Building2, accent: 'from-indigo-500/25 to-indigo-500/5 text-indigo-300', line: 'from-indigo-500/70',
    id: {
      company: 'Holding Multinasional · 5 Anak Perusahaan',
      challenge: 'Brand tersebar tanpa standar UI yang konsisten di semua sub-brand',
      solution: 'Pembangunan Enterprise Unified Design System multi-sub-brand',
      result: 'Biaya maintenance IT terpangkas 55% dan brand equity meningkat',
      metric: '−55%',
      metricLabel: 'Biaya maintenance IT',
    },
    en: {
      company: 'Multinational Holding · 5 Subsidiaries',
      challenge: 'Brands scattered with no consistent UI standard across sub-brands',
      solution: 'Built an enterprise unified multi-sub-brand design system',
      result: 'IT maintenance cost cut 55% and brand equity up',
      metric: '−55%',
      metricLabel: 'IT maintenance cost',
    },
  },
  {
    icon: Factory, accent: 'from-cyan-500/25 to-cyan-500/5 text-cyan-300', line: 'from-cyan-400/70',
    id: {
      company: 'Perusahaan B2B Industrial',
      challenge: 'Website lama tidak lolos kualifikasi audit klien global',
      solution: 'Revamp standar WCAG & SOC2 UI Compliance',
      result: 'Closing kontrak B2B internasional naik 200%',
      metric: '+200%',
      metricLabel: 'Closing kontrak B2B',
    },
    en: {
      company: 'B2B Industrial Company',
      challenge: 'Legacy website failed global client audit qualification',
      solution: 'Revamped to WCAG & SOC2 UI compliance standards',
      result: 'International B2B contract closing up 200%',
      metric: '+200%',
      metricLabel: 'B2B contract closing',
    },
  },
];

function Row({ step, title, icon }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-slate-700/60 bg-white/[0.03] text-slate-300">{icon}</span>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{step}</p>
        <p className="text-sm leading-relaxed text-slate-400">{title}</p>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { lang } = useLang();
  const CASES = CASES_BASE.map((c) => ({ ...c, ...(lang === 'en' ? c.en : c.id) }));
  const { kicker, title, desc, c1, c2, c3 } = lang === 'en'
    ? { kicker: 'Case Studies', title: 'Proven with real corporate groups', desc: 'Challenge → Solution → Result across our engagements.', c1: 'Challenge', c2: 'Solution', c3: 'Result' }
    : { kicker: 'Mini Case Studies', title: 'Terbukti pada grup korporat nyata', desc: 'Tantangan → Solusi → Hasil di setiap engagement kami.', c1: 'Tantangan', c2: 'Solusi', c3: 'Hasil' };

  return (
    <section id="studi" className="relative py-14 md:py-16">
      <div className="pointer-events-none absolute right-[6%] top-20 h-72 w-72 rounded-full bg-indigo-500/[0.07] blur-3xl" aria-hidden />
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading kicker={kicker} title={title} desc={desc} />
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {CASES.map((c, i) => (
            <MotionReveal key={c.company} delay={(i % 2) * 90} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-slate-800/60 bg-white/[0.025] p-7">
                <div className="flex items-center justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.accent}`}><c.icon size={20} /></span>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-white">{c.metric}</p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{c.metricLabel}</p>
                  </div>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-100">{c.company}</h3>
                <span className={`mt-3 block h-1 w-10 rounded-full bg-gradient-to-r ${c.line}`} />
                <div className="mt-5 space-y-4">
                  <Row step={c1} title={c.challenge} icon={<TrendingDown size={14} />} />
                  <Row step={c2} title={c.solution} icon={<Wrench size={14} />} />
                  <Row step={c3} title={c.result} icon={<TrendingUp size={14} />} />
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
