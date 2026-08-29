import { motion } from 'framer-motion'
import { Quote, User } from 'lucide-react'
import { useTestimonials } from '../../hooks/useTestimonials'
import { useProfile } from '../../hooks/useProfile'
import AnimatedSection from '../ui/AnimatedSection'
import AnimatedText from '../ui/AnimatedText'

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useTestimonials()
  const { data: profile } = useProfile()
  const sectionAnim = profile?.textAnimations?.sectionHeading || { animation: 'slide', duration: 0.6, zoom: 1 }

  if (isLoading) return (
    <div className="py-24 flex flex-col items-center justify-center bg-[#02040a]">
      <div className="flex gap-1 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-8 bg-cyber-matrix"
            animate={{ height: ["32px", "10px", "32px"] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
          />
        ))}
      </div>
      <p className="font-mono text-cyber-neon animate-pulse text-sm">DECRYPTING_CLIENT_COMMUNICATIONS...</p>
    </div>
  )
  
  if (error) return <div className="text-center py-20 text-red-500 font-mono">ERROR: FEEDBACK_MODULE_CORRUPTED</div>
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-24 relative bg-[#02040a] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-cyber-matrix/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-16">
            <Quote className="text-cyber-neon hidden md:block" size={36} />
            <AnimatedText
              text="Client_Feedback_Logs"
              settings={sectionAnim}
              tag="h2"
              className="text-4xl md:text-5xl font-bold font-mono text-center text-white uppercase tracking-tighter"
            />
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }} 
                transition={{ type: 'spring', stiffness: 300 }} 
                className="group relative bg-white/5 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 p-8 rounded-2xl h-full flex flex-col shadow-lg hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all"
              >
                {/* Decorative Cyber Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neon/50 rounded-tl-xl"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-neon/50 rounded-br-xl"></div>

                <Quote className="text-cyber-matrix/20 absolute top-6 right-6" size={60} />
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 relative z-10 font-sans leading-relaxed flex-grow italic">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-cyber-matrix/20 pt-6 mt-auto">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon to-cyber-matrix rounded-full blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-cyber-matrix relative z-10 bg-black" />
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-cyber-matrix relative z-10 bg-black flex items-center justify-center text-cyber-neon">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white tracking-wide">{t.name}</h4>
                    <p className="text-xs font-mono text-cyber-matrix">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials