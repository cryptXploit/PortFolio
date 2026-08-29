import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { X, Moon, Sun, Shield, AlignRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')
    }
    return true
  })
  const location = useLocation()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Contact', path: '/#contact' },
  ]

  const navigate = useNavigate()

  const handleNavClick = (e, path) => {
    e.preventDefault()
    
    if (path.includes('#')) {
      const hash = path.split('#')[1]
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for the homepage to render before scrolling
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 150)
      } else {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      navigate(path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    setIsOpen(false)
  }

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* Floating Glassmorphism Pill */}
        <div className="w-full max-w-5xl bg-white/60 dark:bg-cyber-dark/60 backdrop-blur-2xl border border-white/20 dark:border-gray-700/50 shadow-lg rounded-full px-6 py-3 flex justify-between items-center pointer-events-auto transition-colors duration-300">
          <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold font-mono text-gray-900 dark:text-white group">
            <Shield className="text-indigo-600 dark:text-cyber-neon group-hover:scale-110 transition-transform" strokeWidth={1.5} size={24} />
            <span className="tracking-tight">O<span className="text-indigo-600 dark:text-cyber-neon">S</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="font-mono text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-cyber-neon transition-all hover:-translate-y-0.5"
              >
                <span className="text-indigo-400 dark:text-cyber-matrix mr-1 opacity-50">/</span>
                {item.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-cyber-neon hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
            >
              {darkMode ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Mobile Menu Button - Sleek Icon */}
          <button
            className="md:hidden p-2 text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-cyber-neon transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <AlignRight strokeWidth={1.5} size={26} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu (Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-white/80 dark:bg-cyber-dark/90 md:hidden flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:rotate-90 transition-transform duration-300"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col space-y-8 text-center w-full px-8">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="text-4xl font-mono font-bold text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-cyber-neon relative group"
                >
                  <span className="absolute -left-8 top-2 text-sm text-indigo-400 dark:text-cyber-matrix opacity-0 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  {item.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8 flex justify-center"
              >
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-3 text-lg font-mono text-gray-800 dark:text-gray-200 bg-gray-200/50 dark:bg-gray-800/80 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 shadow-lg"
                >
                  {darkMode ? <Sun className="text-cyber-neon" size={20} /> : <Moon size={20} />}
                  <span>{darkMode ? 'Light Mode' : 'Cyber Mode'}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header