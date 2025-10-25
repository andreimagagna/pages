import { motion } from 'framer-motion'
import { Loader2, LayoutGrid, Volume2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Problem = () => {
  const { t } = useTranslation()
  
  const icons = [Loader2, LayoutGrid, Volume2]
  
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-earth-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container-tight">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="h2 mb-6"
            dangerouslySetInnerHTML={{ __html: t('problem.title') }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {[0, 1, 2].map((i) => {
            const Icon = icons[i]
            const card = t(`problem.cards.${i}`, { returnObjects: true }) as { title: string; description: string }
            return (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 border border-earth-200 shadow-lg hover:shadow-xl hover:border-earth-300 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-earth-100 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-earth-700 stroke-[1.5]" />
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-3">{card.title}</h3>
                <p className="text-base text-primary-600 leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p 
            className="text-2xl md:text-3xl font-bold text-primary-900 leading-tight"
            dangerouslySetInnerHTML={{ __html: t('problem.conclusion') }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Problem
