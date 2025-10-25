import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PulseBadgeProps {
  children: ReactNode
  color?: 'earth' | 'primary' | 'green' | 'red'
  className?: string
}

const PulseBadge = ({ children, color = 'earth', className = '' }: PulseBadgeProps) => {
  const colors = {
    earth: {
      bg: 'bg-earth-700',
      text: 'text-white'
    },
    primary: {
      bg: 'bg-primary-700',
      text: 'text-white'
    },
    green: {
      bg: 'bg-green-600',
      text: 'text-white'
    },
    red: {
      bg: 'bg-red-600',
      text: 'text-white'
    }
  }

  const selectedColor = colors[color]

  return (
    <motion.div
      className={`inline-flex ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      <div className={`${selectedColor.bg} ${selectedColor.text} px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg`}>
        {children}
      </div>
    </motion.div>
  )
}

export default PulseBadge
