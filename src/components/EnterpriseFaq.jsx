import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileCode2, Languages, ShieldCheck } from 'lucide-react';
import { Kicker, MotionReveal } from './ui.jsx';
import { useLang } from '../i18n.js';

const FAQ_BASE = [
  {
    icon: ShieldCheck,
    id: { q: 'Bagaimana NDA dan kerahasiaan data dijamin?', a: 'Kami menandatangani NDA sebelum diskusi arsitektur apa pun untuk melindungi rencana bisnis, data keuangan, dan strategi grup Anda. Seluruh data tetap milik Anda; kami tidak menyimpan atau membagikan apa pun kepada pihak ketiga tanpa persetujuan tertulis.' },
    en: { q: 'How is your NDA and data confidentiality guaranteed?', a: 'We sign an NDA before any architecture discussion to protect your business plans, financial data, and group strategy. All data stays yours; we never store or share anything with third parties without written consent.' },
  },
  {
    icon: FileCode2,
    id: { q: 'Apakah hak kepemilikan source code 100% milik kami?', a: 'Ya. Source code sepenuhnya milik klien setelah penyerahan. Anda bebas mengelola, memodifikasi, dan melanjutkan dengan tim internal tanpa kewajiban kontrak lanjutan atau lock-in vendor.' },
    en: { q: 'Do we own 100% of the source code?', a: 'Yes. The source code is entirely yours after delivery. You are free to manage, modify, and continue with your internal team with no ongoing contract obligations or vendor lock-in.' },
  },
  {
    icon: Languages,
    id: { q: 'Apakah platform mendukung multi-bahasa & audit internasional?', a: 'Ya. Setiap solusi dibekali engine i18n multi-bahasa (termasuk RTL/Arab), aksesibilitas WCAG 2.1 AA, dan Semantic Schema Google News — siap menghadapi audit kepatuhan internasional.' },
    en: { q: 'Does the platform support multilingual & international audit?', a: 'Yes. Every solution ships with a multilingual i18n engine (including RTL/Arabic), WCAG 2.1 AA accessibility, and Google News Semantic Schema — ready for international compliance audits.' },
  },
];

export default function EnterpriseFaq() {
  const { lang } = useLang();
  const [open, setOpen] = useState(0);
  const FAQ = FAQ_BASE.map((f) => ({ ...f, ...(lang === 'en' ? f.en : f.id) }));
  const kicker = lang === 'en' ? 'Corporate FAQ' : 'FAQ Korporat';
  const title = lang === 'en'
    ? 'The trust questions boards ask first'
    : 'Pertanyaan kepercayaan yang ditanyakan dewan sejak awal';

  return (
    <section id="faq" className="relative py-14 md:py-16">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="max-w-2xl">
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-slate-100 md:text-4xl">{title}</h2>
        </div>
        <div className="mt-8 max-w-2xl space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <MotionReveal key={f.q} delay={i * 60}>
                <div className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? 'border-indigo-500/40 bg-white/[0.03]' : 'border-slate-800/70 bg-slate-900/40'}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-700/60 bg-white/[0.03] text-cyan-300">
                      <f.icon size={16} />
                    </span>
                    <span className="flex-1 font-display text-base font-semibold text-slate-100 md:text-lg">{f.q}</span>
                    <span className={`shrink-0 text-xl font-light text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p className="px-6 pb-6 pl-[76px] text-[15px] leading-relaxed text-slate-400">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
