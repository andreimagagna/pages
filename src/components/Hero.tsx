import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import FloatingParticles from './FloatingParticles'

const Hero = () => {
  const { t } = useTranslation()
  
  return (
    <section className="relative section overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      {/* Floating Particles - hidden on mobile for performance */}
      <div className="hidden lg:block">
        <FloatingParticles />
      </div>
      
      {/* Animated background decoration - simplified */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-earth-200 rounded-full blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div 
              className="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {t('hero.badge')}
            </motion.div>
            
            <motion.h1 
              className="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              className="p text-lg max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
            />

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="#planos" 
                className="btn-cta inline-flex items-center justify-center"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right column - Visual with Page Loading Simulation */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant border border-primary-200 bg-white">
              {/* Browser Chrome */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-primary-100 border-b border-primary-200 flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-earth-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-earth-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-earth-400"></div>
                </div>
                <div className="flex-1 ml-4 bg-white rounded px-3 py-1 text-[8px] text-primary-600">
                  {t('hero.browserUrl')}
                </div>
              </div>

              {/* Animated Page Loading */}
              <div className="absolute inset-0 pt-8">
                {/* Loading bar */}
                <motion.div
                  className="absolute top-8 left-0 h-0.5 bg-earth-600"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                />

                {/* Page Content Blocks */}
                <div className="p-4 space-y-3">
                  {/* Header */}
                  <motion.div
                    className="h-12 bg-gradient-to-r from-earth-100 to-earth-50 rounded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                  
                  {/* Hero Section */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <div className="h-6 bg-primary-200 rounded w-3/4"></div>
                    <div className="h-6 bg-primary-200 rounded w-full"></div>
                    <div className="h-4 bg-primary-100 rounded w-5/6 mt-2"></div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <div className="h-10 bg-earth-700 rounded flex-1"></div>
                    <div className="h-10 bg-earth-200 rounded flex-1"></div>
                  </motion.div>

                  {/* Content Cards */}
                  <motion.div
                    className="grid grid-cols-3 gap-2 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-white rounded shadow-soft border border-primary-200"></div>
                    ))}
                  </motion.div>
                </div>

                {/* Speed indicator */}
                <motion.div
                  className="absolute bottom-4 left-4 bg-earth-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.3, repeat: Infinity, repeatDelay: 3 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {t('hero.speedBadge')}
                </motion.div>
              </div>
              
              {/* Floating stats cards */}
              <motion.div 
                className="absolute top-12 right-4 card p-3 max-w-[140px] z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-2xl font-bold text-earth-800">{t('hero.conversionStat')}</div>
                <div className="text-xs text-primary-600">{t('hero.conversionLabel')}</div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-12 left-4 card p-3 max-w-[140px] z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="text-2xl font-bold text-earth-800">{t('hero.loadingStat')}</div>
                <div className="text-xs text-primary-600">{t('hero.loadingLabel')}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
