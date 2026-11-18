import { defaultMeetingDate, formatDateBR } from '../../lib/dates'

type Props = {
  weekday: number | null
  time: string | null
  meeting: {
    meeting_date: string
    meeting_time: string
    location: string | null
    change_reason: string | null
  } | null
  address: string | null
  mapsUrl: string | null
}

export default function MeetingCard({ weekday, time, meeting, address, mapsUrl }: Props) {
  const dateLabel = meeting
    ? formatDateBR(meeting.meeting_date)
    : weekday !== null
      ? formatDateBR(defaultMeetingDate(weekday))
      : null

  const timeLabel = (meeting?.meeting_time ?? time)?.slice(0, 5)
  const place = meeting?.location ?? address

  return (
    <section className="mt-6">
      {meeting?.change_reason && (
        <div className="mb-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900">
          <strong>Atenção, mudança nesta semana:</strong> {meeting.change_reason}
        </div>
      )}

      <div className="rounded-xl border p-4">
        <h2 className="text-xl font-semibold">Encontro da semana</h2>
        {dateLabel ? (
          <p className="mt-2 capitalize">
            {dateLabel}
            {timeLabel && ` às ${timeLabel}`}
          </p>
        ) : (
          <p className="mt-2 text-gray-500">Dia e horário ainda não definidos.</p>
        )}
        {place && <p className="mt-1 text-gray-700">{place}</p>}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
          >
            Abrir no mapa
          </a>
        )}
      </div>
    </section>
  )
}