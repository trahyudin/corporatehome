import React, { useEffect, useRef, useState } from 'react';
import { Boxes, ChevronDown, Globe2, Landmark, Menu, Moon, Network, ShieldCheck, Sun, X } from 'lucide-react';
import { Button } from './ui.jsx';
import { useLang } from '../i18n.js';

export function Logo({ className = '' }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className || ''}`}>
      <span
        className="grid h-9 w-9 place-items-center rounded-xl shadow-[0_0_28px_-6px_rgba(79,70,229,0.8)]"
        style={{ background: 'linear-gradient(135deg,#6366F1,#06B6D4)' }}
      >
        <Boxes size={20} className="text-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-tight text-slate-100">KORPORA</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-slate-400">Web Atelier · Enterprise</span>
      </span>
    </a>
  );
}

const SOLUTIONS_DATA = {
  id: [
    { icon: Network, name: 'Holding Multi-Entity', desc: 'Struktur kepemilikan multi-subsidiary', tag: 'Flagship', href: '#templates' },
    { icon: Landmark, name: 'IR & Governance', desc: 'Investor Relations & GCG', href: '#templates' },
    { icon: Globe2, name: 'B2B Platform', desc: 'Industrial & enterprise commerce', href: '#templates' },
  ],
  en: [
    { icon: Network, name: 'Multi-Entity Holding', desc: 'Multi-subsidiary ownership structure', tag: 'Flagship', href: '#templates' },
    { icon: Landmark, name: 'IR & Governance', desc: 'Investor Relations & GCG', href: '#templates' },
    { icon: Globe2, name: 'B2B Platform', desc: 'Industrial & enterprise commerce', href: '#templates' },
  ],
};

function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center rounded-lg border border-slate-700/60 bg-white/[0.03] p-0.5 ${className || ''}`}>
      {['id', 'en'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`grid h-7 w-9 place-items-center rounded-md font-mono text-[11px] font-semibold transition-colors ${lang === l ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          {l === 'id' ? 'ID' : 'EN'}
        </button>
      ))}
    </div>
  );
}

export default function EnterpriseHeader({ dark, toggleDark, onConsult }) {
  const { lang } = useLang();
  const T = lang === 'en'
    ? {
        nav: ['Advantages', 'Technology', 'Showcase', 'FAQ'],
        hrefs: { Advantages: '#pillars', Technology: '#tech', Showcase: '#templates', FAQ: '#faq' },
        solusi: 'Solutions',
        solutions: SOLUTIONS_DATA.en,
        soc: 'SOC2 · GDPR pattern',
        quote: 'Request a Quote',
      }
    : {
        nav: ['Keunggulan', 'Teknologi', 'Showcase', 'FAQ'],
        hrefs: { Keunggulan: '#pillars', Teknologi: '#tech', Showcase: '#templates', FAQ: '#faq' },
        solusi: 'Solusi',
        solutions: SOLUTIONS_DATA.id,
        soc: 'SOC2 · GDPR pattern',
        quote: 'Request Enterprise Quote',
      };
  const nav = T.nav;
  const sectionHrefs = T.hrefs;
  const SOLUTIONS = T.solutions;

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
      setScrolled(h.scrollTop > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open || mobileOpen
          ? 'border-b border-slate-800/60 bg-obsidian/90 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      ref={navRef}
    >
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-4 px-5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${open ? 'text-indigo-300' : 'text-slate-300 hover:text-white'}`}
            >
              {T.solusi}
              <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 top-full w-[380px] pt-3 transition-all duration-200 ${open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}>
              <div className="dark-window overflow-hidden rounded-2xl border border-slate-800/70 bg-obsidian2/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
                {SOLUTIONS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                      <s.icon size={16} />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        {s.name}
                        {s.tag && <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-cyan-300">{s.tag}</span>}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-400">{s.desc}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {nav.map((item) => (
            <a
              key={item}
              href={sectionHrefs[item]}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangToggle />
          <span className="hidden items-center gap-1.5 rounded-full border border-slate-700/70 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] font-medium text-slate-300 xl:flex">
            <ShieldCheck size={13} className="text-emerald-400" />
            {T.soc}
          </span>
          <button
            type="button"
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700/60 text-slate-300 transition-colors hover:text-white"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Button variant="primary" size="sm" onClick={onConsult}>
            {T.quote}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700/60 text-slate-300"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700/60 text-slate-200"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-800/60 bg-obsidian/95 px-5 py-5 backdrop-blur-xl lg:hidden">
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">{T.solusi}</p>
            {SOLUTIONS.map((s) => (
              <a key={s.name} href={s.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl border border-slate-800/60 bg-white/[0.02] px-4 py-3 text-sm font-medium text-slate-200">
                <s.icon size={16} className="text-indigo-300" />
                {s.name}
              </a>
            ))}
            <div className="h-px bg-slate-800/60" />
            {nav.map((item) => (
              <a key={item} href={sectionHrefs[item]} onClick={() => setMobileOpen(false)} className="block px-1 py-2 text-sm font-medium text-slate-300">
                {item}
              </a>
            ))}
            <Button variant="primary" size="md" className="w-full" onClick={() => { setMobileOpen(false); onConsult(); }}>
              {T.quote}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
