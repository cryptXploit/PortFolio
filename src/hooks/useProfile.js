import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_settings')
        .select('value')
        .eq('key', 'profile')
        .single()
      if (error) throw error
      return data.value
    },
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newProfile) => {
      const { error } = await supabase
        .from('profile_settings')
        .update({ value: newProfile, updated_at: new Date() })
        .eq('key', 'profile')
      if (error) throw error
      return newProfile
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

// New hook for about page content
export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_settings')
        .select('value')
        .eq('key', 'about')
        .single()
      if (error) throw error
      return data.value
    },
  })
}

export const useUpdateAbout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newAbout) => {
      const { error } = await supabase
        .from('profile_settings')
        .update({ value: newAbout, updated_at: new Date() })
        .eq('key', 'about')
      if (error) throw error
      return newAbout
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] })
    },
  })
}