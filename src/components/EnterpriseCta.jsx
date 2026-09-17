import React, { useState } from 'react';
import { Calendar, Check, Clock, Loader2, User } from 'lucide-react';
import { Badge, Button, MotionReveal } from './ui.jsx';
import { useLang } from '../i18n.js';
import { api } from '../services/api.js';

export default function EnterpriseCta() {
  const { lang } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const badge = lang === 'en' ? 'Book a Briefing · Lead Tech Architect' : 'Book Sesi Briefing · Lead Tech Architect';
  const title = lang === 'en'
    ? 'Start with a private 30-minute architecture briefing'
    : 'Mulai dengan sesi briefing arsitektur 30 menit';
  const p = lang === 'en'
    ? 'A senior Lead Tech Architect walks you through the right structure for your group and answers governance, compliance, and security questions — free and NDA-protected.'
    : 'Seorang Lead Tech Architect senior membimbing struktur yang tepat untuk grup Anda dan menjawab pertanyaan tata kelola, kepatuhan, dan keamanan — gratis dan dilindungi NDA.';
  const slots = lang === 'en'
    ? ['Mon · 09:30', 'Wed · 14:00', 'Thu · 11:00']
    : ['Senin · 09:30', 'Rabu · 14:00', 'Kamis · 11:00'];
  const fName = lang === 'en' ? 'Full name' : 'Nama lengkap';
  const fMail = lang === 'en' ? 'Corporate email' : 'Email korporat';
  const submit = lang === 'en' ? 'Book My Session' : 'Booking Sesi Saya';
  const certs = ['SOC 2', 'ISO 27001', 'GDPR', 'WCAG AA'];
  const ok = lang === 'en' ? 'Booking confirmed' : 'Booking terkonfirmasi';
  const okD = lang === 'en'
    ? (e) => <>Our team will confirm your briefing at <span className="font-mono text-white">{e || 'your email'}</span> shortly.</>
    : (e) => <>Tim kami akan konfirmasi briefing ke <span className="font-mono text-white">{e || 'email Anda'}</span>.</>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setSubmitting(true);
    try {
      await api.submitLead({
        source: 'cta_briefing',
        name,
        email,
        slot: slots[selectedSlot],
        lang,
      });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Gagal menyimpan booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote" className="relative pb-14">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <MotionReveal>
          <div className="dark-window relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-[#312E81] to-obsidian p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="anim-float-slow absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(34,211,238,0.18),transparent_55%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <Badge tone="glow" className="border-indigo-400/40 bg-indigo-500/20 text-white">{badge}</Badge>
                <h2 className="mt-6 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">{title}</h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-indigo-100/90">{p}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {certs.map((c) => (
                    <span key={c} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">{c}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-7 backdrop-blur-md">
                {done ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15"><Check size={26} className="text-white" /></span>
                    <p className="mt-5 font-display text-xl font-semibold text-white">{ok}</p>
                    <p className="mt-2 text-sm text-indigo-100/80">{okD(email)}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-200/80">
                      <Clock size={12} /> {lang === 'en' ? '30 min · no obligation' : '30 menit · tanpa kewajiban'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((s, idx) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSlot(idx)}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition-all cursor-pointer ${
                            selectedSlot === idx
                              ? 'border border-cyan-400 bg-cyan-500/30 text-white font-bold shadow-sm'
                              : 'border border-white/15 bg-white/[0.06] text-white/80 hover:bg-white/10'
                          }`}
                        >
                          <Calendar size={12} /> {s}
                        </button>
                      ))}
                    </div>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={fName}
                      className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-indigo-100/60 outline-none focus:border-white/40"
                    />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={fMail}
                      className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-indigo-100/60 outline-none focus:border-white/40"
                    />
                    {error && <p className="text-xs text-rose-300">{error}</p>}
                    <Button variant="white" size="lg" type="submit" disabled={submitting} className="w-full">
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin text-obsidian" />
                          {lang === 'en' ? 'Securing slot...' : 'Mengunci slot...'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <User size={16} /> {submit}
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
