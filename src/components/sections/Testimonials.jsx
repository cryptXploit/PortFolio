import { motion } from 'framer-motion'
import { Quote, User, Star, BadgeCheck } from 'lucide-react'
import { useTestimonials } from '../../hooks/useTestimonials'
import { useProfile } from '../../hooks/useProfile'
import AnimatedSection from '../ui/AnimatedSection'
import AnimatedText from '../ui/AnimatedText'

const renderStars = (ratingStr) => {
  if (ratingStr === '5-Star') {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />)}
      </div>
    )
  }
  if (ratingStr === '4-Star') {
    return (
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />)}
        <Star size={14} className="text-gray-400 dark:text-gray-600" />
      </div>
    )
  }
  return <span className="text-yellow-500">{ratingStr}</span>
}

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useTestimonials()
  const { data: profile } = useProfile()
  const sectionAnim = profile?.textAnimations?.sectionHeading || { animation: 'slide', duration: 0.6, zoom: 1 }

  if (isLoading) return (
    <div className="py-24 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#02040a]">
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
    <section className="py-24 relative bg-gray-50 dark:bg-[#02040a] overflow-hidden">
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
              className="text-3xl md:text-5xl font-bold font-mono text-center text-gray-900 dark:text-white uppercase tracking-tighter"
            />
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }} 
                transition={{ type: 'spring', stiffness: 300 }} 
                className="group relative bg-white dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 p-8 rounded-2xl h-full flex flex-col shadow-lg hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all"
              >
                {/* Decorative Cyber Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neon/50 rounded-tl-xl"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-neon/50 rounded-br-xl"></div>

                <Quote className="text-gray-200 dark:text-cyber-matrix/20 absolute top-6 right-6" size={60} />
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 relative z-10 font-sans leading-relaxed flex-grow italic">
                  "{t.content}"
                </p>

                {/* Optional Trust Metrics */}
                {(t.resolution_text || t.impact_metrics || t.rating) && (
                  <div className="mb-6 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-cyber-matrix/20 rounded-lg p-4 font-mono text-xs space-y-2">
                    {t.rating && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">GRADE:</span>
                        {renderStars(t.rating)}
                      </div>
                    )}
                    {t.impact_metrics && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">IMPACT:</span>
                        <span className="text-indigo-600 dark:text-cyber-neon font-bold">{t.impact_metrics}</span>
                      </div>
                    )}
                    {t.resolution_text && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-cyber-matrix/20 text-green-600 dark:text-green-400">
                        <span className="text-gray-500 block mb-1">SYS_RESOLUTION_LOG:</span>
                        <span className="leading-relaxed whitespace-pre-wrap">{t.resolution_text}</span>
                        {t.timeline_date && <span className="block mt-1 text-gray-500">DATE: {t.timeline_date}</span>}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-cyber-matrix/20 pt-6 mt-auto">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 dark:from-cyber-neon to-purple-500 dark:to-cyber-matrix rounded-full blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-indigo-200 dark:border-cyber-matrix relative z-10 bg-white dark:bg-black" />
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-cyber-matrix relative z-10 bg-gray-100 dark:bg-black flex items-center justify-center text-indigo-500 dark:text-cyber-neon">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white tracking-wide flex items-center gap-1">
                      {t.name}
                      {t.is_verified && (
                        <BadgeCheck size={18} className="text-blue-500 fill-white dark:fill-[#02040a]" title="Verified Client" />
                      )}
                    </h4>
                    <p className="text-xs font-mono text-indigo-600 dark:text-cyber-matrix">
                      {t.role} 
                      {t.project_reference && <span className="text-gray-500 ml-1">| {t.project_reference}</span>}
                    </p>
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