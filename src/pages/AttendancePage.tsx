import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'
import { useMyMember } from '../features/auth/useMyMember'
import { useWeekMeeting } from '../features/meetings/useWeekMeeting'
import { useMembers } from '../features/members/useMembers'
import { useSetAttendance, useWeekAttendance } from '../features/attendance/useAttendance'
import { displayName } from '../lib/members'
import { formatDateBR } from '../lib/dates'

export default function AttendancePage() {
  const { session } = useAuth()
  const { data: me } = useMyMember(session?.user.id)
  const groupId = me?.group_id

  const { data: meeting } = useWeekMeeting(groupId)
  const { data: members } = useMembers(groupId)
  const { data: rows } = useWeekAttendance(meeting?.id)
  const setAttendance = useSetAttendance(meeting?.id)

  if (!me || !meeting || !members) return <p className="p-6">Carregando...</p>

  const active = members.filter((m) => m.active)
  const presentIds = new Set(rows?.map((r) => r.member_id))
  const total = active.filter((m) => presentIds.has(m.id)).length

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Link to="/dashboard" className="text-sm text-blue-600 underline">← Painel</Link>
      <div>
        <h1 className="text-2xl font-bold">Presença</h1>
        <p className="text-gray-600 capitalize">{formatDateBR(meeting.meeting_date)}</p>
        <p className="mt-1 text-sm">{total} de {active.length} presentes</p>
      </div>

      <ul className="divide-y rounded-xl border">
        {active.map((m) => (
          <li key={m.id}>
            <label className="flex items-center gap-3 p-3">
              <input
                type="checkbox"
                checked={presentIds.has(m.id)}
                onChange={(e) => setAttendance.mutate({ memberId: m.id, present: e.target.checked })}
              />
              {displayName(m)}
            </label>
          </li>
        ))}
      </ul>

      {setAttendance.isError && <p className="text-sm text-red-600">Erro ao atualizar a presença.</p>}
    </main>
  )
}