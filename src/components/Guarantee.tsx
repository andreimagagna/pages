import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Guarantee = () => {
  const { t } = useTranslation()
  
  const icons = [ShieldCheck, Clock, Lock]
  const guarantees = [0, 1, 2].map(i => ({
    ...t(`guarantee.items.${i}`, { returnObjects: true }) as { title: string; subtitle: string; description: string },
    icon: icons[i]
  }))

  return (
    <section className="section bg-white">
      <div className="container-tight">
        <div className="max-w-6xl mx-auto">
          {/* Asymmetric 2-Column Layout */}
          <div className="grid lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Main Content */}
            <div>
              {/* Header */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="h2 mb-4">{t('guarantee.title')}</h2>
                <p className="text-lg text-primary-600">
                  {t('guarantee.subtitle')}
                </p>
              </motion.div>

              {/* Guarantees List */}
              <div className="space-y-8">
                {guarantees.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex gap-4 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-earth-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-earth-700" strokeWidth={1.5} />
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <h3 className="text-xl font-bold text-primary-900">
                            {item.title}
                          </h3>
                          <span className="text-xs font-semibold text-earth-600 uppercase tracking-wider">
                            {item.subtitle}
                          </span>
                        </div>
                        <p className="text-base text-primary-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right Column - Artistic Proof */}
            <motion.div
              className="relative lg:sticky lg:top-32 order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Giant 100% Watermark */}
              <div className="relative">
                <div className="text-center mb-12 lg:mb-16">
                  <div 
                    className="text-[80px] sm:text-[120px] lg:text-[160px] font-bold leading-none text-primary-200/40 select-none"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {t('guarantee.watermark')}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-primary-500 uppercase tracking-widest -mt-4 lg:-mt-8">
                    {t('guarantee.watermarkSubtitle')}
                  </div>
                </div>

                {/* Payment Logos */}
                <div className="space-y-4 lg:space-y-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-500 text-center">
                    {t('guarantee.paymentSecurityLabel')}
                  </p>
                  
                  <div className="flex flex-col items-center gap-3 lg:gap-4">
                    {/* Stripe */}
                    <div className="flex items-center justify-center h-8 lg:h-10">
                      <span className="text-2xl lg:text-3xl font-extrabold text-primary-800" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>stripe</span>
                    </div>
                    
                    <div className="w-12 lg:w-16 h-px bg-primary-200"></div>
                    
                    {/* Digital Wallets */}
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className="text-base lg:text-lg font-bold text-primary-700">Apple Pay</span>
                      <span className="text-base lg:text-lg font-bold text-primary-700">Google Pay</span>
                    </div>
                    
                    <div className="w-12 lg:w-16 h-px bg-primary-200"></div>
                    
                    {/* Cards */}
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className="text-lg lg:text-xl font-black text-primary-700">VISA</span>
                      <span className="text-base lg:text-lg font-extrabold text-primary-700">Mastercard</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Guarantee
