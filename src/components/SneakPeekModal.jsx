import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ExternalLink, Laptop, RefreshCw, Smartphone, Tablet, X } from 'lucide-react';
import { useLang } from '../i18n.js';

export default function SneakPeekModal({ site, onClose }) {
  const { lang } = useLang();
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [site, onClose]);

  if (!site) return null;

  const deviceWidths = {
    desktop: 'w-full max-w-[1140px]',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[420px]',
  };

  const iframeHeights = {
    desktop: 'h-[640px]',
    tablet: 'h-[720px]',
    mobile: 'h-[680px]',
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="dark-window relative flex max-h-[96vh] w-full max-w-[1280px] flex-col overflow-hidden rounded-3xl border border-slate-700/60 bg-obsidian2 shadow-2xl">
        {/* Top Header Bar */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-obsidian/90 px-5 py-3.5 backdrop-blur-md">
          {/* Traffic light dots + Site Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-bold text-white">{site.name}</span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-300">
                  {site.tag}
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-400 hidden sm:block truncate max-w-sm">{site.url}</p>
            </div>
          </div>

          {/* Device Preview Switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                device === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Desktop View"
            >
              <Laptop size={14} />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('tablet')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                device === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet size={14} />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                device === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile View (420px)"
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setRefreshKey((k) => k + 1);
              }}
              title="Refresh Sneak Peek"
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-cyan-400' : ''} />
            </button>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/20 hover:text-white"
            >
              <span>{lang === 'en' ? 'Open Site' : 'Buka Tab Baru'}</span>
              <ExternalLink size={12} />
              <ArrowUpRight size={13} />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Sneak Peek Embed Body */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto bg-[#070A12] p-4">
          <div className={`relative mx-auto transition-all duration-300 ${deviceWidths[device]} ${iframeHeights[device]} overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0B0F19] shadow-2xl`}>
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-obsidian2/90 backdrop-blur-sm">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
                <p className="font-mono text-xs text-slate-400">
                  {lang === 'en' ? 'Loading sneak peek preview...' : 'Memuat pratinjau sneak peek...'}
                </p>
              </div>
            )}
            <iframe
              key={refreshKey}
              src={site.url}
              title={`Sneak Peek ${site.name}`}
              className="h-full w-full border-0 bg-[#0B0F19]"
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 bg-obsidian/90 px-6 py-3">
          <div className="max-w-2xl text-xs text-slate-400">
            <span className="font-semibold text-slate-200">{site.name}: </span>
            <span>{lang === 'en' ? site.descEn : site.descId}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {site.stack && site.stack.map((t) => (
              <span key={t} className="rounded-md border border-slate-800 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
