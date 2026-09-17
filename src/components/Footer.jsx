import React, { useEffect, useState } from 'react';
import { Database, ShieldCheck } from 'lucide-react';
import { Logo } from './EnterpriseHeader.jsx';
import { useLang } from '../i18n.js';
import { api } from '../services/api.js';

const COLUMNS_BASE = {
  id: [
    { title: 'Solusi Arsitektur', links: [{ n: 'Holding Multi-Entity', h: '#templates' }, { n: 'Portal Investor Relations', h: '#top' }, { n: 'Platform B2B Industrial', h: '#portfolio' }, { n: 'ESG Reporting Hub', h: '#laporan' }] },
    { title: 'Teknologi & Standar', links: [{ n: 'React 18 & Headless CMS', h: '#pillars' }, { n: 'Audit WCAG 2.1 AA', h: '#pillars' }, { n: 'Kepatuhan SOC2 & GDPR', h: '#quote' }, { n: 'Arsitektur Multi-Brand', h: '#paket' }] },
    { title: 'Perusahaan', links: [{ n: 'Tentang KORPORA', h: '#top' }, { n: 'Studi Kasus', h: '#studi' }, { n: 'Saluran Whistleblowing', h: '#laporan' }, { n: 'Briefing Arsitek', h: '#quote' }] },
  ],
  en: [
    { title: 'Architectures', links: [{ n: 'Multi-Entity Holding', h: '#templates' }, { n: 'Investor Relations Portal', h: '#top' }, { n: 'Industrial B2B Platform', h: '#portfolio' }, { n: 'ESG Reporting Hub', h: '#laporan' }] },
    { title: 'Tech & Standards', links: [{ n: 'React 18 & Headless CMS', h: '#pillars' }, { n: 'WCAG 2.1 AA Audits', h: '#pillars' }, { n: 'SOC2 & GDPR Compliance', h: '#quote' }, { n: 'Multi-Brand Architecture', h: '#paket' }] },
    { title: 'Company', links: [{ n: 'About KORPORA', h: '#top' }, { n: 'Case Studies', h: '#studi' }, { n: 'Whistleblowing Channel', h: '#laporan' }, { n: 'Architect Briefing', h: '#quote' }] },
  ],
};

export default function Footer() {
  const { lang } = useLang();
  const COLUMNS = COLUMNS_BASE[lang];
  const [apiStatus, setApiStatus] = useState({ checked: false, ok: false, db: 'connecting' });

  useEffect(() => {
    api.checkHealth().then((res) => {
      setApiStatus({ checked: true, ok: res.ok, db: res.db || (res.ok ? 'connected' : 'offline') });
    });
  }, []);

  const copy = lang === 'en'
    ? 'Enterprise Web Architecture for Conglomerates & Corporate Groups.'
    : 'Arsitektur Website Enterprise untuk Konglomerasi & Grup Korporat.';

  return (
    <footer className="border-t border-slate-800/70 bg-obsidian2/70 pb-12 pt-14 text-sm">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{copy}</p>

            {/* API & Database Connection Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-1.5 font-mono text-[11px]">
              <span className={`h-2 w-2 rounded-full ${apiStatus.ok ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <Database size={13} className="text-slate-400" />
              <span className="text-slate-300">
                API & DB: <strong className={apiStatus.ok ? 'text-emerald-400' : 'text-amber-400'}>{apiStatus.db}</strong>
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>SOC 2 Type II · ISO 27001 · GDPR compliant design</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((lnk) => (
                  <li key={lnk.n}>
                    <a href={lnk.h} className="text-slate-400 transition-colors hover:text-white">
                      {lnk.n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} KORPORA Web Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#top" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#laporan" className="hover:text-slate-300 transition-colors">Security & Whistleblowing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
