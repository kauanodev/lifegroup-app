import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../features/auth/useAuth'
import PasswordInput from '../components/PasswordInput'

export default function ResetPasswordPage() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) return <p className="p-6">Carregando...</p>

  if (!session) {
    return (
      <main className="mx-auto max-w-sm p-6">
        <p>Link inválido ou expirado. Peça um novo na tela de login.</p>
        <Link to="/login" className="mt-3 inline-block text-blue-600 underline">
          Voltar ao login
        </Link>
      </main>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('As senhas não conferem.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({ password })
    setSubmitting(false)

    if (error) setError(error.message)
    else navigate('/dashboard')
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-bold">Nova senha</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <PasswordInput value={password} onChange={setPassword}
          placeholder="Nova senha" autoComplete="new-password" />
        <PasswordInput value={confirm} onChange={setConfirm}
          placeholder="Confirme a nova senha" autoComplete="new-password" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={submitting}
          className="w-full rounded-lg bg-gray-900 p-2 text-white disabled:opacity-50">
          {submitting ? 'Salvando...' : 'Salvar nova senha'}
        </button>
      </form>
    </main>
  )
}