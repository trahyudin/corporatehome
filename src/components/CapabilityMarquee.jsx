import React from 'react';

const ITEMS = [
  'Holding Multi-Entity',
  'Investor Relations Portal',
  'ESG & Sustainability Reporting',
  'GCG Compliance',
  'Multi-Brand Design System',
  'Bank-Grade Security',
  'Headless CMS',
  'Financial Data Visualization',
  'Corporate Branding',
  'WCAG Accessibility',
  'Enterprise i18n',
  'Fortune-500 Standards',
];

export default function CapabilityMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="korp-marquee relative overflow-hidden border-y border-slate-800/60 bg-obsidian2/40 py-3.5">
      <div className="korp-marquee-track items-center gap-0">
        {row.map((it, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400">
            <span className="px-6">{it}</span>
            <span className="text-indigo-400/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
