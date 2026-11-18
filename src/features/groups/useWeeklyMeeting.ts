import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { getWeekStart, toISODate } from '../../lib/dates'

export function useWeeklyMeeting(groupId: string | undefined) {
  const weekStart = toISODate(getWeekStart())

  return useQuery({
    queryKey: ['meeting', groupId, weekStart],
    enabled: !!groupId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('group_id', groupId!)
        .eq('week_start', weekStart)
        .maybeSingle()

      if (error) throw error
      return data
    },
  })
}