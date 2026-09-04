import { useForm } from 'react-hook-form'
import { useSubmitContact } from '../../hooks/useContact'
import { useProfile } from '../../hooks/useProfile'
import { useState } from 'react'
import { Terminal, Send, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import AnimatedText from '../ui/AnimatedText'

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { mutate, isLoading, isSuccess } = useSubmitContact()
  const { data: profile } = useProfile()
  const [serverError, setServerError] = useState(null)
  const sectionAnim = profile?.textAnimations?.sectionHeading || { animation: 'slide', duration: 0.6, zoom: 1 }

  const onSubmit = (data) => {
    mutate(data, {
      onError: (err) => setServerError(err.message),
      onSuccess: () => {
        reset()
        setTimeout(() => setServerError(null), 5000)
      },
    })
  }

  return (
    <section id="contact" className="py-24 relative bg-gray-50 dark:bg-[#02040a] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-cyber-neon/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-16">
            <Terminal className="text-cyber-neon hidden md:block" size={36} />
            <AnimatedText
              text="Secure_Comm_Channel"
              settings={sectionAnim}
              tag="h2"
              className="text-3xl md:text-5xl font-bold font-mono text-center text-gray-900 dark:text-white uppercase tracking-tighter"
            />
          </div>
        </AnimatedSection>
        
        <div className="bg-white/5 dark:bg-black/50 backdrop-blur-xl border-2 border-gray-200 dark:border-cyber-matrix/30 rounded-xl p-8 md:p-12 shadow-2xl relative">
          {/* Terminal Header */}
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 dark:bg-black/80 border-b border-gray-300 dark:border-cyber-matrix/30 flex items-center px-4 rounded-t-xl gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs font-mono text-gray-600 dark:text-gray-400">root@secure-server:~# ./contact.sh</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">
            <div className="relative group">
              <label className="block text-xs font-mono text-gray-500 dark:text-cyber-matrix mb-1">TARGET: ID_NAME</label>
              <div className="flex items-center">
                <span className="absolute left-3 text-gray-400 dark:text-cyber-neon font-mono">&gt;</span>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter your name..."
                  className="w-full pl-8 p-3 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-cyber-matrix/50 rounded text-gray-900 dark:text-white font-mono focus:border-indigo-500 dark:focus:border-cyber-neon focus:ring-1 focus:ring-indigo-500 dark:focus:ring-cyber-neon outline-none transition-all"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-mono mt-2 flex items-center gap-1"><ShieldAlert size={12}/> {errors.name.message}</p>}
            </div>

            <div className="relative group">
              <label className="block text-xs font-mono text-gray-500 dark:text-cyber-matrix mb-1">TARGET: ENCRYPTED_EMAIL</label>
              <div className="flex items-center">
                <span className="absolute left-3 text-gray-400 dark:text-cyber-neon font-mono">&gt;</span>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid protocol string (email)',
                    },
                  })}
                  placeholder="Enter your email..."
                  className="w-full pl-8 p-3 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-cyber-matrix/50 rounded text-gray-900 dark:text-white font-mono focus:border-indigo-500 dark:focus:border-cyber-neon focus:ring-1 focus:ring-indigo-500 dark:focus:ring-cyber-neon outline-none transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-mono mt-2 flex items-center gap-1"><ShieldAlert size={12}/> {errors.email.message}</p>}
            </div>

            <div className="relative group">
              <label className="block text-xs font-mono text-gray-500 dark:text-cyber-matrix mb-1">DATA: TRANSMISSION_PAYLOAD</label>
              <div className="flex items-start pt-3">
                <span className="absolute left-3 text-gray-400 dark:text-cyber-neon font-mono">&gt;</span>
                <textarea
                  {...register('message', { required: 'Payload is empty' })}
                  rows="5"
                  placeholder="Type your secure message here..."
                  className="w-full pl-8 p-3 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-cyber-matrix/50 rounded text-gray-900 dark:text-white font-mono focus:border-indigo-500 dark:focus:border-cyber-neon focus:ring-1 focus:ring-indigo-500 dark:focus:ring-cyber-neon outline-none transition-all resize-none"
                />
              </div>
              {errors.message && <p className="text-red-500 text-xs font-mono mt-2 flex items-center gap-1"><ShieldAlert size={12}/> {errors.message.message}</p>}
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isLoading} 
              className="w-full mt-4 bg-indigo-600 dark:bg-cyber-neon text-white dark:text-black font-bold font-mono py-4 rounded hover:bg-indigo-700 dark:hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)] disabled:opacity-50"
            >
              {isLoading ? (
                <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span> ENCRYPTING_DATA...</>
              ) : (
                <><Send size={18} /> ENCRYPT_AND_TRANSMIT</>
              )}
            </motion.button>

            {isSuccess && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500 rounded text-green-500 font-mono text-sm flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> TRANSMISSION_SUCCESSFUL
              </motion.div>
            )}
            {serverError && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500 rounded text-red-500 font-mono text-sm flex items-center justify-center gap-2">
                <ShieldAlert size={16} /> CONNECTION_FAILED: {serverError}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact