import { motion } from 'framer-motion'

const logos = [
  'Starbucks',
  'Netflix', 
  'Natura',
  'BMW',
  'Samsung',
  'Mercedes',
  'Nubank'
]

const SocialProof = () => {
  return (
    <section className="py-12 bg-white border-y border-primary-100">
      <div className="overflow-hidden">
        <div className="flex gap-16">
          <motion.div
            className="flex gap-16 items-center flex-shrink-0"
            animate={{
              x: [0, -1260],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ willChange: 'transform' }}
          >
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 grayscale opacity-30 hover:opacity-50 hover:grayscale-0 transition-all duration-500 px-4"
              >
                <span className="font-[Sora] font-bold text-3xl text-primary-900 whitespace-nowrap select-none">
                  {logo}
                </span>
              </div>
            ))}
          </motion.div>
          
          <motion.div
            className="flex gap-16 items-center flex-shrink-0"
            animate={{
              x: [0, -1260],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ willChange: 'transform' }}
          >
            {logos.map((logo, i) => (
              <div
                key={`duplicate-${i}`}
                className="flex-shrink-0 grayscale opacity-30 hover:opacity-50 hover:grayscale-0 transition-all duration-500 px-4"
              >
                <span className="font-[Sora] font-bold text-3xl text-primary-900 whitespace-nowrap select-none">
                  {logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
