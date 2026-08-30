import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, FolderGit2, Cpu, ShieldCheck } from 'lucide-react'
import { useProjects } from '../../hooks/useProjects'
import { useProfile } from '../../hooks/useProfile'
import AnimatedSection from '../ui/AnimatedSection'
import Card from '../ui/Card'
import MediaCarousel from '../ui/MediaCarousel'
import AnimatedText from '../ui/AnimatedText'

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects()
  const { data: profile } = useProfile()
  const [filter, setFilter] = useState('all')
  const [activeVideo, setActiveVideo] = useState(null)
  const navigate = useNavigate()

  const sectionAnim = profile?.textAnimations?.sectionHeading || { animation: 'slide', duration: 0.6, zoom: 1 }

  if (isLoading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center bg-gray-50 dark:bg-cyber-dark">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-10 bg-cyber-matrix"
              animate={{ scaleY: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>
        <p className="mt-4 font-mono text-cyber-neon animate-pulse">FETCHING_PROJECT_DATA...</p>
      </div>
    )
  }
  if (error) return <div className="text-center py-20 text-red-500 font-mono">ERROR: SYSTEM_FAILURE_LOADING_PROJECTS</div>

  const allTechs = projects?.flatMap(p => p.technologies) || []
  // Get unique techs and sort by frequency or just alphabetically. Let's just keep it unique.
  const uniqueTechs = ['all', ...new Set(allTechs)]

  const filteredProjects = filter === 'all'
    ? projects
    : projects?.filter(p => p.technologies.includes(filter))

  return (
    <section id="projects" className="py-24 relative bg-gray-50 dark:bg-[#03060f] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-matrix/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyber-neon/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <FolderGit2 className="text-cyber-neon hidden md:block" size={40} />
            <AnimatedText
              text="Classified_Projects"
              settings={sectionAnim}
              tag="h2"
              className="text-4xl md:text-5xl font-bold font-mono text-center text-gray-900 dark:text-white uppercase tracking-tighter"
            />
          </div>
        </AnimatedSection>

        {/* Console Style Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {uniqueTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-6 py-2 rounded-md font-mono text-sm capitalize transition-all duration-300 border ${
                filter === tech
                  ? 'bg-cyber-matrix/20 text-cyber-matrix border-cyber-matrix shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                  : 'bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-800 hover:border-cyber-neon/50 hover:text-cyber-neon'
              }`}
            >
              {tech === 'all' ? './execute_all' : tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredProjects?.map((project, idx) => (
              <Card 
                key={project.id} 
                index={idx} 
                className="group flex flex-col h-full border-t-4 border-t-cyber-matrix cursor-pointer"
                onMouseEnter={() => setActiveVideo(project.id)}
                onClick={() => navigate(`/project/${project.slug}`)}
              >
                <div className="flex flex-col h-full">
                  
                  {/* Media Container with Overlay */}
                  <div className="relative overflow-hidden aspect-video">
                    <div className="absolute inset-0 bg-cyber-dark/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                    <MediaCarousel
                      mediaUrls={project.media_urls}
                      mediaTypes={project.media_type}
                      duration={project.carousel_duration || 3}
                      animation={project.carousel_animation || 'fade'}
                      autoPlay={true}
                      autoPlayVideo={activeVideo === project.id || (activeVideo === null && idx === 0)}
                    />
                    {/* Top right badge */}
                    <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md border border-cyber-matrix/50 px-2 py-1 rounded flex items-center gap-1 text-xs text-cyber-matrix font-mono">
                      <ShieldCheck size={12} /> SECURE
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold font-sans mb-3 text-gray-900 dark:text-white group-hover:text-cyber-neon transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Cpu size={16} className="text-cyber-neon self-center" />
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="text-xs bg-gray-200 dark:bg-black/50 border border-gray-300 dark:border-cyber-neon/30 text-gray-800 dark:text-cyber-neon px-2 py-1 rounded font-mono">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs text-gray-500 font-mono self-center">+{project.technologies.length - 4} more</span>
                      )}
                    </div>
                    
                    {/* Footer Links */}
                    <div className="flex gap-4 text-sm mt-auto border-t border-gray-200 dark:border-gray-800 pt-4">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 dark:text-cyber-matrix hover:text-cyber-neon transition-colors font-mono font-bold" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink size={16} /> LIVE_DEMO
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-white transition-colors font-mono" onClick={(e) => e.stopPropagation()}>
                          <Github size={16} /> SOURCE_CODE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects