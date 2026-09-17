import React, { useEffect, useState } from 'react';
import { Check, Loader2, Mail, X } from 'lucide-react';
import { Button } from './ui.jsx';
import { useLang } from '../i18n.js';
import { api } from '../services/api.js';

export default function EnterpriseModal({ open, onClose }) {
  const { lang } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const t = lang === 'en'
    ? {
        title: 'Schedule an Architecture Consultation',
        sub: 'Private session with a Lead Architect · 30 min',
        name: 'Full name',
        mail: 'Corporate email',
        company: 'Company / Holding group',
        submit: 'Confirm Consultation',
        note: 'Confirmation & agenda sent via email',
        ok: 'Request received',
        okD: (e) => <>Our team will reach <span className="font-mono text-white">{e || 'you'}</span> shortly.</>,
      }
    : {
        title: 'Jadwalkan Konsultasi Arsitektur',
        sub: 'Sesi bersama Lead Architect · 30 menit',
        name: 'Nama lengkap',
        mail: 'Email korporat',
        company: 'Perusahaan / Holding group',
        submit: 'Konfirmasi Konsultasi',
        note: 'Konfirmasi & agenda dikirim via email',
        ok: 'Permintaan terkirim',
        okD: (e) => <>Kami akan menghubungi <span className="font-mono text-white">{e || 'Anda'}</span> segera.</>,
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setSubmitting(true);
    try {
      await api.submitLead({
        source: 'modal_consultation',
        name,
        email,
        company,
        lang,
      });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Gagal mengirim konsultasi');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="dark-window relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-slate-700/50 bg-obsidian2 shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" aria-hidden />
        <div className="flex items-center justify-between border-b border-slate-800/70 px-7 py-5">
          <div>
            <h3 id="modal-title" className="font-heading text-xl font-bold text-white">{t.title}</h3>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-400">{t.sub}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-7">
          {done ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-indigo-500/15">
                <Check size={26} className="text-indigo-300" />
              </span>
              <p className="mt-5 font-display text-xl font-semibold text-white">{t.ok}</p>
              <p className="mt-2 text-sm text-slate-400">{t.okD(email)}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-2.5 text-xs font-semibold text-slate-200 hover:text-white"
              >
                {lang === 'en' ? 'Close' : 'Tutup'}
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.name}
                  className="w-full rounded-xl border border-slate-700/60 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-500/70"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.mail}
                  className="w-full rounded-xl border border-slate-700/60 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-500/70"
                />
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t.company}
                  className="w-full rounded-xl border border-slate-700/60 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-500/70"
                />
                {error && <p className="text-xs text-rose-400">{error}</p>}
                <Button variant="primary" size="lg" type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      {lang === 'en' ? 'Submitting...' : 'Mengirim...'}
                    </span>
                  ) : (
                    t.submit
                  )}
                </Button>
              </form>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Mail size={13} /> {t.note}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
