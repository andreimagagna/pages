import { motion } from 'framer-motion'
import { Zap, Shield, Rocket, Sparkles, Clock, Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Solution = () => {
  const { t } = useTranslation()
  
  const icons = [Sparkles, Award, Zap, Shield, Rocket, Clock]
  const benefits = [0, 1, 2, 3, 4, 5].map(i => ({
    ...t(`solution.benefits.${i}`, { returnObjects: true }) as { title: string; description: string },
    icon: icons[i]
  }))

  return (
    <section className="section bg-gradient-to-b from-primary-50 via-white to-primary-50">
      <div className="container-tight">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 
              className="h2 mb-6"
              dangerouslySetInnerHTML={{ __html: t('solution.title') }}
            />
            <p className="text-lg text-primary-600 max-w-2xl mx-auto leading-relaxed">
              {t('solution.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-primary-100 hover:border-earth-300 transition-all duration-300 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-earth-100/0 via-earth-100/50 to-earth-100/0 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-earth-700 flex items-center justify-center shadow-soft"
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 10,
                        boxShadow: "0 10px 30px -10px rgba(120, 53, 15, 0.5)",
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-[Sora] font-semibold text-xl text-primary-900 mb-2 group-hover:text-earth-800 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-primary-600 leading-relaxed text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solution
