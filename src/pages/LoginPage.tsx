import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../features/auth/useAuth'
import PasswordInput from '../components/PasswordInput'

type Mode = 'login' | 'signup' | 'forgot'

const titles: Record<Mode, string> = {
  login: 'Entrar',
  signup: 'Criar conta',
  forgot: 'Recuperar senha',
}

export default function LoginPage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (session) return <Navigate to="/dashboard" replace />

  function changeMode(next: Mode) {
    setMode(next)
    setConfirmPassword('')
    setError(null)
    setMessage(null)
  }

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
    } else if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      })
      if (error) setError(error.message)
      else
        setMessage(
          'Se este e-mail ainda não tinha conta, enviamos um link de confirmação. ' +
            'Se você já tem conta, use "Já tenho conta" para entrar.',
        )
    } else {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      })
      setMessage('Se este e-mail tiver conta, enviamos um link para redefinir a senha.')
    }

    setSubmitting(false)
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-bold">{titles[mode]}</h1>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="email"
          required
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-2"
        />

        {mode !== 'forgot' && (
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Senha (mínimo 6 caracteres)"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        )}

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
          {submitting
            ? 'Aguarde...'
            : mode === 'forgot'
              ? 'Enviar link'
              : titles[mode]}
        </button>
      </form>

      <div className="mt-4 flex flex-col items-start gap-2 text-sm text-gray-600">
        {mode === 'login' && (
          <>
            <button onClick={() => changeMode('signup')} className="underline">
              Primeiro acesso? Criar conta
            </button>
            <button onClick={() => changeMode('forgot')} className="underline">
              Esqueci minha senha
            </button>
          </>
        )}
        {mode !== 'login' && (
          <button onClick={() => changeMode('login')} className="underline">
            Já tenho conta
          </button>
        )}
      </div>
    </main>
  )
}