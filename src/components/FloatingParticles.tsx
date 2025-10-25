import { motion } from 'framer-motion'

const FloatingParticles = () => {
  // Reduzido de 12 para 6 partículas para melhor performance
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 25, // Animações mais lentas = menos cálculos
    delay: Math.random() * 10
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-earth-400 to-earth-600"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -80, 0], // Movimento reduzido
            opacity: [0, 0.6, 0], // Opacidade reduzida
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear" // Linear é mais performático que easeInOut
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
