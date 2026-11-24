import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

export function useWeekMeeting(groupId: string | undefined) {
  return useQuery({
    queryKey: ['week-meeting', groupId],
    enabled: !!groupId,
    queryFn: async () => {
      const { data: meetingId, error } = await supabase.rpc('ensure_week_meeting', {
        gid: groupId!,
      })
      if (error) throw error

      const { data, error: meetingError } = await supabase
        .from('meetings')
        .select('*')
        .eq('id', meetingId)
        .single()
      if (meetingError) throw meetingError
      return data
    },
  })
}