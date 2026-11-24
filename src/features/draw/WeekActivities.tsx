import { useWeekMeeting } from '../meetings/useWeekMeeting'
import { useDirectory } from '../members/useDirectory'
import { useActivities, useWeekAssignments } from './useDraw'

type Props = { groupId: string; memberId: string }

export default function WeekActivities({ groupId, memberId }: Props) {
  const { data: meeting } = useWeekMeeting(groupId)
  const { data: assignments } = useWeekAssignments(meeting?.id)
  const { data: activities } = useActivities(groupId)
  const { data: people } = useDirectory(groupId)

  if (!assignments || !activities || !people) return null

  const nameById = new Map(people.map((p) => [p.id, p.display_name]))
  const mine = assignments.filter((a) => a.member_id === memberId)
  const myNames = activities.filter((a) => mine.some((m) => m.activity_id === a.id)).map((a) => a.name)

  return (
    <section className="rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Atividades da semana</h2>

      {assignments.length === 0 ? (
        <p className="mt-2 text-gray-600">O sorteio desta semana ainda não foi feito.</p>
      ) : (
        <>
          {myNames.length > 0 && (
            <p className="mt-2 rounded-lg bg-green-50 p-2 text-green-900">
              Sua atividade: <strong>{myNames.join(', ')}</strong>
            </p>
          )}
          <ul className="mt-3 divide-y">
            {activities.map((a) => {
              const who = assignments.find((x) => x.activity_id === a.id)?.member_id
              return (
                <li key={a.id} className="flex justify-between py-2 text-sm">
                  <span>{a.name}</span>
                  <span className={who === memberId ? 'font-semibold' : ''}>
                    {who ? nameById.get(who) ?? '—' : '—'}
                  </span>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}