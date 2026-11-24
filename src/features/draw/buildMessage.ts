import { formatDateBR } from '../../lib/dates'

type Args = {
  meetingDate: string
  meetingTime: string
  lines: { activity: string; person: string }[]
}

export function buildActivitiesMessage({ meetingDate, meetingTime, lines }: Args) {
  const header = `*Atividades da semana* 🙌\nEncontro: ${formatDateBR(meetingDate)} às ${meetingTime.slice(0, 5)}`
  const body = lines.map((l) => `• ${l.activity}: ${l.person}`).join('\n')
  return `${header}\n\n${body}\n\nQualquer imprevisto, avise o grupo! Deus abençoe a todos!`
}
