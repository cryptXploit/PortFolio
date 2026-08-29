// src/hooks/useTestimonials.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export const useAddTestimonial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (testimonial) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })
}

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })
}

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })
}