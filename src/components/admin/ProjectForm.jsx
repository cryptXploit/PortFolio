import { useForm } from 'react-hook-form'
import { supabase } from '../../lib/supabaseClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const ProjectForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data) => {
      // data.media_urls and data.media_type should be arrays
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

  const onSubmit = (data) => {
    // Convert comma-separated strings to arrays
    const technologies = data.technologies.split(',').map(t => t.trim())
    const media_urls = data.media_urls.split(',').map(u => u.trim())
    const media_type = data.media_type.split(',').map(t => t.trim())
    mutation.mutate({ ...data, technologies, media_urls, media_type })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
    {...register('carousel_duration', { valueAsNumber: true })}
    type="number"
    placeholder="Carousel Duration (seconds)"
    className="w-full p-2 border rounded dark:bg-gray-700"
    />

    <select
    {...register('carousel_animation')}
    className="w-full p-2 border rounded dark:bg-gray-700"
    >
    <option value="fade">Fade</option>
    <option value="slide">Slide</option>
    <option value="zoom">Zoom</option>
    </select>
      <input
        {...register('title', { required: true })}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        {...register('description', { required: true })}
        placeholder="Description"
        className="w-full p-2 border rounded"
        rows="3"
      />
      <input
        {...register('slug', { required: true })}
        placeholder="Slug (unique identifier)"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('technologies', { required: true })}
        placeholder="Technologies (comma separated)"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('media_urls', { required: true })}
        placeholder="Media URLs (comma separated)"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('media_type', { required: true })}
        placeholder="Media types (image/video, comma separated)"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('live_url')}
        placeholder="Live URL"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('github_url')}
        placeholder="GitHub URL"
        className="w-full p-2 border rounded"
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('featured')} />
        <span>Featured</span>
      </label>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {mutation.isPending ? 'Adding...' : 'Add Project'}
      </button>
    </form>
  )
}

export default ProjectForm