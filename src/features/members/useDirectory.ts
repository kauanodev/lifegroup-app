import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

export function useDirectory(groupId: string | undefined) {
  return useQuery({
    queryKey: ['directory', groupId],
    enabled: !!groupId,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('group_directory', { gid: groupId! })
      if (error) throw error
      return data
    },
  })
}