import { useProfile } from '../../hooks/useProfile'
import * as Icons from 'react-icons/fa'
import { ShieldCheck } from 'lucide-react'

const Footer = () => {
  const { data: profile } = useProfile()
  const socialLinks = profile?.socialLinks || []
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-[#010205] border-t border-gray-300 dark:border-cyber-matrix/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 text-cyber-neon font-mono font-bold text-lg mb-2">
              <ShieldCheck size={20} /> OMAR_SUNNY
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-mono text-xs tracking-widest">
              © {currentYear} SYSTEM_ADMIN. ALL_RIGHTS_RESERVED.
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0">
            {socialLinks.map((link, idx) => {
              const IconComponent = Icons[link.icon]
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-10 flex items-center justify-center bg-gray-200 dark:bg-black border border-gray-300 dark:border-cyber-matrix/30 text-gray-600 dark:text-cyber-matrix hover:text-white hover:bg-indigo-600 dark:hover:bg-cyber-neon dark:hover:text-black dark:hover:border-cyber-neon rounded transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:-translate-y-1 group ${IconComponent ? 'w-10' : 'px-4'}`}
                >
                  {IconComponent ? <IconComponent size={18} className="group-hover:scale-110 transition-transform" /> : <span className="font-mono text-xs tracking-wider uppercase">{link.platform}</span>}
                </a>
              )
            })}
          </div>
          
        </div>
      </div>
      
      <div className="w-full text-center py-2 bg-gray-200 dark:bg-black text-[10px] text-gray-500 font-mono border-t border-gray-300 dark:border-cyber-matrix/20">
        CONNECTION_SECURE // AES-256 ENCRYPTED
      </div>
    </footer>
  )
}

export default Footer