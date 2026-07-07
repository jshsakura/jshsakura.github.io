import { createContext } from 'react'

export const SUPPORTED_LANGUAGES = ['ko', 'en']
export const LANGUAGE_STORAGE_KEY = 'terminal_lang'

export const LanguageContext = createContext(null)
