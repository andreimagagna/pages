import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Comparison = () => {
  const { t } = useTranslation()
  
  const rows = [0, 1, 2, 3, 4].map(i => 
    t(`comparison.rows.${i}`, { returnObjects: true }) as { category: string; diy: string; agency: string; us: string }
  )

  return (
    <section className="section bg-gradient-to-b from-white to-primary-50">
      <div className="container-tight">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="h2 mb-6">{t('comparison.title')}</h2>
          <p className="p text-xl">
            {t('comparison.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <table className="w-full card">
            <thead>
              <tr className="border-b-2 border-primary-200">
                <th className="text-left p-6 font-semibold text-primary-900"></th>
                <th className="p-6 text-center font-medium text-primary-600">
                  <X className="w-5 h-5 mx-auto mb-2 text-primary-400" />
                  {t('comparison.headers.1')}
                </th>
                <th className="p-6 text-center font-medium text-primary-600">
                  <X className="w-5 h-5 mx-auto mb-2 text-primary-400" />
                  {t('comparison.headers.2')}
                </th>
                <th className="p-6 text-center font-semibold text-primary-900 bg-earth-50">
                  <Check className="w-6 h-6 mx-auto mb-2 text-earth-700" />
                  {t('comparison.headers.3')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-primary-100 last:border-0">
                  <td className="p-6 font-semibold text-primary-900">{row.category}</td>
                  <td className="p-6 text-center text-primary-600 text-base">{row.diy}</td>
                  <td className="p-6 text-center text-primary-600 text-base">{row.agency}</td>
                  <td className="p-6 text-center font-semibold text-earth-800 text-base bg-earth-50/50">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <a 
            href="#planos" 
            className="btn-cta inline-flex items-center"
          >
            {t('comparison.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Comparison
