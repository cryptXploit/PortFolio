import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProfileSettings from '../components/admin/ProfileSettings'
import SkillManagement from '../components/admin/SkillManagement'
import TestimonialManagement from '../components/admin/TestimonialManagement'
import ProjectForm from '../components/admin/ProjectForm'
import MediaUpload from '../components/admin/MediaUpload'
import AboutSettings from '../components/admin/AboutSettings'
import ContactManagement from '../components/admin/ContactManagement'
import { Terminal, ShieldAlert, LogOut, CheckCircle2, Lock, KeyRound } from 'lucide-react'
import { motion } from 'framer-motion'

const Admin = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else setSession(data.session)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-[#02040a] relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full max-w-md p-8 bg-white/5 dark:bg-black/80 backdrop-blur-xl border-2 border-gray-200 dark:border-red-500/50 rounded-xl shadow-[0_0_30px_rgba(255,0,0,0.15)]">
          <div className="flex flex-col items-center mb-8">
            <Lock size={48} className="text-red-500 mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white tracking-widest text-center">RESTRICTED_ACCESS</h2>
            <p className="text-xs text-red-500 font-mono mt-2">AUTHORIZATION REQUIRED</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400 dark:text-red-500 font-mono">&gt;</span>
              <input type="email" placeholder="ADMIN_IDENTIFIER" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-8 p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-red-500/30 rounded font-mono text-sm text-gray-900 dark:text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none" required />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400 dark:text-red-500 font-mono"><KeyRound size={14} /></span>
              <input type="password" placeholder="SECURITY_KEY" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-8 p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-red-500/30 rounded font-mono text-sm text-gray-900 dark:text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold font-mono py-3 rounded transition-colors disabled:opacity-50 tracking-widest border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              {loading ? 'AUTHENTICATING...' : 'INITIATE_LOGIN'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'PROFILE_CORE' },
    { id: 'projects', label: 'PROJECT_DB' },
    { id: 'skills', label: 'SKILL_NODES' },
    { id: 'testimonials', label: 'CLIENT_LOGS' },
    { id: 'messages', label: 'INBOX_LOGS' },
    { id: 'media', label: 'MEDIA_ASSETS' },
    { id: 'about', label: 'DOSSIER_DATA' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#02040a] relative pt-24 pb-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/5 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-cyber-matrix/30 p-4 md:p-6 rounded-xl shadow-lg gap-4">
          <div className="flex items-center gap-3">
            <Terminal size={32} className="text-cyber-neon hidden md:block" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-mono text-gray-900 dark:text-white tracking-widest uppercase">SYS_ADMIN_CONSOLE</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-mono text-green-500">SECURE_CONNECTION_ESTABLISHED</span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/50 px-4 py-2 rounded font-mono text-sm transition-colors">
            <LogOut size={16} /> TERMINATE_SESSION
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 dark:border-cyber-matrix/30 bg-white/5 dark:bg-black/30 backdrop-blur-md">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`flex-1 min-w-[140px] px-4 py-4 font-mono text-xs md:text-sm tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-cyber-matrix/10 border-cyber-neon text-cyber-neon shadow-[inset_0_-2px_10px_rgba(0,242,254,0.2)]' 
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {activeTab === tab.id && <span className="mr-2">&gt;</span>}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic Content Panel */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 dark:bg-[#050914]/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-cyber-matrix/30 shadow-[0_0_20px_rgba(0,0,0,0.5)] p-4 md:p-8 min-h-[50vh]"
        >
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'projects' && <ProjectForm />}
          {activeTab === 'skills' && <SkillManagement />}
          {activeTab === 'testimonials' && <TestimonialManagement />}
          {activeTab === 'messages' && <ContactManagement />}
          {activeTab === 'about' && <AboutSettings />}
          {activeTab === 'media' && <MediaUpload />}
        </motion.div>
      </div>
    </div>
  )
}

export default Admin