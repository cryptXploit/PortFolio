import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Github, Globe, TerminalSquare, Server, CheckCircle2, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProjectBySlug } from '../hooks/useProjects'
import AnimatedSection from '../components/ui/AnimatedSection'
import MediaCarousel from '../components/ui/MediaCarousel'

const ProjectDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: project, isLoading, error } = useProjectBySlug(slug)

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-2 border-cyber-neon rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-cyber-matrix rounded-full animate-[spin_2s_reverse_infinite]"></div>
          <div className="absolute inset-4 border-b-2 border-purple-500 rounded-full animate-[spin_3s_infinite]"></div>
          <ShieldAlert className="absolute inset-0 m-auto text-cyber-neon animate-pulse" size={24} />
        </div>
        <p className="mt-6 text-cyber-matrix font-mono tracking-widest animate-pulse">DECRYPTING_DATA...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center font-mono">
        <h2 className="text-4xl text-red-500 mb-4 font-bold flex items-center gap-2">
          <ShieldAlert size={40} /> ACCESS_DENIED
        </h2>
        <p className="text-gray-400 mb-8">The requested project data could not be located in the database.</p>
        <button onClick={() => navigate('/')} className="text-cyber-neon border border-cyber-neon px-6 py-2 hover:bg-cyber-neon/10 transition-colors rounded">
          INITIATE_RETURN
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#02040a] relative overflow-hidden pt-24 pb-12">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyber-neon/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-cyber-matrix/20 pb-4"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-cyber-matrix hover:text-indigo-600 dark:hover:text-cyber-neon transition-colors font-mono text-sm uppercase tracking-wider group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            ./cd_root
          </button>
          
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM_ONLINE
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-1 space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-cyber-neon font-mono text-sm mb-2">
                  <TerminalSquare size={16} /> PROJECT_TITLE
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
                  {project.title}
                </h1>
                
                <div className="flex items-center gap-2 text-cyber-matrix font-mono text-sm mb-3">
                  <Server size={16} /> TECH_STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="bg-gray-200 dark:bg-cyber-matrix/10 border border-gray-300 dark:border-cyber-matrix text-gray-800 dark:text-cyber-matrix px-3 py-1 rounded text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Links Section */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 rounded-xl p-6 shadow-xl flex flex-col gap-4">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-indigo-600 dark:bg-cyber-neon text-white dark:text-black font-bold font-mono px-4 py-3 rounded hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                  >
                    <span className="flex items-center gap-2"><Globe size={18} /> INITIALIZE_LIVE_PREVIEW</span>
                    <ArrowLeft size={16} className="rotate-135" />
                  </a>
                )}
                
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full border border-gray-400 dark:border-cyber-matrix text-gray-800 dark:text-cyber-matrix font-bold font-mono px-4 py-3 rounded hover:bg-gray-100 dark:hover:bg-cyber-matrix/10 transition-colors"
                  >
                    <span className="flex items-center gap-2"><Github size={18} /> EXTRACT_SOURCE_CODE</span>
                    <ArrowLeft size={16} className="rotate-135" />
                  </a>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Media and Description */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection delay={0.3}>
              <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 rounded-xl p-2 shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-neon to-transparent opacity-50"></div>
                <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 relative bg-black">
                   {/* Terminal Header for Image */}
                   <div className="absolute top-0 left-0 w-full h-8 bg-black/60 backdrop-blur-sm border-b border-white/10 z-20 flex items-center px-4 gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                     <span className="text-[10px] font-mono text-gray-400 ml-2">visual_data_render.exe</span>
                   </div>
                   <div className="pt-8">
                     <MediaCarousel
                       mediaUrls={project.media_urls}
                       mediaTypes={project.media_type}
                       duration={project.carousel_duration || 3}
                       animation={project.carousel_animation || 'fade'}
                       autoPlay={true}
                     />
                   </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 rounded-xl p-8 shadow-xl">
                <div className="flex items-center gap-2 text-cyber-neon font-mono text-sm mb-6 border-b border-gray-200 dark:border-cyber-matrix/20 pb-2">
                  <CheckCircle2 size={16} /> MISSION_BRIEFING // SYSTEM_OVERVIEW
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-800 dark:text-gray-300 leading-relaxed font-sans text-lg">
                    {project.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetail