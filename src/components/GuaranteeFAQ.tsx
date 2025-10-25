import { motion } from 'framer-motion'
import { Shield, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const GuaranteeFAQ = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i =>
    t(`guaranteeFAQ.faqs.${i}`, { returnObjects: true }) as { question: string; answer: string }
  )

  return (
    <section className="section bg-gradient-to-b from-primary-50 to-white">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Guarantee */}
          <motion.div
            className="lg:sticky lg:top-24 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="card p-8 bg-gradient-to-br from-earth-50 to-white border-2 border-earth-300">
              <div className="w-16 h-16 rounded-2xl bg-earth-700 flex items-center justify-center mb-6">
                <Shield className="w-9 h-9 text-white" />
              </div>
              
              <h2 className="h2 mb-6">{t('guaranteeFAQ.guaranteeTitle')}</h2>
              
              <div className="space-y-4 text-primary-700 leading-relaxed">
                <p className="font-semibold text-primary-900">
                  {t('guaranteeFAQ.guaranteeText1')}
                </p>
                
                <p>
                  {t('guaranteeFAQ.guaranteeText2')}
                </p>
                
                <p className="font-semibold text-primary-900">
                  {t('guaranteeFAQ.guaranteeText3')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - FAQ */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="h2 mb-8">{t('guaranteeFAQ.faqTitle')}</h2>
            
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="card overflow-hidden border-2 hover:border-earth-300 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -2 }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-earth-50/50 transition-colors duration-300"
                  >
                    <span className="font-semibold text-primary-900 pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="mt-0.5"
                    >
                      <ChevronDown className="w-5 h-5 text-earth-700 flex-shrink-0" />
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openIndex === i ? 'auto' : 0,
                      opacity: openIndex === i ? 1 : 0
                    }}
                    transition={{ 
                      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3, ease: "easeInOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="px-6 pb-6 text-primary-600 leading-relaxed"
                      initial={{ y: -10 }}
                      animate={{ y: openIndex === i ? 0 : -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GuaranteeFAQ
