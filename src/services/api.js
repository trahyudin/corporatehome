/**
 * API Service for Korpora Web Atelier
 * Works in both local dev (via Vite proxy to PHP server) and in cPanel production (relative /api path).
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  /**
   * Check backend & database connection
   */
  async checkHealth() {
    try {
      const res = await fetch(`${BASE_URL}/health`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API Health check error:', err.message);
      return { ok: false, error: err.message, db: 'disconnected' };
    }
  },

  /**
   * Submit a lead (modal consultation or CTA briefing booking)
   */
  async submitLead({ source, name, email, company, slot, lang }) {
    const res = await fetch(`${BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ source, name, email, company, slot, lang }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Gagal mengirim (HTTP ${res.status})`);
    }

    return await res.json();
  },

  /**
   * Submit an inquiry (whistleblowing or procurement/RFP)
   */
  async submitInquiry({ type, name, email, message }) {
    const res = await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ type, name, email, message }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Gagal mengirim laporan (HTTP ${res.status})`);
    }

    return await res.json();
  },

  /**
   * Get dynamic reports list
   */
  async getReports() {
    try {
      const res = await fetch(`${BASE_URL}/reports`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Fallback to local reports:', err.message);
      return null;
    }
  },

  /**
   * Trigger download for a report PDF
   */
  getReportDownloadUrl(slug) {
    return `${BASE_URL}/reports?download=${encodeURIComponent(slug)}`;
  },

  /**
   * Get dynamic portfolio sites list
   */
  async getPortfolio() {
    try {
      const res = await fetch(`${BASE_URL}/portfolio`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.items || null;
    } catch (err) {
      console.warn('Fallback to local portfolio sites:', err.message);
      return null;
    }
  },
};
