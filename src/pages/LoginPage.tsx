import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../features/auth/useAuth'
import PasswordInput from '../components/PasswordInput'

export default function LoginPage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
const [confirmPassword, setConfirmPassword] = useState('')
  if (session) return <Navigate to="/dashboard" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    if (mode === 'signup' && password !== confirmPassword) {
  setError('As senhas não conferem.')
  return
}
    setSubmitting(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('E-mail ou senha incorretos.')
      else navigate('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      })
      if (error) setError(error.message)
      else setMessage('Conta criada! Confirme seu e-mail pelo link que enviamos e depois entre.')
    }

    setSubmitting(false)
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-bold">{mode === 'login' ? 'Entrar' : 'Criar conta'}</h1>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="email"
          required
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-2"
        />
       <PasswordInput
  value={password}
  onChange={setPassword}
  placeholder="Senha (mínimo 6 caracteres)"
  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
/>

{mode === 'signup' && (
  <PasswordInput
    value={confirmPassword}
    onChange={setConfirmPassword}
    placeholder="Confirme a senha"
    autoComplete="new-password"
  />
)}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-700">{message}</p>}
        <button
          disabled={submitting}
          className="w-full rounded-lg bg-gray-900 p-2 text-white disabled:opacity-50"
        >
          {submitting ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <button
       onClick={() => {
  setMode(mode === 'login' ? 'signup' : 'login')
  setConfirmPassword('')
  setError(null)
  setMessage(null)
}}
      >
        {mode === 'login' ? 'Primeiro acesso? Criar conta' : 'Já tenho conta'}
      </button>
    </main>
  )
}