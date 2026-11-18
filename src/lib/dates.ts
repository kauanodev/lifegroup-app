const pad = (n: number) => String(n).padStart(2, '0')

export function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// Segunda-feira da semana de uma data
export function getWeekStart(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return d
}

// Data do encontro padrão nessa semana (weekday: 0 = domingo)
export function defaultMeetingDate(weekday: number, weekStart = getWeekStart()) {
  const d = new Date(weekStart)
  d.setDate(d.getDate() + ((weekday + 6) % 7))
  return d
}

export function formatDateBR(isoOrDate: string | Date) {
  const d = typeof isoOrDate === 'string' ? new Date(`${isoOrDate}T00:00:00`) : isoOrDate
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
}