import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'
import { useMyMember } from '../features/auth/useMyMember'
import { useDirectory } from '../features/members/useDirectory'

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

export default function BirthdaysPage() {
  const { session } = useAuth()
  const { data: me, isLoading } = useMyMember(session?.user.id)
  const { data: people } = useDirectory(me?.group_id)

  if (isLoading) return <p className="p-6">Carregando...</p>
  if (!me) return <p className="p-6">Seu e-mail ainda não foi cadastrado em nenhum life.</p>
  if (!people) return <p className="p-6">Carregando...</p>

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const today = now.getDate()

  const withBirthday = people.filter((p) => p.birth_day && p.birth_month)

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = ((currentMonth - 1 + i) % 12) + 1
    return {
      month,
      people: withBirthday
        .filter((p) => p.birth_month === month)
        .sort((a, b) => a.birth_day! - b.birth_day!),
    }
  }).filter((m) => m.people.length > 0)

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Link to="/dashboard" className="text-sm text-blue-600 underline">← Painel</Link>
      <h1 className="text-2xl font-bold">Aniversariantes</h1>

      {months.length === 0 && (
        <p className="text-gray-500">Nenhuma data de nascimento cadastrada ainda.</p>
      )}

      {months.map((m) => (
        <section key={m.month}>
          <h2 className="text-lg font-semibold">
            {MONTHS[m.month - 1]}
            {m.month === currentMonth && (
              <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs">este mês</span>
            )}
          </h2>
          <ul className="mt-2 divide-y rounded-xl border">
            {m.people.map((p) => {
              const isToday = m.month === currentMonth && p.birth_day === today
              return (
                <li key={p.id} className={`flex justify-between p-3 ${isToday ? 'bg-amber-50' : ''}`}>
                  <span>{p.display_name}{isToday && ' 🎂'}</span>
                  <span className="text-gray-600">
                    {String(p.birth_day).padStart(2, '0')}/{String(p.birth_month).padStart(2, '0')}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </main>
  )
}