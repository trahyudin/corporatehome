import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { MotionReveal, SectionHeading } from './ui.jsx';
import { useLang } from '../i18n.js';
import SneakPeekModal from './SneakPeekModal.jsx';
import { api } from '../services/api.js';

// 15 Enterprise Portfolio Websites
const DEFAULT_SITES = [
  {
    name: 'Aetheria',
    tag: 'Creative Tech Studio',
    url: 'https://aetheria-lac.vercel.app/',
    descId: 'Studio creative technology internasional yang memadukan computational design, arsitektur AI, dan rekayasa digital berperforma tinggi.',
    descEn: 'International creative technology studio bridging computational design, AI-driven architectures, and high-performance digital engineering.',
    stack: ['React', 'Next.js', 'AI/ML', 'i18n'],
  },
  {
    name: 'Aetheris',
    tag: 'Corporate Creative Tech',
    url: 'https://comporate-oo1m.vercel.app/',
    descId: 'Studio creative technology korporat premium untuk Fortune 500 — antarmuka enterprise dan arsitektur digital generasi berikutnya.',
    descEn: 'Elite corporate creative technology studio engineered for Fortune 500s — next-generation enterprise interfaces and spatial architecture.',
    stack: ['React 18', 'Framer Motion', 'Recharts'],
  },
  {
    name: 'Aetheris Quantum',
    tag: 'Quantum & Autonomous',
    url: 'https://komtrorate.vercel.app/',
    descId: 'Infrastruktur hiper-skalabel, klaster komputasi kuantum, dan sistem intelijen otonom untuk enterprise global.',
    descEn: 'Architecting hyper-scalable infrastructure, quantum computing clusters, and autonomous intelligence systems for global enterprise.',
    stack: ['Next.js', '3D / WebGL', 'Real-time'],
  },
  {
    name: 'Valence',
    tag: 'Intelligent Systems',
    url: 'https://corrcoorr.vercel.app/',
    descId: 'Studio pionir creative technology dan intelligent systems — platform digital, spatial computing, dan ekosistem AI enterprise.',
    descEn: 'Pioneering creative technology and intelligent systems studio designing digital platforms, spatial computing interfaces, and enterprise AI ecosystems.',
    stack: ['React', 'Spatial UI', 'AI'],
  },
  {
    name: 'Valence Dynamics',
    tag: 'Deep Tech / R&D',
    url: 'https://porrtat.vercel.app/',
    descId: 'Inovasi korporat generasi berikutnya: intelijen otonom, infrastruktur quantum-resilient, dan sistem sintetik untuk enterprise global.',
    descEn: 'Next-generation corporate innovation, autonomous intelligence, quantum-resilient infrastructure, and synthetic systems for global enterprises.',
    stack: ['Next.js', 'Data Viz', 'Security'],
  },
  {
    name: 'Nexaris Global',
    tag: 'Autonomous Systems',
    url: 'https://corrp1.vercel.app/',
    descId: 'Arsitektur otonom, teknologi frontier, dan sistem enterprise kreatif untuk institusi global modern.',
    descEn: 'Engineering autonomous architecture, frontier technology, and creative enterprise systems for modern global institutions.',
    stack: ['React 18', 'Edge', 'i18n'],
  },
  {
    name: 'Kyron',
    tag: 'Digital Flagship',
    url: 'https://corrpp2.vercel.app/',
    descId: 'Flagship digital multi-halaman ultra-premium: creative technology, sintesis strategis, dan solusi enterprise futuristik.',
    descEn: 'Ultra-premium multi-page corporate digital flagship uniting creative technology, strategic synthesis, and futuristic enterprise solutions.',
    stack: ['React 18', 'Framer Motion', 'SEO'],
  },
  {
    name: 'Synova Global',
    tag: 'Strategic Transformation',
    url: 'https://corrpp3.vercel.app/',
    descId: 'Creative technology enterprise dan transformasi digital strategis untuk pemimpin industri global.',
    descEn: 'Enterprise creative technology and strategic digital transformation for global industry leaders.',
    stack: ['Next.js', 'Headless CMS', 'Analytics'],
  },
  {
    name: 'Aethis Global',
    tag: 'Applied Tech',
    url: 'https://croopp4.vercel.app/',
    descId: 'Creative technology enterprise global, sovereign intelligence, dan sistem digital berdampak tinggi.',
    descEn: 'Global enterprise creative technology, sovereign intelligence, and high-impact digital systems.',
    stack: ['React', 'Dashboards', 'Cloud'],
  },
  {
    name: 'Aetheron Dynamics',
    tag: 'Digital HQ',
    url: 'https://croopp5.vercel.app/',
    descId: 'Arsitektur kognitif generasi berikutnya, sibernetika otonom, dan infrastruktur kuantum global.',
    descEn: 'Next-generation cognitive architecture, autonomous cybernetics, and global quantum infrastructure.',
    stack: ['Next.js', '3D / WebGL', 'Edge'],
  },
  {
    name: 'Kordex',
    tag: 'Digital Architecture',
    url: 'https://croopp6.vercel.app/',
    descId: 'Teknologi global, infrastruktur otonom, dan arsitektur transformasi digital untuk enterprise skala planet.',
    descEn: 'Global technology, autonomous infrastructure, and digital transformation architecture for planetary-scale enterprises.',
    stack: ['React 18', 'Spatial UI', 'Cloud'],
  },
  {
    name: 'Aetheron Command',
    tag: 'Command Center',
    url: 'https://corrp7.vercel.app/',
    descId: 'Digital command center generasi berikutnya & infrastruktur enterprise kognitif untuk operasi mission-critical.',
    descEn: 'Next-generation digital command center & cognitive enterprise infrastructure for mission-critical operations.',
    stack: ['Recharts', 'Real-time', 'Security'],
  },
  {
    name: 'Valence Kinetic',
    tag: 'Kinetic Computing',
    url: 'https://croopp8.vercel.app/',
    descId: 'Sistem intelijen otonom & kinetic computing — pengalaman digital korporat teknologi global futuristik.',
    descEn: 'Autonomous intelligence & kinetic computing systems — a futuristic global technology corporate digital experience.',
    stack: ['React', 'Animations', 'AI'],
  },
  {
    name: 'Aetheris Enterprise',
    tag: 'Enterprise Systems',
    url: 'https://croopp9.vercel.app/',
    descId: 'Digital flagship kelas dunia dan platform creative engineering enterprise dengan pengalaman digital transformatif.',
    descEn: 'World-class digital flagship and enterprise creative engineering platform pioneering transformative digital experiences.',
    stack: ['React 18', 'Framer Motion', 'SEO'],
  },
  {
    name: 'Aetheris Labs',
    tag: 'Future Lab / R&D',
    url: 'https://croopp10.vercel.app/',
    descId: 'Lab teknologi canggih & strategi masa depan: komputasi skala planet, neurotechnology, dan sistem otonom.',
    descEn: 'Advanced technology & future strategy lab architecting planetary-scale computing, neurotechnology, and autonomous systems.',
    stack: ['Next.js', 'Data Viz', 'i18n'],
  },
];

