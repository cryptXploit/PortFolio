import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Mail, User, Clock, ShieldAlert } from 'lucide-react'

const ContactManagement = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMessages = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      setError(error.message)
    } else {
      setMessages(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this message log?')) return
    
    const { error } = await supabase.from('contacts').delete().eq('id', id)
    if (error) {
      alert('Error deleting message: ' + error.message)
    } else {
      setMessages(messages.filter(msg => msg.id !== id))
    }
  }

  if (isLoading) {
    return <div className="text-cyber-neon font-mono animate-pulse">FETCHING_INBOX_LOGS...</div>
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded p-4 text-red-500 font-mono text-sm flex items-center gap-2">
        <ShieldAlert size={16} /> ERROR: {error}. Please ensure the 'contacts' table is created in Supabase.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-cyber-matrix/20 pb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-cyber-neon font-mono uppercase tracking-widest">
          SECURE_INBOX ({messages.length})
        </h3>
        <button onClick={fetchMessages} className="text-xs text-indigo-600 dark:text-cyber-matrix hover:text-indigo-800 dark:hover:text-cyber-neon font-mono uppercase">
          [REFRESH_LOGS]
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-gray-500 font-mono text-center py-10">NO_MESSAGES_FOUND</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-100 dark:bg-black/40 border border-gray-300 dark:border-cyber-matrix/30 rounded-lg p-5 relative group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-200 dark:border-cyber-matrix/20 pb-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white font-mono text-sm">
                      <User size={14} className="text-cyber-neon" /> {msg.name}
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-cyber-matrix font-mono text-sm">
                      <Mail size={14} /> <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                    <Clock size={12} /> {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="text-gray-700 dark:text-gray-300 font-sans text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="DELETE_LOG"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default ContactManagement
