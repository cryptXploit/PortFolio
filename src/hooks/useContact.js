import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data, error } = await supabase
        .from('contacts')
        .insert([formData])
        .select()
      if (error) throw error
      return data
    },
  })
}