import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const MediaUpload = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [publicUrl, setPublicUrl] = useState('')

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { data, error } = await supabase.storage
      .from('project-media')
      .upload(`public/${fileName}`, file)

    if (error) {
      alert(error.message)
    } else {
      const { data: publicData } = supabase.storage
        .from('project-media')
        .getPublicUrl(`public/${fileName}`)
      setPublicUrl(publicData.publicUrl)
    }
    setUploading(false)
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {publicUrl && (
        <div>
          <p className="text-sm text-gray-600">Public URL:</p>
          <input readOnly value={publicUrl} className="w-full p-2 border rounded bg-gray-50" />
        </div>
      )}
    </div>
  )
}

export default MediaUpload