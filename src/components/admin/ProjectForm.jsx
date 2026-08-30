import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../../lib/supabaseClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useProjects } from '../../hooks/useProjects'
import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'

const ProjectForm = () => {
  const { data: projects, isLoading, error } = useProjects()
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
  const queryClient = useQueryClient()
  const [editingId, setEditingId] = useState(null)

  const addMutation = useMutation({
    mutationFn: async (data) => {
      const { error } = await supabase.from('projects').insert([data])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      reset()
      alert('Project added successfully')
    },
    onError: (err) => alert(`Error: ${err.message}`),
  })

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const { id, ...updateData } = data
      const { error } = await supabase.from('projects').update(updateData).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      reset()
      setEditingId(null)
      alert('Project updated successfully')
    },
    onError: (err) => alert(`Error: ${err.message}`),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      alert('Project deleted successfully')
    },
    onError: (err) => alert(`Error: ${err.message}`),
  })

  const onSubmit = (data) => {
    // Convert comma-separated strings to arrays
    const technologies = Array.isArray(data.technologies) ? data.technologies : data.technologies.split(',').map(t => t.trim())
    const media_urls = Array.isArray(data.media_urls) ? data.media_urls : data.media_urls.split(',').map(u => u.trim())
    const media_type = Array.isArray(data.media_type) ? data.media_type : data.media_type.split(',').map(t => t.trim())
    
    const projectData = { ...data, technologies, media_urls, media_type }
    
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...projectData })
    } else {
      addMutation.mutate(projectData)
    }
  }

  const handleEdit = (project) => {
    setEditingId(project.id)
    setValue('title', project.title)
    setValue('description', project.description)
    setValue('slug', project.slug)
    setValue('technologies', Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies)
    setValue('media_urls', Array.isArray(project.media_urls) ? project.media_urls.join(', ') : project.media_urls)
    setValue('media_type', Array.isArray(project.media_type) ? project.media_type.join(', ') : project.media_type)
    setValue('live_url', project.live_url || '')
    setValue('github_url', project.github_url || '')
    setValue('featured', project.featured)
    setValue('carousel_duration', project.carousel_duration || 5)
    setValue('carousel_animation', project.carousel_animation || 'fade')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    reset()
  }

  return (
    <div className="space-y-8 text-gray-900 dark:text-gray-100 font-mono">
      <div className="bg-white/5 dark:bg-black/40 p-6 rounded-xl border border-gray-200 dark:border-cyber-matrix/30">
        <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-cyber-neon tracking-widest uppercase">
          {editingId ? 'EDIT_PROJECT_RECORD' : 'NEW_PROJECT_RECORD'}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('title', { required: true })}
              placeholder="PROJECT_TITLE"
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            />
            <input
              {...register('slug', { required: true })}
              placeholder="URL_SLUG (e.g. cyber-dash)"
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            />
          </div>
          
          <textarea
            {...register('description', { required: true })}
            placeholder="PROJECT_DESCRIPTION..."
            className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm font-sans"
            rows="3"
          />
          
          <input
            {...register('technologies', { required: true })}
            placeholder="TECH_STACK (comma separated: React, Node, etc)"
            className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('media_urls', { required: true })}
              placeholder="MEDIA_URLS (comma separated)"
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            />
            <input
              {...register('media_type', { required: true })}
              placeholder="MEDIA_TYPES (image, video - comma separated)"
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('live_url')}
              placeholder="LIVE_URL (optional)"
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            />
            <input
              {...register('github_url')}
              placeholder="GITHUB_URL (optional)"
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register('carousel_duration', { valueAsNumber: true })}
              type="number"
              placeholder="CAROUSEL_DURATION (seconds)"
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            />
            <select
              {...register('carousel_animation')}
              className="w-full p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none text-sm"
            >
              <option value="fade">ANIMATION: FADE</option>
              <option value="slide">ANIMATION: SLIDE</option>
              <option value="zoom">ANIMATION: ZOOM</option>
            </select>
          </div>

          <label className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-black/50 border border-gray-300 dark:border-cyber-matrix/30 rounded cursor-pointer hover:border-cyber-neon transition-colors w-max">
            <input type="checkbox" {...register('featured')} className="w-5 h-5 accent-cyber-neon" />
            <span className="text-sm tracking-widest">SET_AS_FEATURED_PROJECT</span>
          </label>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={addMutation.isPending || updateMutation.isPending}
              className="bg-indigo-600 dark:bg-cyber-neon text-white dark:text-black font-bold px-6 py-3 rounded hover:bg-indigo-700 dark:hover:bg-cyan-400 transition-colors uppercase tracking-widest shadow-[0_0_15px_rgba(0,242,254,0.3)] disabled:opacity-50"
            >
              {addMutation.isPending || updateMutation.isPending ? 'PROCESSING...' : (editingId ? 'UPDATE_DATABASE' : 'INSERT_RECORD')}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-transparent border border-red-500 text-red-500 font-bold px-6 py-3 rounded hover:bg-red-500/10 transition-colors uppercase tracking-widest"
              >
                CANCEL_OPERATION
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white/5 dark:bg-black/40 p-6 rounded-xl border border-gray-200 dark:border-cyber-matrix/30">
        <h3 className="text-xl font-bold mb-6 text-indigo-600 dark:text-cyber-matrix tracking-widest uppercase border-b border-gray-200 dark:border-cyber-matrix/20 pb-2">
          STORED_PROJECTS_DB
        </h3>
        
        {isLoading ? (
          <div className="animate-pulse text-cyber-neon text-sm">FETCHING_RECORDS...</div>
        ) : error ? (
          <div className="text-red-500 text-sm">ERROR_FETCHING_RECORDS</div>
        ) : projects?.length === 0 ? (
          <div className="text-gray-500 text-sm">NO_RECORDS_FOUND</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                whileHover={{ scale: 1.01 }} 
                className="bg-gray-100 dark:bg-black/60 p-4 rounded-lg border border-gray-200 dark:border-cyber-matrix/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-cyber-matrix/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900 dark:text-white text-lg font-sans">{project.title}</span>
                    {project.featured && <span className="bg-cyber-neon/20 text-cyber-neon text-xs px-2 py-0.5 rounded border border-cyber-neon/30">FEATURED</span>}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-sans line-clamp-1">{project.description}</div>
                  <div className="text-xs text-indigo-500 dark:text-cyber-matrix mt-2 uppercase tracking-wider">
                    {Array.isArray(project.technologies) ? project.technologies.join(' // ') : project.technologies}
                  </div>
                </div>
                
                <div className="flex gap-3 sm:ml-auto shrink-0">
                  <button 
                    onClick={() => handleEdit(project)} 
                    className="flex items-center gap-1 text-blue-600 dark:text-cyber-neon hover:underline bg-blue-50 dark:bg-cyber-neon/10 px-3 py-1.5 rounded transition-colors text-xs tracking-widest"
                  >
                    <Edit2 size={14} /> EDIT
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)} 
                    className="flex items-center gap-1 text-red-600 hover:underline bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded transition-colors text-xs tracking-widest"
                  >
                    <Trash2 size={14} /> DELETE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectForm