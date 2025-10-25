import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PulseBadge from './PulseBadge'
import { handleCheckout, getPlanKey } from '../utils/stripe'
import { useState } from 'react';

const Pricing = () => {
  const { t, i18n } = useTranslation()
  
  const currencySymbol = i18n.language === 'pt' ? 'R$' : '$'
  
  const plans = [0, 1, 2].map(i => 
    t(`pricing.plans.${i}`, { returnObjects: true }) as { 
      name: string; 
      price: string; 
      oldPrice: string;
      description: string;
      delivery: string;
      features: string[];
      cta: string;
      badge?: string;
      highlight?: boolean;
    }
  )

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    setIsLoading(true);
    try {
      // ...existing code for checkout...
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="planos" className="section bg-white">
      <div className="container-tight">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="h2 mb-6">{t('pricing.title')}</h2>
          <p className="p text-lg">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`card p-8 relative ${plan.highlight ? 'ring-2 ring-earth-600 shadow-elegant' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {plan.highlight && plan.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <PulseBadge color="earth">
                    {plan.badge}
                  </PulseBadge>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="h3 mb-2">{plan.name}</h3>
                <p className="text-base text-primary-600 mb-3">{plan.description}</p>
                <div className="inline-block bg-earth-100 text-earth-800 px-3 py-1 rounded-full text-xs font-medium">
                  {plan.delivery}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-primary-400 line-through text-lg">{currencySymbol} {plan.oldPrice}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-primary-600">{currencySymbol}</span>
                  <span className="text-5xl font-bold text-primary-900">{plan.price}</span>
                </div>
                <div className="text-sm text-primary-600 mt-1">{t('pricing.paymentLabel')}</div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.05, duration: 0.4 }}
                  >
                    <Check className="w-5 h-5 text-earth-700 flex-shrink-0 mt-0.5" />
                    <span className="text-primary-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(getPlanKey(i18n.language, i))}
                disabled={isLoading}
                className={`btn w-full inline-flex items-center justify-center ${plan.highlight ? 'btn-cta' : 'btn-secondary'}`}
              >
                {isLoading ? 'Processando...' : plan.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    setIsLoading(true);
    try {
      // ...existing code for checkout...
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="planos" className="section bg-white">
      <div className="container-tight">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="h2 mb-6">{t('pricing.title')}</h2>
          <p className="p text-lg">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`card p-8 relative ${plan.highlight ? 'ring-2 ring-earth-600 shadow-elegant' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {plan.highlight && plan.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <PulseBadge color="earth">
                    {plan.badge}
                  </PulseBadge>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="h3 mb-2">{plan.name}</h3>
                <p className="text-base text-primary-600 mb-3">{plan.description}</p>
                <div className="inline-block bg-earth-100 text-earth-800 px-3 py-1 rounded-full text-xs font-medium">
                  {plan.delivery}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-primary-400 line-through text-lg">{currencySymbol} {plan.oldPrice}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-primary-600">{currencySymbol}</span>
                  <span className="text-5xl font-bold text-primary-900">{plan.price}</span>
                </div>
                <div className="text-sm text-primary-600 mt-1">{t('pricing.paymentLabel')}</div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.05, duration: 0.4 }}
                  >
                    <Check className="w-5 h-5 text-earth-700 flex-shrink-0 mt-0.5" />
                    <span className="text-primary-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(getPlanKey(i18n.language, i))}
                disabled={isLoading}
                className={`btn w-full inline-flex items-center justify-center ${plan.highlight ? 'btn-cta' : 'btn-secondary'}`}
              >
                {isLoading ? 'Processando...' : plan.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
