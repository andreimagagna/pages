import { motion } from 'framer-motion'
import { TrendingUp, Award, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedCounter from './AnimatedCounter'

const Stats = () => {
  const { t } = useTranslation()
  
  const stats = [
    { icon: TrendingUp, key: 'projects' },
    { icon: Award, key: 'satisfaction' },
    { icon: Clock, key: 'delivery' }
  ]
  
  return (
    <section className="section bg-white">
      <div className="container-tight">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-br from-white via-earth-50/30 to-warm-50/30 rounded-3xl shadow-elegant border border-earth-200 p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              const data = t(`stats.${stat.key}`, { returnObjects: true }) as { value: string; suffix: string; label: string; sublabel: string }
              
              return (
                <motion.div 
                  key={idx}
                  className="text-center group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-earth-600 to-earth-700 shadow-lg mb-4 group-hover:shadow-xl group-hover:scale-110 transition-all"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-5xl font-bold text-earth-900 mb-2 font-[Sora]">
                    <AnimatedCounter end={parseInt(data.value)} suffix={data.suffix} />
                  </div>
                  <div className="text-primary-600 font-medium">{data.label}</div>
                  <div className="text-sm text-primary-500 mt-1">{data.sublabel}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
