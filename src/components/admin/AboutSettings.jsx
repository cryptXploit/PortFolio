import { useState, useEffect } from 'react'
import { useAbout, useUpdateAbout } from '../../hooks/useProfile'
import { Plus, X } from 'lucide-react'

const AboutSettings = () => {
  const { data: about, isLoading } = useAbout()
  const updateAbout = useUpdateAbout()
  const [formData, setFormData] = useState({
    education: [],
    experience: [],
    certifications: [],
    additional: ''
  })

  useEffect(() => {
    if (about) setFormData(about)
  }, [about])

  const addItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], { degree: '', institution: '', year: '', description: '' }]
    }))
  }

  const updateItem = (section, index, field, value) => {
    const newItems = [...formData[section]]
    newItems[index][field] = value
    setFormData(prev => ({ ...prev, [section]: newItems }))
  }

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const handleAdditionalChange = (e) => {
    setFormData(prev => ({ ...prev, additional: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateAbout.mutate(formData)
  }

  if (isLoading) return <div>Loading about settings...</div>

  const renderSection = (title, section, fields) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button type="button" onClick={() => addItem(section)} className="text-indigo-600 text-sm flex items-center gap-1">
          <Plus size={16} /> Add
        </button>
      </div>
      {formData[section]?.map((item, idx) => (
        <div key={idx} className="border rounded p-4 mb-3 relative">
          <button type="button" onClick={() => removeItem(section, idx)} className="absolute top-2 right-2 text-red-500">
            <X size={18} />
          </button>
          {fields.map(field => (
            <div key={field.name} className="mb-2">
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  value={item[field.name] || ''}
                  onChange={(e) => updateItem(section, idx, field.name, e.target.value)}
                  rows="2"
                  className="w-full p-2 border rounded dark:bg-gray-800"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={item[field.name] || ''}
                  onChange={(e) => updateItem(section, idx, field.name, e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-800"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderSection('Education', 'education', [
        { name: 'degree', label: 'Degree', type: 'text' },
        { name: 'institution', label: 'Institution', type: 'text' },
        { name: 'year', label: 'Year', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ])}
      {renderSection('Experience', 'experience', [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'year', label: 'Year', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ])}
      {renderSection('Certifications', 'certifications', [
        { name: 'name', label: 'Certification Name', type: 'text' },
        { name: 'issuer', label: 'Issuer', type: 'text' },
        { name: 'year', label: 'Year', type: 'text' },
        { name: 'link', label: 'Link (optional)', type: 'url' },
      ])}
      <div>
        <label className="block text-sm font-medium mb-1">Additional Info</label>
        <textarea
          value={formData.additional || ''}
          onChange={handleAdditionalChange}
          rows="4"
          className="w-full p-2 border rounded dark:bg-gray-800"
          placeholder="Write any additional information about yourself..."
        />
      </div>
      <button type="submit" disabled={updateAbout.isPending} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        {updateAbout.isPending ? 'Saving...' : 'Save About'}
      </button>
      {updateAbout.isSuccess && <p className="text-green-600">About page updated!</p>}
    </form>
  )
}

export default AboutSettings