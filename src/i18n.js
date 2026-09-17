import React, { createContext, useContext, useEffect, useState } from 'react';

const LangContext = createContext({ lang: 'id', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('korpora-lang') || 'id';
    } catch {
      return 'id';
    }
  });

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem('korpora-lang', next);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return React.createElement(
    LangContext.Provider,
    { value: { lang, setLang } },
    children
  );
}

export function useLang() {
  return useContext(LangContext);
}
