import { useParams } from 'react-router-dom'
import { useGroup } from '../features/groups/useGroup'
import { useWeeklyMeeting } from '../features/groups/useWeeklyMeeting'
import MeetingCard from '../features/groups/MeetingCard'
import PixCard from '../features/groups/PixCard'

export default function GroupPage() {
  const { slug } = useParams()
  const { data: group, isLoading, error } = useGroup(slug)
  const { data: meeting } = useWeeklyMeeting(group?.id)

  if (isLoading) return <p className="p-6">Carregando...</p>
  if (error) {
  console.error(error)
  return <p className="p-6">Erro ao carregar: {error.message}</p>
}
  if (!group) return <p className="p-6">Life não encontrado.</p>

const addr = group.addresses
const addressText = addr
  ? [addr.street && `${addr.street}, ${addr.number ?? 's/n'}`, addr.neighborhood, addr.city]
      .filter(Boolean)
      .join(' - ')
  : null
const mapsUrl = addr?.maps_url
  ?? (addressText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`
    : null)
const church = group.sectors?.churches

  const sections = [...group.group_sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.position - b.position)

  return (
    <main className="mx-auto max-w-2xl p-6">
      <header
        className="rounded-xl p-6 text-white"
        style={{ backgroundColor: group.primary_color ?? '#2563eb' }}
      >
        <h1 className="text-3xl font-bold">{group.name}</h1>
        {group.tagline && <p className="mt-1 opacity-90">{group.tagline}</p>}
      </header>
      <MeetingCard
  weekday={group.meeting_weekday}
  time={group.meeting_time}
  meeting={meeting ?? null}
  address={addressText}
  mapsUrl={mapsUrl}
/>

      {sections.map((s) => (
        <section key={s.id} className="mt-6">
          <h2 className="text-xl font-semibold">{s.title}</h2>
          <p className="mt-2 whitespace-pre-line text-gray-700">{s.body}</p>
        </section>
      ))}
      <PixCard pixKey={church?.pix_key ?? null} qrUrl={church?.pix_qr_url ?? null} />
    </main>
  )
}