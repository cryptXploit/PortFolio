import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
      if (error) throw error
      return data
    },
  })
}