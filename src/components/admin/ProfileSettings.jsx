import { useState, useRef, useEffect } from 'react'
import { useProfile, useUpdateProfile } from '../../hooks/useProfile'
import { supabase } from '../../lib/supabaseClient'
import { Plus, X } from 'lucide-react'

const animationTypes = [
  'fade', 'slide', 'bounce', 'scale', 'rotate', 'flip', 'zoom', 'slideUp', 'slideDown',
  'slideLeft', 'slideRight', 'pulse', 'swing', 'wobble', 'flash', 'shake'
]

const ProfileSettings = () => {
  const { data: profile, isLoading } = useProfile()
  const updateProfile = useUpdateProfile()
  const [formData, setFormData] = useState({})
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef()
  const coverInputRef = useRef()

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        profilePictures: profile.profilePictures || [],
        socialLinks: profile.socialLinks || [],
        profileAnimation: profile.profileAnimation || { type: 'fade', duration: 3, delay: 0 },
        profileZoom: profile.profileZoom || 1,
        coverPictures: profile.coverPictures || [],
        coverAnimation: profile.coverAnimation || { type: 'fade', duration: 3, delay: 0 },
        coverZoom: profile.coverZoom || 1,
        textAnimations: profile.textAnimations || {
          name: { animation: 'fade', duration: 0.6, zoom: 1 },
          role: { animation: 'slide', duration: 0.6, zoom: 1, rotationDuration: 3, texts: ['Full‑Stack Developer', 'Creative Technologist'] },
          bio: { animation: 'fade', duration: 0.6, zoom: 1 },
          sectionHeading: { animation: 'slide', duration: 0.6, zoom: 1 }
        }
      })
    }
  }, [profile])

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (name === 'profileZoom' || name === 'coverZoom') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }))
    } else if (name.startsWith('profileAnimation.')) {
      const key = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        profileAnimation: { ...prev.profileAnimation, [key]: key === 'duration' ? parseFloat(value) : value }
      }))
    } else if (name.startsWith('coverAnimation.')) {
      const key = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        coverAnimation: { ...prev.coverAnimation, [key]: key === 'duration' ? parseFloat(value) : value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleTextAnimChange = (e) => {
    const { name, value } = e.target
    const parts = name.split('.')
    if (parts.length === 3) {
      const [section, key, subKey] = parts
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: {
            ...prev[section]?.[key],
            [subKey]: value
          }
        }
      }))
    }
  }

  const handleFileUpload = async (file, field, index = null) => {
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error } = await supabase.storage
      .from('project-media')
      .upload(`profile/${fileName}`, file)
    if (error) {
      alert(error.message)
    } else {
      const { data: publicData } = supabase.storage
        .from('project-media')
        .getPublicUrl(`profile/${fileName}`)
      const url = publicData.publicUrl

      if (field === 'coverPicture') {
        setFormData(prev => ({ ...prev, coverPicture: url }))
      } else if (field === 'profilePictures') {
        if (index !== null) {
          const newPics = [...formData.profilePictures]
          newPics[index] = { url, id: Date.now().toString() }
          setFormData(prev => ({ ...prev, profilePictures: newPics }))
        } else {
          setFormData(prev => ({
            ...prev,
            profilePictures: [...prev.profilePictures, { url, id: Date.now().toString() }]
          }))
        }
      } else if (field === 'coverPictures') {
        if (index !== null) {
          const newPics = [...formData.coverPictures]
          newPics[index] = { url, id: Date.now().toString() }
          setFormData(prev => ({ ...prev, coverPictures: newPics }))
        } else {
          setFormData(prev => ({
            ...prev,
            coverPictures: [...(prev.coverPictures || []), { url, id: Date.now().toString() }]
          }))
        }
      }
    }
    setUploading(false)
  }

  const addProfilePicture = () => {
    setFormData(prev => ({
      ...prev,
      profilePictures: [...prev.profilePictures, { url: '', id: Date.now().toString() }]
    }))
  }

  const removeProfilePicture = (index) => {
    setFormData(prev => ({
      ...prev,
      profilePictures: prev.profilePictures.filter((_, i) => i !== index)
    }))
  }

  const addCoverPicture = () => {
    setFormData(prev => ({
      ...prev,
      coverPictures: [...(prev.coverPictures || []), { url: '', id: Date.now().toString() }]
    }))
  }

  const removeCoverPicture = (index) => {
    setFormData(prev => ({
      ...prev,
      coverPictures: prev.coverPictures.filter((_, i) => i !== index)
    }))
  }

  const updateSocialLink = (index, field, value) => {
    const newLinks = [...formData.socialLinks]
    newLinks[index][field] = value
    setFormData(prev => ({ ...prev, socialLinks: newLinks }))
  }

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '', icon: '' }]
    }))
  }

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile.mutate(formData)
  }

  if (isLoading) return <div>Loading profile settings...</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Pictures Section */}
      <div>
        <label className="block text-sm font-medium mb-2">Profile Pictures</label>
        <div className="space-y-3">
          {formData.profilePictures?.map((pic, idx) => (
            <div key={pic.id} className="flex items-center gap-4 p-3 border rounded">
              {pic.url && <img src={pic.url} alt={`Profile ${idx+1}`} className="w-16 h-16 rounded-full object-cover" />}
              <button
                type="button"
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.onchange = (e) => handleFileUpload(e.target.files[0], 'profilePictures', idx)
                  input.click()
                }}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm"
              >
                {pic.url ? 'Change' : 'Upload'}
              </button>
              {formData.profilePictures.length > 1 && (
                <button type="button" onClick={() => removeProfilePicture(idx)} className="text-red-500">
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addProfilePicture} className="text-indigo-600 text-sm flex items-center gap-1">
            <Plus size={16} /> Add another picture
          </button>
        </div>
      </div>

      {/* Profile Animation Settings */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Profile Animation Type</label>
          <select
            name="profileAnimation.type"
            value={formData.profileAnimation?.type || 'fade'}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          >
            {animationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Duration (seconds)</label>
          <input
            type="number"
            name="profileAnimation.duration"
            value={formData.profileAnimation?.duration || 3}
            onChange={handleChange}
            step="0.5"
            min="0.5"
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Zoom</label>
          <input
            type="number"
            name="profileZoom"
            value={formData.profileZoom || 1}
            onChange={handleChange}
            step="0.1"
            min="0.5"
            max="2"
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Cover Pictures Section */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Cover Pictures</label>
        <div className="space-y-3">
          {formData.coverPictures?.map((pic, idx) => (
            <div key={pic.id} className="flex items-center gap-4 p-3 border rounded">
              {pic.url && <img src={pic.url} alt={`Cover ${idx+1}`} className="w-24 h-16 object-cover rounded" />}
              <button
                type="button"
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.onchange = (e) => handleFileUpload(e.target.files[0], 'coverPictures', idx)
                  input.click()
                }}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm"
              >
                {pic.url ? 'Change' : 'Upload'}
              </button>
              {formData.coverPictures.length > 1 && (
                <button type="button" onClick={() => removeCoverPicture(idx)} className="text-red-500">
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCoverPicture} className="text-indigo-600 text-sm flex items-center gap-1">
            <Plus size={16} /> Add cover picture
          </button>
        </div>
      </div>

      {/* Cover Animation Settings */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cover Animation Type</label>
          <select
            name="coverAnimation.type"
            value={formData.coverAnimation?.type || 'fade'}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          >
            {animationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cover Duration (seconds)</label>
          <input
            type="number"
            name="coverAnimation.duration"
            value={formData.coverAnimation?.duration || 3}
            onChange={handleChange}
            step="0.5"
            min="0.5"
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cover Zoom</label>
          <input
            type="number"
            name="coverZoom"
            value={formData.coverZoom || 1}
            onChange={handleChange}
            step="0.1"
            min="0.5"
            max="2"
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
        </div>
      </div>

      {/* === TITLE ANIMATIONS === */}
      <div className="mt-8 pt-4 border-t">
        <h3 className="text-lg font-semibold mb-4">Title Animations</h3>

        {/* Name Animation */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name Animation</label>
            <select
              name="textAnimations.name.animation"
              value={formData.textAnimations?.name?.animation || 'fade'}
              onChange={handleTextAnimChange}
              className="w-full p-2 border rounded dark:bg-gray-800"
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="bounce">Bounce</option>
              <option value="scale">Scale</option>
              <option value="zoom">Zoom</option>
              <option value="written">Written</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name Duration (s)</label>
            <input
              type="number"
              name="textAnimations.name.duration"
              value={formData.textAnimations?.name?.duration || 0.6}
              onChange={handleTextAnimChange}
              step="0.1"
              min="0.2"
              className="w-full p-2 border rounded dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name Zoom</label>
            <input
              type="number"
              name="textAnimations.name.zoom"
              value={formData.textAnimations?.name?.zoom || 1}
              onChange={handleTextAnimChange}
              step="0.1"
              min="0.5"
              max="2"
              className="w-full p-2 border rounded dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Role Animation (Rotating) */}
        <div className="border rounded p-4 mb-6">
          <h4 className="font-medium mb-3">Role / Subtitle (Rotating)</h4>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Animation Type</label>
              <select
                name="textAnimations.role.animation"
                value={formData.textAnimations?.role?.animation || 'slide'}
                onChange={handleTextAnimChange}
                className="w-full p-2 border rounded dark:bg-gray-800"
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="bounce">Bounce</option>
                <option value="scale">Scale</option>
                <option value="zoom">Zoom</option>
                <option value="written">Written</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration (s)</label>
              <input
                type="number"
                name="textAnimations.role.duration"
                value={formData.textAnimations?.role?.duration || 0.6}
                onChange={handleTextAnimChange}
                step="0.1"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zoom</label>
              <input
                type="number"
                name="textAnimations.role.zoom"
                value={formData.textAnimations?.role?.zoom || 1}
                onChange={handleTextAnimChange}
                step="0.1"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rotation Interval (s)</label>
              <input
                type="number"
                name="textAnimations.role.rotationDuration"
                value={formData.textAnimations?.role?.rotationDuration || 3}
                onChange={handleTextAnimChange}
                step="0.5"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <label className="block text-sm font-medium mb-1">Role Texts (one per line)</label>
          <textarea
            name="textAnimations.role.texts"
            rows="3"
            value={formData.textAnimations?.role?.texts?.join('\n') || ''}
            onChange={(e) => {
              const lines = e.target.value.split('\n')
              setFormData(prev => ({
                ...prev,
                textAnimations: {
                  ...prev.textAnimations,
                  role: { ...prev.textAnimations?.role, texts: lines }
                }
              }))
            }}
            className="w-full p-2 border rounded dark:bg-gray-800 font-mono text-sm"
            placeholder="Full‑Stack Developer&#10;Creative Technologist&#10;UI/UX Designer"
          />
        </div>

        {/* Bio Animation */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Bio Animation</label>
            <select
              name="textAnimations.bio.animation"
              value={formData.textAnimations?.bio?.animation || 'fade'}
              onChange={handleTextAnimChange}
              className="w-full p-2 border rounded dark:bg-gray-800"
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="bounce">Bounce</option>
              <option value="scale">Scale</option>
              <option value="zoom">Zoom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio Duration (s)</label>
            <input
              type="number"
              name="textAnimations.bio.duration"
              value={formData.textAnimations?.bio?.duration || 0.6}
              onChange={handleTextAnimChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio Zoom</label>
            <input
              type="number"
              name="textAnimations.bio.zoom"
              value={formData.textAnimations?.bio?.zoom || 1}
              onChange={handleTextAnimChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Section Headings Animation */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Section Heading Animation</label>
            <select
              name="textAnimations.sectionHeading.animation"
              value={formData.textAnimations?.sectionHeading?.animation || 'slide'}
              onChange={handleTextAnimChange}
              className="w-full p-2 border rounded dark:bg-gray-800"
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="bounce">Bounce</option>
              <option value="scale">Scale</option>
              <option value="zoom">Zoom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Section Duration (s)</label>
            <input
              type="number"
              name="textAnimations.sectionHeading.duration"
              value={formData.textAnimations?.sectionHeading?.duration || 0.6}
              onChange={handleTextAnimChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Section Zoom</label>
            <input
              type="number"
              name="textAnimations.sectionHeading.zoom"
              value={formData.textAnimations?.sectionHeading?.zoom || 1}
              onChange={handleTextAnimChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <label className="block text-sm font-medium mb-2">Social Links</label>
        <div className="space-y-3">
          {formData.socialLinks?.map((link, idx) => (
            <div key={idx} className="flex flex-wrap gap-2 p-3 border rounded">
              <input
                type="text"
                placeholder="Platform (e.g., GitHub)"
                value={link.platform}
                onChange={(e) => updateSocialLink(idx, 'platform', e.target.value)}
                className="flex-1 p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
                className="flex-2 p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="text"
                placeholder="Icon name (e.g., FaGithub)"
                value={link.icon}
                onChange={(e) => updateSocialLink(idx, 'icon', e.target.value)}
                className="flex-1 p-2 border rounded dark:bg-gray-800"
              />
              <button type="button" onClick={() => removeSocialLink(idx)} className="text-red-500">
                <X size={18} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addSocialLink} className="text-indigo-600 text-sm flex items-center gap-1">
            <Plus size={16} /> Add social link
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-800" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-800" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea name="bio" rows="3" value={formData.bio || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-800" />
      </div>

      <button type="submit" disabled={updateProfile.isPending || uploading} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50">
        {updateProfile.isPending ? 'Saving...' : 'Save Profile'}
      </button>
      {updateProfile.isSuccess && <p className="text-green-600">Profile updated!</p>}
      {updateProfile.isError && <p className="text-red-500">Error updating profile</p>}
    </form>
  )
}

export default ProfileSettings