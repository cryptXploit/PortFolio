import { useSkills } from '../../hooks/useSkills'
import { useProfile } from '../../hooks/useProfile'
import AnimatedSection from '../ui/AnimatedSection'
import AnimatedText from '../ui/AnimatedText'
import * as Icons from 'react-icons/fa'
import { Cpu, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const Skills = () => {
  const { data: skills, isLoading, error } = useSkills()
  const { data: profile } = useProfile()
  const sectionAnim = profile?.textAnimations?.sectionHeading || { animation: 'slide', duration: 0.6, zoom: 1 }

  if (isLoading) return (
    <div className="py-32 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#03060f]">
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-cyber-neon" 
          animate={{ x: ["-100%", "100%"] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
      <p className="mt-4 font-mono text-cyber-neon animate-pulse text-sm">SCANNING_SKILL_NODES...</p>
    </div>
  )
  
  if (error) return <div className="text-center py-20 text-red-500 font-mono">ERROR: SKILL_MODULE_OFFLINE</div>

  const groupedSkills = skills?.reduce((acc, skill) => {
    const cat = skill.category || 'Core Systems'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-24 relative bg-gray-50 dark:bg-[#02040a] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyber-matrix/10"></div>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-16">
            <Cpu className="text-cyber-neon hidden md:block animate-pulse" size={40} />
            <AnimatedText
              text="Neural_Skill_Nodes"
              settings={sectionAnim}
              tag="h2"
              className="text-3xl md:text-5xl font-bold font-mono text-center text-gray-900 dark:text-white uppercase tracking-tighter"
            />
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <AnimatedSection key={category} delay={idx * 0.1}>
              <div className="bg-white/5 dark:bg-cyber-dark/40 backdrop-blur-xl border border-gray-200 dark:border-cyber-matrix/20 rounded-2xl p-6 h-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-8 border-b border-gray-300 dark:border-cyber-matrix/30 pb-3">
                  <div className="w-3 h-3 bg-cyber-neon rounded-sm animate-pulse"></div>
                  <h3 className="text-xl font-bold font-mono text-gray-800 dark:text-cyber-matrix uppercase tracking-widest">{category}</h3>
                </div>
                
                {/* Skills List */}
                <div className="flex flex-col gap-6">
                  {items.map((skill, i) => {
                    const IconComponent = Icons[skill.icon] || Icons.FaCode
                    return (
                      <div key={skill.id} className="group relative">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 dark:bg-black/50 rounded-lg border border-gray-200 dark:border-cyber-neon/30 text-indigo-500 dark:text-cyber-neon group-hover:shadow-[0_0_10px_rgba(0,242,254,0.5)] transition-all">
                              <IconComponent className="text-xl" />
                            </div>
                            <h3 className="font-medium text-gray-800 dark:text-gray-200 font-sans tracking-wide">{skill.name}</h3>
                          </div>
                          <span className="text-xs font-mono text-cyber-neon bg-cyber-neon/10 px-2 py-1 rounded">LVL_{skill.level}</span>
                        </div>
                        
                        {/* Futuristic Power Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-900 rounded-full h-1.5 overflow-hidden flex">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level * 20}%` }}
                            transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                            className="bg-indigo-500 dark:bg-gradient-to-r dark:from-cyber-matrix dark:to-cyber-neon h-full rounded-full relative"
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[1px]"></div>
                          </motion.div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills