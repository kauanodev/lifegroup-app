import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

export function useMyMember(userId: string | undefined) {
  return useQuery({
    queryKey: ['my-member', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*, groups(name, slug)')
        .eq('user_id', userId!)
        .limit(1)
        .maybeSingle()

      if (error) throw error
      return data
    },
  })
}