import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'
import { useMyMember } from '../features/auth/useMyMember'
import MemberForm from '../features/members/MemberForm'
import MemberList from '../features/members/MemberList'

export default function MembersPage() {
  const { session } = useAuth()
  const { data: me } = useMyMember(session?.user.id)

  if (!me) return <p className="p-6">Carregando...</p>

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Link to="/dashboard" className="text-sm text-blue-600 underline">← Painel</Link>
      <h1 className="text-2xl font-bold">Membros</h1>
      <MemberForm groupId={me.group_id} />
      <MemberList groupId={me.group_id} />
    </main>
  )
}