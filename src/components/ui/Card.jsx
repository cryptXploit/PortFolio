import { motion } from 'framer-motion'

const Card = ({ children, className = '', index = 0, ...props }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`bg-white/5 dark:bg-cyber-dark/40 backdrop-blur-lg border border-gray-200 dark:border-cyber-matrix/30 rounded-2xl shadow-xl overflow-hidden group hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card