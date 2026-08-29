import { useAbout } from '../hooks/useProfile'
import AnimatedSection from '../components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Award, Terminal, ShieldAlert, Cpu } from 'lucide-react'

const About = () => {
  const { data: about, isLoading, error } = useAbout()

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] bg-[#02040a]">
      <div className="w-16 h-16 border-4 border-cyber-neon border-dashed rounded-full animate-[spin_3s_linear_infinite]"></div>
      <p className="mt-4 font-mono text-cyber-neon animate-pulse tracking-widest text-sm">EXTRACTING_PROFILE_DATA...</p>
    </div>
  )
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center font-mono bg-[#02040a]">
      <ShieldAlert size={40} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-red-500 mb-2">ERROR_500: PROFILE_DATA_CORRUPTED</h2>
      <p className="text-gray-400">Failed to establish a secure connection to the central database.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#02040a] relative overflow-hidden pt-24 pb-12">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyber-matrix/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:max-w-5xl relative z-10">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="inline-flex items-center gap-3 bg-cyber-neon/10 border border-cyber-neon/30 px-6 py-2 rounded-full mb-6">
              <Cpu className="text-cyber-neon animate-pulse" size={20} />
              <span className="text-cyber-neon font-mono tracking-widest text-sm">SYSTEM_ADMIN_PROFILE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-center text-gray-900 dark:text-white uppercase tracking-tighter">
              Classified_Dossier
            </h1>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Timeline Column */}
          <div className="md:col-span-8 space-y-12">
            
            {/* Experience Node */}
            {about?.experience?.length > 0 && (
              <AnimatedSection delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="text-cyber-matrix" size={24} />
                  <h2 className="text-2xl font-bold font-mono text-gray-800 dark:text-cyber-matrix uppercase">Experience_Logs</h2>
                </div>
                <div className="relative border-l-2 border-gray-200 dark:border-cyber-matrix/30 ml-3 pl-8 space-y-8">
                  {about.experience.map((exp, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 5 }} 
                      className="relative bg-white/5 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 p-6 rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all group"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute -left-[41px] top-6 w-5 h-5 bg-gray-50 dark:bg-[#02040a] border-2 border-gray-300 dark:border-cyber-matrix rounded-full group-hover:bg-cyber-matrix group-hover:shadow-[0_0_10px_rgba(0,255,65,0.8)] transition-all"></div>
                      
                      <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white">{exp.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2 mb-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                        <span className="text-indigo-600 dark:text-cyber-neon">@ {exp.company}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                        <span>{exp.year}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* Education Node */}
            {about?.education?.length > 0 && (
              <AnimatedSection delay={0.2}>
                <div className="flex items-center gap-3 mb-6 mt-16">
                  <GraduationCap className="text-indigo-500 dark:text-cyber-neon" size={28} />
                  <h2 className="text-2xl font-bold font-mono text-gray-800 dark:text-cyber-neon uppercase">Training_Data</h2>
                </div>
                <div className="relative border-l-2 border-gray-200 dark:border-cyber-neon/30 ml-3 pl-8 space-y-8">
                  {about.education.map((edu, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 5 }} 
                      className="relative bg-white/5 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-neon/30 p-6 rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all group"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute -left-[41px] top-6 w-5 h-5 bg-gray-50 dark:bg-[#02040a] border-2 border-gray-300 dark:border-cyber-neon rounded-full group-hover:bg-cyber-neon group-hover:shadow-[0_0_10px_rgba(0,242,254,0.8)] transition-all"></div>
                      
                      <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white">{edu.degree}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2 mb-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                        <span className="text-indigo-600 dark:text-cyber-matrix">@ {edu.institution}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                        <span>{edu.year}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans">{edu.description}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            )}

          </div>

          {/* Right Sidebar Column */}
          <div className="md:col-span-4 space-y-8 mt-12 md:mt-0">
            
            {/* Certifications Box */}
            {about?.certifications?.length > 0 && (
              <AnimatedSection delay={0.3}>
                <div className="bg-white/5 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-cyber-matrix/10 rounded-bl-lg">
                    <Award size={20} className="text-cyber-matrix" />
                  </div>
                  <h2 className="text-lg font-bold font-mono text-gray-800 dark:text-cyber-matrix uppercase mb-6 border-b border-gray-200 dark:border-cyber-matrix/20 pb-2">Verified_Modules</h2>
                  <div className="space-y-4">
                    {about.certifications.map((cert, idx) => (
                      <motion.div key={idx} whileHover={{ scale: 1.02 }} className="group">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm font-sans mb-1">{cert.name}</h3>
                        <p className="text-xs font-mono text-gray-500 mb-2">{cert.issuer} // {cert.year}</p>
                        {cert.link && (
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-indigo-600 dark:text-cyber-neon group-hover:underline flex items-center gap-1">
                            &gt; VALIDATE_CERT
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Additional Info Box */}
            {about?.additional && (
              <AnimatedSection delay={0.4}>
                <div className="bg-indigo-50 dark:bg-cyber-neon/5 border border-indigo-200 dark:border-cyber-neon/30 rounded-2xl p-6 shadow-xl">
                  <h2 className="text-lg font-bold font-mono text-indigo-800 dark:text-cyber-neon uppercase mb-4 flex items-center gap-2 border-b border-indigo-200 dark:border-cyber-neon/20 pb-2">
                    <Terminal size={18} /> Additional_Data
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-sans">
                    {about.additional}
                  </p>
                </div>
              </AnimatedSection>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default About