import { useState, useCallback, useMemo } from 'react'
import { LanguageContext, SUPPORTED_LANGUAGES, LANGUAGE_STORAGE_KEY } from './languageContext'

function readStoredLang() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : null
  } catch {
    return null
  }
}

function detectBrowserLang() {
  const navigatorLang = typeof navigator !== 'undefined' ? navigator.language : ''
  return navigatorLang?.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

function getInitialLang() {
  return readStoredLang() || detectBrowserLang()
}

function persistLang(lang) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  } catch {
    /* localStorage unavailable (private mode, quota, etc.) */
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((nextLang) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLang)) return
    setLangState(nextLang)
    persistLang(nextLang)
  }, [])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
