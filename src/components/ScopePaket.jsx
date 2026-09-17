import React from 'react';
import { Check, Layers, Server, ShieldCheck, Workflow, Wrench } from 'lucide-react';
import { MotionReveal, SectionHeading } from './ui.jsx';
import { useLang } from '../i18n.js';

const SCOPE_BASE = [
  {
    icon: Workflow, num: '1',
    id: { t: 'Struktur Informasi & Sitemap', d: 'Information architecture untuk grup, audiens, dan prioritas kanal.' },
    en: { t: 'Information Structure & Sitemap', d: 'Information architecture for your group, audience, and channel priorities.' },
  },
  {
    icon: Layers, num: '2',
    id: { t: 'Enterprise Design System', d: 'Satu design system terpadu untuk semua sub-brand & template.' },
    en: { t: 'Enterprise Design System', d: 'One unified design system across all sub-brands & templates.' },
  },
  {
    icon: Workflow, num: '3',
    id: { t: 'Headless CMS Integration', d: 'Integrasi Contentful / Strapi dengan routing multi-locale.' },
    en: { t: 'Headless CMS Integration', d: 'Contentful / Strapi with multi-locale routing.' },
  },
  {
    icon: ShieldCheck, num: '4',
    id: { t: 'Security & Compliance Audit', d: 'Audit SOC2 / GDPR pattern + laporan penuh untuk tim Anda.' },
    en: { t: 'Security & Compliance Audit', d: 'SOC2 / GDPR pattern audit + full report for your team.' },
  },
];

const ADDON_BASE = {
  id: [
    { icon: Workflow, t: 'Integrasi ERP/CRM internal', d: 'Sinkron data keuangan, inventori, operasional real-time.' },
    { icon: Server, t: 'Setup Server Dedicated', d: 'Provisioning, load-balancing, dan monitoring 24/7.' },
    { icon: Wrench, t: 'SLA Maintenance & Security Patch', d: 'Update berkala, backup, dan patching keamanan terjadwal.' },
  ],
  en: [
    { icon: Workflow, t: 'Internal ERP/CRM integration', d: 'Real-time sync of finance, inventory, and operations.' },
    { icon: Server, t: 'Dedicated server setup', d: 'Provisioning, load-balancing, and 24/7 monitoring.' },
    { icon: Wrench, t: 'SLA maintenance & security patches', d: 'Scheduled updates, backups, and security patching.' },
  ],
};

export default function ScopePaket() {
  const { lang } = useLang();
  const SCOPE = SCOPE_BASE.map((s) => ({ ...s, ...(lang === 'en' ? s.en : s.id) }));
  const ADDON = ADDON_BASE[lang];
  const { kicker, title, desc, addTitle, addSub } = lang === 'en'
    ? { kicker: 'Scope & Implementation', title: 'Enterprise packages built in phases', desc: 'A staged implementation covering structure, design system, CMS, and audit — with optional add-ons.', addTitle: 'Optional Add-ons', addSub: 'Extend your platform as your group scales.' }
    : { kicker: 'Scope Kerja & Paket', title: 'Paket enterprise implementasi bertahap', desc: 'Implementasi bertahap mencakup struktur, design system, CMS, dan audit — dengan add-on opsional.', addTitle: 'Add-on', addSub: 'Perluas platform seiring skala grup Anda.' };

  return (
    <section id="paket" className="relative py-14 md:py-16">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading kicker={kicker} title={title} desc={desc} />
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <MotionReveal className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SCOPE.map((s) => (
                <div key={s.num} className="relative rounded-2xl border border-slate-800/60 bg-white/[0.025] p-5">
                  <span className="font-heading text-3xl font-bold text-slate-700/60">0{s.num}</span>
                  <span className="mt-2 grid h-9 w-9 place-items-center rounded-lg bg-indigo-500/10 text-indigo-300"><s.icon size={17} /></span>
                  <h3 className="mt-3 font-display text-base font-semibold text-slate-100">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.d}</p>
                </div>
              ))}
            </div>
          </MotionReveal>
          <MotionReveal delay={90} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.06] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-indigo-300">{addTitle}</p>
              <p className="mt-1 text-sm text-slate-400">{addSub}</p>
              <div className="mt-5 space-y-3">
                {ADDON.map((a) => (
                  <div key={a.t} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-cyan-300"><a.icon size={16} /></span>
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-100"><Check size={13} className="text-emerald-400" /> {a.t}</p>
                      <p className="text-xs text-slate-400">{a.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
