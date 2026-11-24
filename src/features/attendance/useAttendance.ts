import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

export function useWeekAttendance(meetingId: string | undefined) {
  return useQuery({
    queryKey: ['attendance', meetingId],
    enabled: !!meetingId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('meeting_id', meetingId!)
      if (error) throw error
      return data
    },
  })
}

export function useSetAttendance(meetingId: string | undefined) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ memberId, present }: { memberId: string; present: boolean }) => {
      if (present) {
        const { error } = await supabase
          .from('attendance')
          .insert({ meeting_id: meetingId!, member_id: memberId })
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('attendance')
          .delete()
          .eq('meeting_id', meetingId!)
          .eq('member_id', memberId)
        if (error) throw error
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['attendance', meetingId] }),
  })
}