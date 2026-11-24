import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { useMyMember } from './useMyMember'

type Props = { children: ReactNode; requireLeader?: boolean }

export default function ProtectedRoute({ children, requireLeader = false }: Props) {
  const { session, loading } = useAuth()
  const { data: member, isLoading: loadingMember } = useMyMember(session?.user.id)

  if (loading || (session && loadingMember)) return <p className="p-6">Carregando...</p>
  if (!session) return <Navigate to="/login" replace />
  if (requireLeader && member?.role !== 'leader') return <Navigate to="/dashboard" replace />

  return <>{children}</>
}