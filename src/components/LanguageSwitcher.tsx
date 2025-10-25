import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    // Update URL to reflect language
    const newPath = `/${lng}${location.pathname.replace(/^\/(pt|en)/, '')}`
    navigate(newPath)
  }

  return (
    <motion.div
      className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-elegant border border-primary-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Globe className="w-4 h-4 text-earth-700" />
      <div className="flex items-center gap-1">
        <button
          onClick={() => changeLanguage('pt')}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
            i18n.language === 'pt'
              ? 'bg-earth-700 text-white'
              : 'text-primary-600 hover:bg-primary-100'
          }`}
        >
          PT
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
            i18n.language === 'en'
              ? 'bg-earth-700 text-white'
              : 'text-primary-600 hover:bg-primary-100'
          }`}
        >
          EN
        </button>
      </div>
    </motion.div>
  )
}

export default LanguageSwitcher
