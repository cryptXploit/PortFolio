import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export const useAddSkill = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (skill) => {
      const { data, error } = await supabase
        .from('skills')
        .insert([skill])
        .select()
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    },
  })
}

export const useUpdateSkill = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    },
  })
}

export const useDeleteSkill = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    },
  })
}