import { useEffect, lazy, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LazyMotion, domAnimation, motion, useScroll, useSpring } from 'framer-motion'

// Critical components (above the fold)
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Problem from './components/Problem'

// Lazy load non-critical components (below the fold)
const Process = lazy(() => import('./components/Process'))
const Solution = lazy(() => import('./components/Solution'))
const Comparison = lazy(() => import('./components/Comparison'))
const Pricing = lazy(() => import('./components/Pricing'))
const Stats = lazy(() => import('./components/Stats'))
const Guarantee = lazy(() => import('./components/Guarantee'))
const GuaranteeFAQ = lazy(() => import('./components/GuaranteeFAQ'))
const FinalCTA = lazy(() => import('./components/FinalCTA'))

// Loading fallback component
const SectionLoader = () => (
  <div className="section flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-earth-700 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Validate and set language
  useEffect(() => {
    // Redirect if invalid language
    if (!lang || !['pt', 'en'].includes(lang)) {
      navigate('/pt', { replace: true })
      return
    }
    
    // Set language
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n, navigate])

  useEffect(() => {
    // Enhanced smooth scroll with easing
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 2rem;
      }
      * {
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }
    `
    document.head.appendChild(style)
    
    // Performance optimization: reduce motion for low-end devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
    }
    
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-earth-600 via-earth-700 to-earth-800 transform origin-left z-50 shadow-lg"
        style={{ scaleX }}
      />
      
      <div className="min-h-screen">
        <a href="#planos" className="sr-only">Ir para os planos</a>
        
        {/* Critical above-the-fold content */}
        <Hero />
        <SocialProof />
        <Problem />
        
        {/* Lazy-loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <Process />
          <Solution />
          <Comparison />
          <Pricing />
          <Stats />
          <Guarantee />
          <GuaranteeFAQ />
          <FinalCTA />
        </Suspense>
        
        <footer className="py-10 text-center text-sm text-primary-500 border-t border-primary-200 bg-white">
          <div className="container-tight">© {new Date().getFullYear()} {i18n.language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</div>
        </footer>
      </div>
    </LazyMotion>
  )
}

export default App
