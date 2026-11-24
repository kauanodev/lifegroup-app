import { useState, type FormEvent } from 'react'
import { useCreateMember } from './useMemberMutations'
import { normalizePhone } from '../../lib/members'

export default function MemberForm({ groupId }: { groupId: string }) {
  const create = useCreateMember(groupId)
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    create.mutate(
      {
        name: name.trim(),
        nickname: nickname.trim() || null,
        email: email.trim().toLowerCase() || null,
        phone: normalizePhone(phone),
        birth_date: birthDate || null,
      },
      {
        onSuccess: () => {
          setName('')
          setNickname('')
          setEmail('')
          setPhone('')
          setBirthDate('')
        },
        onError: (err) => {
          // 23505 = violação de unicidade (e-mail repetido)
          const code = (err as { code?: string }).code
          setError(code === '23505' ? 'Já existe um membro com esse e-mail.' : 'Erro ao cadastrar.')
        },
      },
    )
  }

  const field = 'w-full rounded-lg border p-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Novo membro</h2>
      <input required placeholder="Nome completo" value={name}
        onChange={(e) => setName(e.target.value)} className={field} />
      <input placeholder="Apelido (aparece para os membros)" value={nickname}
        onChange={(e) => setNickname(e.target.value)} className={field} />
      <input type="email" placeholder="E-mail (usado no login)" value={email}
        onChange={(e) => setEmail(e.target.value)} className={field} />
      <input type="tel" placeholder="WhatsApp com DDD, ex.: 85 99999-9999" value={phone}
        onChange={(e) => setPhone(e.target.value)} className={field} />
      <label className="block text-sm text-gray-600">
        Data de nascimento
        <input type="date" value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)} className={`${field} mt-1`} />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button disabled={create.isPending}
        className="w-full rounded-lg bg-gray-900 p-2 text-white disabled:opacity-50">
        {create.isPending ? 'Salvando...' : 'Cadastrar'}
      </button>
    </form>
  )
}