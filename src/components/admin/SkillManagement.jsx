import { useState } from 'react'
import { useSkills } from '../../hooks/useSkills'
import { useAddSkill, useUpdateSkill, useDeleteSkill } from '../../hooks/useSkillManagement'
import { motion } from 'framer-motion'

const SkillManagement = () => {
  const { data: skills, isLoading, error } = useSkills()
  const addSkill = useAddSkill()
  const updateSkill = useUpdateSkill()
  const deleteSkill = useDeleteSkill()
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', category: '', icon: '', level: 3 })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'level' ? parseInt(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateSkill.mutate({ id: editingId, ...formData }, { onSuccess: () => { setEditingId(null); setFormData({ name: '', category: '', icon: '', level: 3 }); } })
    } else {
      addSkill.mutate(formData, { onSuccess: () => setFormData({ name: '', category: '', icon: '', level: 3 }) })
    }
  }

  const handleEdit = (skill) => {
    setEditingId(skill.id)
    setFormData({ name: skill.name, category: skill.category, icon: skill.icon, level: skill.level })
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure?')) deleteSkill.mutate(id)
  }

  if (isLoading) return <div>Loading skills...</div>
  if (error) return <div>Error loading skills</div>

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
        <h3 className="font-semibold">{editingId ? 'Edit Skill' : 'Add New Skill'}</h3>
        <input type="text" name="name" placeholder="Skill Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700" />
        <input type="text" name="category" placeholder="Category (e.g., Frontend)" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700" />
        <input type="text" name="icon" placeholder="Icon name (e.g., FaReact)" value={formData.icon} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700" />
        <select name="level" value={formData.level} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700">
          {[1,2,3,4,5].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <div className="flex gap-2">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{addSkill.isPending ? 'Saving...' : (editingId ? 'Update' : 'Add')}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', category: '', icon: '', level: 3 }); }} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      <div className="grid grid-cols-1 gap-2">
        {skills?.map(skill => (
          <motion.div key={skill.id} whileHover={{ scale: 1.01 }} className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center">
            <div><span className="font-medium">{skill.name}</span><span className="text-sm text-gray-500 ml-2">{skill.category}</span><span className="text-sm text-indigo-500 ml-2">Level {skill.level}</span></div>
            <div className="flex gap-2"><button onClick={() => handleEdit(skill)} className="text-blue-600 hover:underline">Edit</button><button onClick={() => handleDelete(skill.id)} className="text-red-600 hover:underline">Delete</button></div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SkillManagement