import { motion } from 'framer-motion'
import { FileText, Sparkles, Rocket, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Process = () => {
  const { t } = useTranslation()
  
  const icons = [FileText, Sparkles, Rocket]
  const steps = [0, 1, 2].map(i => ({
    ...t(`process.steps.${i}`, { returnObjects: true }) as { number: string; title: string; description: string },
    icon: icons[i]
  }))

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-earth-100 to-primary-100 rounded-full blur-3xl"></div>
      </div>

      <div className="container-tight">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="h2 mb-6">{t('process.title')}</h2>
          <p className="p text-lg text-primary-700">
            {t('process.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-earth-200 via-earth-400 to-earth-200" style={{ top: '120px' }}></div>

          {/* Steps */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Step number indicator */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-earth-700 to-earth-900 flex items-center justify-center shadow-elegant">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute mt-2 w-16 h-16 rounded-2xl bg-earth-200 blur-xl opacity-50"></div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-earth-100 border-2 border-earth-300 mb-2">
                      <span className="text-earth-800 font-bold text-lg">{step.number}</span>
                    </div>
                    
                    <h3 className="h3 text-xl">{step.title}</h3>
                    
                    <p className="p text-base text-primary-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector - desktop only */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 z-20">
                      <ArrowRight className="w-8 h-8 text-earth-400" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Animated Form Demo */}
        <motion.div
          className="mt-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant border border-primary-200 bg-white">
            {/* Browser Chrome */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-primary-100 border-b border-primary-200 flex items-center px-3 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-earth-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-earth-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-earth-400"></div>
              </div>
              <div className="flex-1 ml-4 bg-white rounded px-3 py-1 text-[10px] text-primary-600">
                {t('process.formUrl')}
              </div>
            </div>

            {/* Animated Form Loading */}
            <div className="absolute inset-0 pt-8">
              {/* Loading bar */}
              <motion.div
                className="absolute top-8 left-0 h-0.5 bg-earth-600"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              />

              {/* Form Content */}
              <div className="p-6 space-y-4">
                {/* Form Title */}
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <div className="text-2xl font-bold text-earth-800">{t('process.formTitle')}</div>
                  <div className="h-2 bg-primary-100 rounded w-1/3 mx-auto mt-2"></div>
                </motion.div>

                {/* Form Fields */}
                {[
                  { width: '40%', delay: 0.7 },
                  { width: '35%', delay: 0.9 },
                  { width: '50%', delay: 1.1 },
                  { width: '45%', delay: 1.3 }
                ].map((field, i) => (
                  <motion.div
                    key={i}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: field.delay, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <div className="h-3 bg-primary-200 rounded-full" style={{ width: field.width }}></div>
                    <div className="h-10 bg-gradient-to-r from-primary-50 to-earth-50 rounded-lg border-2 border-primary-200"></div>
                  </motion.div>
                ))}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  className="pt-2"
                >
                  <div className="h-12 bg-earth-700 rounded-lg"></div>
                </motion.div>
              </div>

              {/* Speed indicator */}
              <motion.div
                className="absolute bottom-4 right-4 bg-earth-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.7, repeat: Infinity, repeatDelay: 3 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {t('process.formBadge')}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#planos" className="btn-cta inline-flex items-center text-lg">
            {t('process.cta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
