import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'
import { useMyMember } from '../features/auth/useMyMember'
import { useWeekMeeting } from '../features/meetings/useWeekMeeting'
import { useDirectory } from '../features/members/useDirectory'
import {
  useActivities,
  usePreviousAssignments,
  useSaveAssignments,
  useWeekAssignments,
} from '../features/draw/useDraw'
import { drawActivities, type Assignment } from '../features/draw/drawActivities'
import { buildActivitiesMessage } from '../features/draw/buildMessage'
import { whatsappShareUrl } from '../lib/whatsapp'
import { formatDateBR } from '../lib/dates'

export default function DrawPage() {
  const { session } = useAuth()
  const { data: me } = useMyMember(session?.user.id)
  const groupId = me?.group_id

  const { data: meeting } = useWeekMeeting(groupId)
  const { data: activities } = useActivities(groupId)
  const { data: people } = useDirectory(groupId)
  const { data: previous } = usePreviousAssignments(groupId, meeting?.week_start)
  const { data: current } = useWeekAssignments(meeting?.id)
  const save = useSaveAssignments()

  const [proposal, setProposal] = useState<Assignment[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  if (!me || !meeting || !activities || !people || !previous) {
    return <p className="p-6">Carregando...</p>
  }

  const nameById = new Map(people.map((p) => [p.id, p.display_name]))
  const saved: Assignment[] = (current ?? []).map((c) => ({
    activityId: c.activity_id,
    memberId: c.member_id,
  }))
  const shown = proposal ?? saved

  const lines = activities.map((a) => ({
    activity: a.name,
    person: nameById.get(shown.find((s) => s.activityId === a.id)?.memberId ?? '') ?? '—',
  }))

  const message = buildActivitiesMessage({
    meetingDate: meeting.meeting_date,
    meetingTime: meeting.meeting_time,
    lines,
  })

  function handleDraw() {
    setError(null)
    try {
      const result = drawActivities({
        memberIds: people!.map((p) => p.id),
        activityIds: activities!.map((a) => a.id),
        previous: Object.fromEntries(previous!.map((p) => [p.activity_id, p.member_id])),
      })
      setProposal(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro no sorteio.')
    }
  }

  function handleSave() {
    if (!proposal) return
    save.mutate(
      { meetingId: meeting!.id, assignments: proposal },
      { onSuccess: () => setProposal(null) },
    )
  }

  async function copyMessage() {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasSaved = saved.length > 0 && !proposal

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Link to="/dashboard" className="text-sm text-blue-600 underline">← Painel</Link>
      <div>
        <h1 className="text-2xl font-bold">Sorteio de atividades</h1>
        <p className="text-gray-600 capitalize">{formatDateBR(meeting.meeting_date)}</p>
      </div>

      {activities.length === 0 ? (
        <p className="text-amber-800">Nenhuma atividade cadastrada para este life.</p>
      ) : (
        <>
          <ul className="divide-y rounded-xl border">
            {lines.map((l) => (
              <li key={l.activity} className="flex justify-between p-3">
                <span className="font-medium">{l.activity}</span>
                <span>{l.person}</span>
              </li>
            ))}
          </ul>

          {proposal && (
            <p className="text-sm text-amber-800">
              Este resultado ainda não foi salvo. Confirme ou sorteie de novo.
            </p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {save.isError && <p className="text-sm text-red-600">Erro ao salvar o sorteio.</p>}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleDraw}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white">
              {shown.length ? 'Sortear de novo' : 'Sortear'}
            </button>
            {proposal && (
              <button onClick={handleSave} disabled={save.isPending}
                className="rounded-lg bg-green-700 px-4 py-2 text-sm text-white disabled:opacity-50">
                {save.isPending ? 'Salvando...' : 'Confirmar e salvar'}
              </button>
            )}
          </div>

          {hasSaved && (
            <div className="space-y-3 rounded-xl border p-4">
              <h2 className="font-semibold">Avisar o grupo</h2>
              <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm">{message}</pre>
              <div className="flex flex-wrap gap-3">
                <a href={whatsappShareUrl(message)} target="_blank" rel="noreferrer"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white">
                  Abrir no WhatsApp
                </a>
                <button onClick={copyMessage} className="text-sm underline">
                  {copied ? 'Copiado!' : 'Copiar mensagem'}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                O WhatsApp abre com a mensagem pronta. Escolha o grupo do life e envie.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  )
}