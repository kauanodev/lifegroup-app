import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

export function useMembers(groupId: string | undefined) {
  return useQuery({
    queryKey: ['members', groupId],
    enabled: !!groupId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('group_id', groupId!)
        .order('name')

      if (error) throw error
      return data
    },
  })
}