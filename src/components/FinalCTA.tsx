import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const FinalCTA = () => {
  const { t } = useTranslation()
  
  return (
    <section className="section bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900 text-white">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Title */}
            <h2 className="font-[Sora] font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-8 leading-tight">
              {t('finalCTA.title')}
            </h2>
            
            {/* Description */}
            <div className="space-y-3 mb-12">
              <p className="text-xl md:text-2xl text-white/90 leading-tight">
                {t('finalCTA.text1')}
              </p>
              <p className="text-xl md:text-2xl font-bold text-white leading-tight">
                {t('finalCTA.text2')}
              </p>
            </div>

            {/* CTA Button */}
            <a 
              href="#planos" 
              className="inline-flex items-center justify-center px-12 py-5 bg-white text-earth-900 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('finalCTA.cta')}
              <ArrowRight className="w-5 h-5 ml-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
