import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const Tooltip = ({ content, children, position = 'top', delay = 200 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  let timeout: ReturnType<typeof setTimeout>

  const showTooltip = () => {
    timeout = setTimeout(() => setIsVisible(true), delay)
  }

  const hideTooltip = () => {
    clearTimeout(timeout)
    setIsVisible(false)
  }

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const animations = {
    top: { y: 10, opacity: 0 },
    bottom: { y: -10, opacity: 0 },
    left: { x: 10, opacity: 0 },
    right: { x: -10, opacity: 0 }
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute ${positions[position]} z-50 pointer-events-none`}
            initial={animations[position]}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={animations[position]}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="relative px-3 py-2 bg-primary-900 text-white text-sm rounded-lg shadow-xl whitespace-nowrap">
              {content}
              
              {/* Arrow */}
              <div 
                className={`absolute w-2 h-2 bg-primary-900 rotate-45 
                  ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
                  ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
                  ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
                  ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
                `}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip
