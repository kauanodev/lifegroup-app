import { useState } from 'react'
import { useMembers } from './useMembers'
import { useToggleMemberActive } from './useMemberMutations'
import MemberEditForm from './MemberEditForm'
import { displayName } from '../../lib/members'

export default function MemberList({ groupId }: { groupId: string }) {
  const { data: members, isLoading, error } = useMembers(groupId)
  const toggle = useToggleMemberActive(groupId)
  const [editingId, setEditingId] = useState<string | null>(null)

  if (isLoading) return <p>Carregando membros...</p>
  if (error) return <p className="text-red-600">Erro ao carregar membros.</p>
  if (!members?.length) return <p className="text-gray-500">Nenhum membro cadastrado.</p>

  return (
    <ul className="divide-y rounded-xl border">
      {members.map((m) => (
        <li key={m.id} className={`p-3 ${m.active ? '' : 'opacity-50'}`}>
          {editingId === m.id ? (
            <MemberEditForm member={m} groupId={groupId} onDone={() => setEditingId(null)} />
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">
                  {displayName(m)}
                  {m.role === 'leader' && (
                    <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-xs">líder</span>
                  )}
                </p>
                <p className="truncate text-sm text-gray-600">
                  {m.nickname ? `${m.name} · ` : ''}
                  {m.email ?? 'sem e-mail'}
                  {m.user_id ? ' · conta ativa' : ' · sem conta'}
                </p>
              </div>
              <div className="flex shrink-0 gap-3 text-sm">
                <button onClick={() => setEditingId(m.id)} className="underline">
                  Editar
                </button>
                {m.role !== 'leader' && (
                  <button
                    onClick={() => toggle.mutate({ id: m.id, active: !m.active })}
                    className="underline"
                  >
                    {m.active ? 'Desativar' : 'Reativar'}
                  </button>
                )}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}