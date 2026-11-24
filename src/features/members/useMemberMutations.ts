import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

export type NewMember = {
  name: string
  nickname: string | null
  email: string | null
  phone: string | null
  birth_date: string | null
}

export function useCreateMember(groupId: string | undefined) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (input: NewMember) => {
      const { error } = await supabase
        .from('members')
        .insert({ group_id: groupId!, ...input })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['members', groupId] }),
  })
}

export function useToggleMemberActive(groupId: string | undefined) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase.from('members').update({ active }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['members', groupId] }),
  })
  
}

export function useUpdateMember(groupId: string | undefined) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...changes }: { id: string } & Partial<NewMember>) => {
      const { error } = await supabase.from('members').update(changes).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['members', groupId] })
      qc.invalidateQueries({ queryKey: ['directory', groupId] })
    },
  })
}