import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

export function useGroup(slug: string | undefined) {
  return useQuery({
    queryKey: ['group', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*, group_sections(*), addresses(*)')
        .eq('slug', slug!)
        .maybeSingle()

      if (error) throw error
      return data
    },
  })
}