import { useState, type FormEvent } from 'react'
import type { Database } from '../../types/database.types'
import { useUpdateMember } from './useMemberMutations'
import { normalizePhone } from '../../lib/members'

type Member = Database['public']['Tables']['members']['Row']

type Props = { member: Member; groupId: string; onDone: () => void }

export default function MemberEditForm({ member, groupId, onDone }: Props) {
  const update = useUpdateMember(groupId)
  const [name, setName] = useState(member.name)
  const [nickname, setNickname] = useState(member.nickname ?? '')
  const [email, setEmail] = useState(member.email ?? '')
  const [phone, setPhone] = useState(member.phone ?? '')
  const [birthDate, setBirthDate] = useState(member.birth_date ?? '')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    update.mutate(
      {
        id: member.id,
        name: name.trim(),
        nickname: nickname.trim() || null,
        // depois que a conta está vinculada, o e-mail não muda aqui
        ...(member.user_id ? {} : { email: email.trim().toLowerCase() || null }),
        phone: normalizePhone(phone),
        birth_date: birthDate || null,
      },
      {
        onSuccess: onDone,
        onError: (err) => {
          const code = (err as { code?: string }).code
          setError(code === '23505' ? 'Já existe um membro com esse e-mail.' : 'Erro ao salvar.')
        },
      },
    )
  }

  const field = 'w-full rounded-lg border p-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input required value={name} onChange={(e) => setName(e.target.value)}
        placeholder="Nome completo" className={field} />
      <input value={nickname} onChange={(e) => setNickname(e.target.value)}
        placeholder="Apelido" className={field} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        disabled={!!member.user_id} placeholder="E-mail"
        className={`${field} disabled:bg-gray-100`} />
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
        placeholder="WhatsApp com DDD" className={field} />
      <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
        className={field} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button disabled={update.isPending}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50">
          {update.isPending ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={onDone} className="text-sm underline">
          Cancelar
        </button>
      </div>
    </form>
  )
}