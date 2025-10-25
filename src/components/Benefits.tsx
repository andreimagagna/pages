import { motion } from 'framer-motion'
import { CheckCircle2, Zap, LineChart, Users, Clock, Shield } from 'lucide-react'

const Benefits = () => {
  const benefits = [
    {
      Icon: Zap,
      title: 'Performance otimizada',
      description: 'Páginas que carregam em menos de 1 segundo. Velocidade é conversão.'
    },
    {
      Icon: LineChart,
      title: 'Copywriting estratégico',
      description: 'Estrutura persuasiva que conecta, engaja e converte seu público ideal.'
    },
    {
      Icon: Users,
      title: 'Mobile-first',
      description: 'Experiência perfeita em qualquer dispositivo. Seus clientes estão no celular.'
    },
    {
      Icon: Clock,
      title: 'Entrega rápida',
      description: '5 dias para sua página estar no ar. Sem espera, sem perda de tempo.'
    },
    {
      Icon: Shield,
      title: 'Garantia de satisfação',
      description: 'Se não aumentar suas conversões, você recebe seu dinheiro de volta.'
    },
    {
      Icon: CheckCircle2,
      title: 'Suporte dedicado',
      description: 'Acompanhamento pós-entrega para garantir que tudo funcione perfeitamente.'
    }
  ]

  return (
    <section className="section bg-white">
      <div className="container-tight">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="h2 mb-6">Tudo que você precisa para vender mais.</h2>
          <p className="p text-xl">
            Cada detalhe pensado para maximizar suas conversões e resultados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className="card p-8 hover:shadow-elegant transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-12 h-12 rounded-lg bg-earth-100 flex items-center justify-center mb-5">
                <benefit.Icon className="w-6 h-6 text-earth-700" />
              </div>
              <h3 className="h3 mb-3 text-lg">{benefit.title}</h3>
              <p className="text-primary-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
