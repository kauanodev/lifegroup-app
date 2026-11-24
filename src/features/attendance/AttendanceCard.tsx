import { useWeekMeeting } from '../meetings/useWeekMeeting'
import { useSetAttendance, useWeekAttendance } from './useAttendance'
import { formatDateBR, toISODate } from '../../lib/dates'

type Props = { groupId: string; memberId: string }

export default function AttendanceCard({ groupId, memberId }: Props) {
  const { data: meeting } = useWeekMeeting(groupId)
  const { data: rows } = useWeekAttendance(meeting?.id)
  const setAttendance = useSetAttendance(meeting?.id)

  if (!meeting) return null

  const present = rows?.some((r) => r.member_id === memberId) ?? false
  const isToday = meeting.meeting_date === toISODate(new Date())

  return (
    <section className="rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Presença</h2>

      {present ? (
        <p className="mt-2 text-green-700">Presença registrada. Bom encontro! 🙌</p>
      ) : isToday ? (
        <>
          <button
            onClick={() => setAttendance.mutate({ memberId, present: true })}
            disabled={setAttendance.isPending}
            className="mt-3 w-full rounded-lg bg-green-700 p-3 text-white disabled:opacity-50"
          >
            {setAttendance.isPending ? 'Registrando...' : 'Estou presente'}
          </button>
          {setAttendance.isError && (
            <p className="mt-2 text-sm text-red-600">Não foi possível registrar. Tente de novo.</p>
          )}
        </>
      ) : (
        <p className="mt-2 text-gray-600 capitalize">
          O registro abre no dia do encontro ({formatDateBR(meeting.meeting_date)}).
        </p>
      )}
    </section>
  )
}