export default function Portfolio() {
  const { lang } = useLang();
  const [sites, setSites] = useState(DEFAULT_SITES);
  const [previewSite, setPreviewSite] = useState(null);

  useEffect(() => {
    // Optionally fetch dynamic list from backend
    api.getPortfolio().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setSites(data);
      }
    });
  }, []);

  const T = lang === 'en'
    ? {
        kicker: 'Live Websites',
        title: 'See our work in the wild',
        desc: 'A selection of 15 enterprise corporate websites we have architected and shipped. Explore sneak peaks or test live demos.',
        demo: 'Demo',
        sneakPeek: 'Sneak Peek',
        visit: 'Visit site',
      }
    : {
        kicker: 'Website Portofolio',
        title: 'Lihat karya kami secara langsung',
        desc: 'Seleksi 15 website korporat enterprise yang telah kami arsitekturkan dan rilis. Klik Sneak Peek untuk preview interaktif atau Demo untuk membuka situs.',
        demo: 'Demo',
        sneakPeek: 'Sneak Peek',
        visit: 'Kunjungi situs',
      };

  return (
    <section id="portfolio" className="relative py-14 md:py-16">
      <div className="pointer-events-none absolute left-[4%] top-24 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-3xl" aria-hidden />
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading kicker={T.kicker} title={T.title} desc={T.desc} />

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((s, i) => (
            <MotionReveal key={s.name} delay={(i % 3) * 90} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(79,70,229,0.45)]">
                {/* Sneak Peek Embedded Iframe Container */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setPreviewSite(s)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setPreviewSite(s); }}
                  className="cursor-pointer block focus:outline-none"
                  title={`${T.sneakPeek}: ${s.name}`}
                >
                  <div className="relative m-4 h-40 overflow-hidden rounded-xl border border-slate-800/70 bg-[#0B0F19]">
                    <div className="flex justify-center">
                      <div
                        className="w-[1000px] shrink-0 pointer-events-none"
                        style={{ transform: 'scale(0.34)', transformOrigin: 'top center' }}
                      >
                        <iframe
                          src={s.url}
                          title={s.name}
                          loading="lazy"
                          tabIndex={-1}
                          aria-hidden
                          style={{ width: '1000px', height: '720px', border: 'none', background: '#0B0F19' }}
                        />
                      </div>
                    </div>

                    {/* Live Badge */}
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
                    </span>

                    {/* Quick Sneak Peek Overlay on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-obsidian2/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
                      <span className="flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-500/20 px-3.5 py-1.5 text-xs font-semibold text-cyan-200 shadow-lg">
                        <Eye size={14} /> {T.sneakPeek}
                      </span>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0E1424] to-transparent" />
                    <span className="absolute bottom-2 right-3 font-heading text-3xl font-bold text-white/20 select-none">{s.name[0]}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col px-5 pb-6">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300/90">{s.tag}</p>
                    <button
                      type="button"
                      onClick={() => setPreviewSite(s)}
                      className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <Eye size={12} /> {T.sneakPeek}
                    </button>
                  </div>

                  <h3 className="mt-2 font-heading text-lg font-bold text-slate-100">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {lang === 'en' ? s.descEn : s.descId}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.stack && s.stack.map((t) => (
                      <span key={t} className="rounded-full border border-slate-700/60 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-medium text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions: Sneak Peek & Demo */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSite(s)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800/50 px-3 py-2.5 text-xs font-semibold text-slate-200 transition-all duration-300 hover:border-slate-600 hover:bg-slate-700/50 hover:text-white"
                    >
                      <Eye size={13} className="text-cyan-400" />
                      {T.sneakPeek}
                    </button>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-500/50 bg-indigo-500/15 px-3 py-2.5 text-xs font-semibold text-indigo-200 transition-all duration-300 hover:bg-indigo-500/30 hover:text-white"
                    >
                      {T.demo} <ExternalLink size={13} />
                      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>

      {/* Interactive Sneak Peek Modal */}
      <SneakPeekModal site={previewSite} onClose={() => setPreviewSite(null)} />
    </section>
  );
}
