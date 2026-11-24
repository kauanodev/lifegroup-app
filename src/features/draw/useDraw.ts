import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { addDaysISO } from '../../lib/dates'
import type { Assignment } from './drawActivities'

export function useActivities(groupId: string | undefined) {
  return useQuery({
    queryKey: ['activities', groupId],
    enabled: !!groupId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('group_id', groupId!)
        .eq('active', true)
        .order('name')
      if (error) throw error
      return data
    },
  })
}

export function useWeekAssignments(meetingId: string | undefined) {
  return useQuery({
    queryKey: ['assignments', meetingId],
    enabled: !!meetingId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assignments')
        .select('activity_id, member_id')
        .eq('meeting_id', meetingId!)
      if (error) throw error
      return data
    },
  })
}

export function usePreviousAssignments(groupId: string | undefined, weekStart: string | undefined) {
  return useQuery({
    queryKey: ['assignments-previous', groupId, weekStart],
    enabled: !!groupId && !!weekStart,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assignments')
        .select('activity_id, member_id, meetings!inner(week_start, group_id)')
        .eq('meetings.group_id', groupId!)
        .eq('meetings.week_start', addDaysISO(weekStart!, -7))
      if (error) throw error
      return data
    },
  })
}

export function useSaveAssignments() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ meetingId, assignments }: { meetingId: string; assignments: Assignment[] }) => {
      const { error: deleteError } = await supabase
        .from('assignments')
        .delete()
        .eq('meeting_id', meetingId)
      if (deleteError) throw deleteError

      const { error } = await supabase.from('assignments').insert(
        assignments.map((a) => ({
          meeting_id: meetingId,
          activity_id: a.activityId,
          member_id: a.memberId,
        })),
      )
      if (error) throw error
    },
    onSuccess: (_data, vars) =>
      qc.invalidateQueries({ queryKey: ['assignments', vars.meetingId] }),
  })
}