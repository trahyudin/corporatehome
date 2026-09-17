import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

export function MotionReveal({ children, delay = 0, y = 20, className = '', section = false, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Tag = section ? motion.section : motion.div;

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

export function AnimatedNumber({ to, duration = 1.8, prefix = '', suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setVal(v),
      });
      return () => controls.stop();
    }
    const fb = setTimeout(() => setVal(to), 1200);
    return () => clearTimeout(fb);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Tag = as;
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
}

export function Badge({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'border-slate-700/60 text-slate-300',
    accent: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
    cyan: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    glow: 'border-indigo-400/40 bg-indigo-500/15 text-white shadow-[0_0_24px_-6px_rgba(79,70,229,0.6)]',
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function Kicker({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-300/90 ${className}`}>
      <span className="h-px w-8 bg-gradient-to-r from-indigo-500 to-cyan-400" />
      {children}
    </div>
  );
}

export const Button = React.forwardRef(function Button(
  { variant = 'primary', size = 'md', children, className = '', as = 'button', icon = null, ...rest },
  ref
) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer select-none disabled:opacity-50';
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-7 py-3.5 text-[15px]',
    xl: 'px-8 py-4 text-[16px]',
  };
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 hover:shadow-[0_8px_40px_-8px_rgba(99,102,241,0.7)] hover:-translate-y-0.5 active:translate-y-0',
    cyan:
      'bg-gradient-to-r from-cyan-500 to-sky-500 text-obsidian font-bold hover:shadow-[0_8px_40px_-8px_rgba(6,182,212,0.7)] hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'border border-slate-700/70 text-slate-200 bg-white/[0.02] hover:border-slate-500/80 hover:bg-white/[0.05] hover:text-white',
    outline:
      'border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400 hover:text-white',
    white: 'bg-white text-obsidian hover:bg-slate-100 hover:-translate-y-0.5',
    darkOnLight: 'bg-slate-900 text-white hover:bg-slate-800',
  };
  const Tag = as;
  return (
    <Tag ref={ref} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </Tag>
  );
});

export function SectionHeading({ kicker, title, desc, align = 'left', className = '' }) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignCls} ${className}`}>
      <Reveal><Kicker>{kicker}</Kicker></Reveal>
      <Reveal delay={80}><h2 className="font-heading text-3xl font-bold leading-tight text-slate-900 dark:text-slate-100 md:text-[2.6rem]">{title}</h2></Reveal>
      {desc && <Reveal delay={160}><p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">{desc}</p></Reveal>}
    </div>
  );
}

export function GlassCard({ children, className = '', hover = true }) {
  return (
    <div className={`group relative rounded-2xl border border-slate-800/60 bg-white/[0.025] backdrop-blur-sm transition-all duration-300 ${hover ? 'hover:border-indigo-500/40 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(79,70,229,0.45)]' : ''} ${className}`}>
      {children}
    </div>
  );
}
