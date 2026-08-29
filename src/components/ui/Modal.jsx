import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal