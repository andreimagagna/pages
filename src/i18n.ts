import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpBackend) // Carrega traduções de /public/locales
  .use(LanguageDetector) // Detecta idioma da URL
  .use(initReactI18next) // Passa i18n para react-i18next
  .init({
    fallbackLng: 'pt', // Idioma padrão
    supportedLngs: ['pt', 'en'], // Idiomas suportados
    
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0, // Detecta idioma do primeiro segmento da URL (/pt ou /en)
      caches: ['localStorage', 'cookie'],
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Caminho dos arquivos de tradução
    },

    interpolation: {
      escapeValue: false, // React já faz escape
    },

    react: {
      useSuspense: true, // Usa Suspense para loading state
    },

    debug: false, // Mude para true se quiser ver logs de debug
  })

export default i18n

