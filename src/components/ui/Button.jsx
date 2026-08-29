import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 focus:ring-indigo-500',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button