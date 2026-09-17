import React, { useCallback, useEffect, useState } from 'react';
import { LangProvider } from './i18n.js';

import EnterpriseHeader from './components/EnterpriseHeader.jsx';
import EnterpriseHero from './components/EnterpriseHero.jsx';
import CapabilityMarquee from './components/CapabilityMarquee.jsx';
import Portfolio from './components/Portfolio.jsx';
import BenefitPillars from './components/BenefitPillars.jsx';
import CorporateShowcase from './components/CorporateShowcase.jsx';
import EnterpriseWidgets from './components/EnterpriseWidgets.jsx';
import CaseStudies from './components/CaseStudies.jsx';
import ScopePaket from './components/ScopePaket.jsx';
import EnterpriseFaq from './components/EnterpriseFaq.jsx';
import EnterpriseCta from './components/EnterpriseCta.jsx';
import Footer from './components/Footer.jsx';
import EnterpriseModal from './components/EnterpriseModal.jsx';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('korpora-theme');
    if (saved) return saved === 'light';
    return false;
  } catch {
    return false;
  }
}

export default function App() {
  const [light, setLight] = useState(getInitialTheme);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    document.documentElement.classList.toggle('dark', !light);
    try {
      localStorage.setItem('korpora-theme', light ? 'light' : 'dark');
    } catch {}
  }, [light]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    const onConsultEvent = () => setModalOpen(true);
    window.addEventListener('korpora:consult', onConsultEvent);
    return () => window.removeEventListener('korpora:consult', onConsultEvent);
  }, []);

  return (
    <LangProvider>
      <div className="min-h-screen bg-obsidian text-slate-100 transition-colors duration-300">
        <EnterpriseHeader
          dark={!light}
          toggleDark={() => setLight((l) => !l)}
          onConsult={openModal}
        />
        <main>
          <EnterpriseHero onConsult={openModal} />
          <CapabilityMarquee />
          <Portfolio />
          <BenefitPillars />
          <CorporateShowcase />
          <EnterpriseWidgets />
          <CaseStudies />
          <ScopePaket />
          <EnterpriseFaq />
          <EnterpriseCta />
        </main>
        <Footer />
        <EnterpriseModal open={modalOpen} onClose={closeModal} />
      </div>
    </LangProvider>
  );
}
