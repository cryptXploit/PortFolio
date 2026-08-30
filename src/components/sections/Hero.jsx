import { motion } from 'framer-motion'
import { ArrowDown, Terminal, ShieldAlert } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import AnimatedProfilePicture from '../ui/AnimatedProfilePicture'
import AnimatedCover from '../ui/AnimatedCover'
import AnimatedText from '../ui/AnimatedText'

const Hero = () => {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-dark">
      <div className="w-16 h-16 border-4 border-cyber-neon border-t-transparent rounded-full animate-spin"></div>
      <p className="text-cyber-matrix mt-4 font-mono animate-pulse">SYSTEM_LOADING...</p>
    </div>
  )

  // Profile pictures and settings
  const profilePictures = profile?.profilePictures || []
  const profileAnimationSettings = profile?.profileAnimation || { type: 'fade', duration: 3, delay: 0 }
  const profileZoom = profile?.profileZoom || 1

  // Cover pictures and settings
  let coverPictures = profile?.coverPictures || []
  if (coverPictures.length === 0 && profile?.coverPicture) {
    coverPictures = [{ url: profile.coverPicture, id: 'legacy' }]
  }
  const coverAnimationSettings = profile?.coverAnimation || { type: 'fade', duration: 3, delay: 0 }
  const coverZoom = profile?.coverZoom || 1

  // Text animation settings
  const nameAnim = profile?.textAnimations?.name || { animation: 'fade', duration: 0.6, zoom: 1 }
  const roleAnim = profile?.textAnimations?.role || { animation: 'slide', duration: 0.6, zoom: 1, rotationDuration: 3, texts: ['AI Integrator', 'Security Analyst', 'RAG Developer'] }
  const bioAnim = profile?.textAnimations?.bio || { animation: 'fade', duration: 0.6, zoom: 1 }

  const roleTexts = roleAnim.texts?.length ? roleAnim.texts : ['AI Integrator', 'Security Analyst', 'RAG Developer']

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-cyber-dark overflow-hidden z-10 pt-24 md:pt-32">
      {/* Background Grid & Gradient for Cyber Vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyber-neon opacity-20 blur-[100px] animate-pulse-slow"></div>
      
      {/* Background Cover */}
      <AnimatedCover
        pictures={coverPictures}
        settings={{ ...coverAnimationSettings, zoom: coverZoom }}
        overlay={true}
      />
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 pointer-events-none z-10"></div>

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-6 text-center pointer-events-auto flex flex-col items-center">
        
        {/* Glowing Profile Picture */}
        <motion.div 
          className="mb-8 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon to-cyber-matrix rounded-full blur opacity-40 animate-glow"></div>
          <div className="relative rounded-full border-2 border-cyber-neon/50 p-1 bg-cyber-dark">
            <AnimatedProfilePicture
              pictures={profilePictures}
              settings={{ ...profileAnimationSettings, zoom: profileZoom }}
            />
          </div>
        </motion.div>

        {/* Name with Tech Font */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <AnimatedText
            text={profile?.name || 'OMAR SUNNY'}
            settings={nameAnim}
            tag="h1"
            className="text-5xl md:text-7xl font-bold mb-4 text-gray-900 dark:text-white font-sans tracking-tight drop-shadow-lg"
          />
        </motion.div>

        {/* Rotating role with terminal styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="flex items-center gap-3 bg-gray-900/80 dark:bg-black/50 backdrop-blur-sm border border-cyber-neon/30 px-6 py-2 rounded-lg">
            <Terminal className="text-cyber-matrix" size={20} />
            <AnimatedText
              text={roleTexts}
              settings={roleAnim}
              tag="p"
              className="text-xl md:text-2xl text-cyber-neon font-mono"
              containerClassName="h-8 md:h-8 flex items-center" 
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="relative max-w-3xl mx-auto mb-10 group cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 dark:from-cyber-neon/0 dark:via-cyber-neon/10 dark:to-cyber-matrix/0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative bg-white/40 dark:bg-[#050914]/60 backdrop-blur-md border border-gray-200/80 dark:border-cyber-neon/30 px-6 py-4 md:px-10 md:py-6 rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(0,242,254,0.15)] transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-500 dark:border-cyber-neon rounded-tl-2xl opacity-50 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-500 dark:border-cyber-neon rounded-br-2xl opacity-50 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
            
            <AnimatedText
              text={profile?.bio || 'Building secure AI systems and robust web architectures.'}
              settings={bioAnim}
              tag="p"
              className="text-lg md:text-xl text-gray-900 dark:text-gray-100 font-sans leading-relaxed tracking-wide relative z-10"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-cyber-neon text-white dark:text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,242,254,0.4)]"
          >
            Access Terminal <ArrowDown size={20} />
          </a>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-gray-600 dark:border-cyber-matrix text-gray-900 dark:text-cyber-matrix font-bold px-8 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-cyber-matrix/10 transition-colors"
          >
            <ShieldAlert size={20} /> Secure Comm
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero