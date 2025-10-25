import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    let rafId: number
    
    const updateMousePosition = (e: MouseEvent) => {
      // Throttle usando requestAnimationFrame para melhor performance
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        
        const target = e.target as HTMLElement
        setIsPointer(
          window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON'
        )
        
        rafId = 0
      })
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-earth-700 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          mass: 0.5
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-earth-600/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
          mass: 0.8
        }}
      />
    </>
  )
}

export default CursorTrail
