import { useState, useRef } from 'react'
import { useTestimonials, useAddTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '../../hooks/useTestimonials'
import { supabase } from '../../lib/supabaseClient'
import { motion } from 'framer-motion'

const TestimonialManagement = () => {
  const { data: testimonials, isLoading } = useTestimonials()
  const addTestimonial = useAddTestimonial()
  const updateTestimonial = useUpdateTestimonial()
  const deleteTestimonial = useDeleteTestimonial()
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', role: '', content: '', avatar_url: '' })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarUpload = async (file) => {
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error } = await supabase.storage
      .from('project-media')
      .upload(`testimonials/${fileName}`, file)
    if (error) {
      alert(error.message)
    } else {
      const { data: publicData } = supabase.storage
        .from('project-media')
        .getPublicUrl(`testimonials/${fileName}`)
      setFormData(prev => ({ ...prev, avatar_url: publicData.publicUrl }))
    }
    setUploading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { ...formData }
    if (editingId) {
      updateTestimonial.mutate({ id: editingId, ...payload }, { onSuccess: () => { setEditingId(null); setFormData({ name: '', role: '', content: '', avatar_url: '', resolution_text: '', is_verified: false, project_reference: '', impact_metrics: '', timeline_date: '', rating: '' }); } })
    } else {
      addTestimonial.mutate(payload, { onSuccess: () => setFormData({ name: '', role: '', content: '', avatar_url: '', resolution_text: '', is_verified: false, project_reference: '', impact_metrics: '', timeline_date: '', rating: '' }) })
    }
  }

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id)
    setFormData({ 
      name: testimonial.name, 
      role: testimonial.role, 
      content: testimonial.content, 
      avatar_url: testimonial.avatar_url,
      resolution_text: testimonial.resolution_text || '',
      is_verified: testimonial.is_verified || false,
      project_reference: testimonial.project_reference || '',
      impact_metrics: testimonial.impact_metrics || '',
      timeline_date: testimonial.timeline_date || '',
      rating: testimonial.rating || ''
    })
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure?')) deleteTestimonial.mutate(id)
  }

  if (isLoading) return <div>Loading testimonials...</div>

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
        <h3 className="font-semibold">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Name" value={formData.name || ''} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700" />
          <input type="text" name="role" placeholder="Role (e.g., CEO, Company)" value={formData.role || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700" />
        </div>
        <textarea name="content" placeholder="Testimonial content" rows="3" value={formData.content || ''} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700" />
        
        <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mt-4">
          <h4 className="text-sm font-semibold mb-2 text-cyber-neon font-mono">OPTIONAL_TRUST_METRICS</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="is_verified" checked={formData.is_verified || false} onChange={(e) => setFormData(prev => ({ ...prev, is_verified: e.target.checked }))} className="w-4 h-4" />
              Verified Client Badge
            </label>
            <input type="text" name="project_reference" placeholder="Project Reference (e.g., cryptXploit App)" value={formData.project_reference || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 text-sm" />
            <input type="text" name="impact_metrics" placeholder="Impact Metrics (e.g., Critical Bug Patched)" value={formData.impact_metrics || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 text-sm" />
            <input type="date" name="timeline_date" placeholder="Resolution Date" value={formData.timeline_date || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 text-sm" />
            <select name="rating" value={formData.rating || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 text-sm">
              <option value="">No Rating</option>
              <option value="A+">Security Grade: A+</option>
              <option value="5-Star">5-Star</option>
              <option value="4-Star">4-Star</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <textarea name="resolution_text" placeholder="Resolution/Solved Log (How you solved it)" rows="2" value={formData.resolution_text || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 mt-4 text-sm font-mono text-green-600 dark:text-green-400" />
        </div>

        <div>
          <label className="block text-sm mb-1">Avatar (optional)</label>
          <div className="flex items-center gap-4">
            {formData.avatar_url && <img src={formData.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />}
            <button type="button" onClick={() => fileInputRef.current.click()} className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded">Upload Avatar</button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleAvatarUpload(e.target.files[0])} />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={addTestimonial.isPending || updateTestimonial.isPending || uploading} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{addTestimonial.isPending || updateTestimonial.isPending ? 'Saving...' : (editingId ? 'Update' : 'Add')}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', role: '', content: '', avatar_url: '', resolution_text: '', is_verified: false, project_reference: '', impact_metrics: '', timeline_date: '', rating: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      <div className="grid grid-cols-1 gap-3">
        {testimonials?.map(testimonial => (
          <motion.div key={testimonial.id} whileHover={{ scale: 1.01 }} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {testimonial.avatar_url && <img src={testimonial.avatar_url} alt={testimonial.name} className="w-8 h-8 rounded-full" />}
                <span className="font-medium">{testimonial.name}</span>
                {testimonial.role && <span className="text-sm text-gray-500">{testimonial.role}</span>}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">"{testimonial.content}"</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => handleEdit(testimonial)} className="text-blue-600 hover:underline text-sm">Edit</button>
              <button onClick={() => handleDelete(testimonial.id)} className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialManagement