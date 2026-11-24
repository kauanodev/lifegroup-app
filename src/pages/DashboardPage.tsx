import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../features/auth/useAuth'
import { useMyMember } from '../features/auth/useMyMember'
import AttendanceCard from '../features/attendance/AttendanceCard'
import WeekActivities from '../features/draw/WeekActivities'

export default function DashboardPage() {
  const { session } = useAuth()
  const { data: member } = useMyMember(session?.user.id)

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Painel</h1>

      {member ? (
        <div className="mt-4 space-y-6">
          <p>
            Olá, <strong>{member.nickname ?? member.name}</strong>! Você é{' '}
            {member.role === 'leader' ? 'líder' : 'membro'} do life{' '}
            <strong>{member.groups?.name}</strong>.
          </p>

          <AttendanceCard groupId={member.group_id} memberId={member.id} />
          <WeekActivities groupId={member.group_id} memberId={member.id} />

          <nav className="flex flex-col gap-2 text-blue-600 underline">
            {member.groups?.slug && (
              <Link to={`/g/${member.groups.slug}`}>Ver página do life</Link>
            )}
            <Link to="/aniversariantes">Aniversariantes</Link>
            {member.role === 'leader' && (
              <>
                <Link to="/membros">Gerenciar membros</Link>
                <Link to="/sorteio">Sorteio de atividades</Link>
                <Link to="/presenca">Presença</Link>
              </>
            )}
          </nav>
        </div>
      ) : (
        <p className="mt-4 text-amber-800">
          Seu e-mail ainda não foi cadastrado em nenhum life. Peça ao seu líder para te cadastrar.
        </p>
      )}

      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
      >
        Sair
      </button>
    </main>
  )
}