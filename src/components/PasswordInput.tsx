import { useState } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = 'Senha',
  autoComplete,
}: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        required
        minLength={6}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border p-2 pr-20"
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
      >
        {visible ? 'Ocultar' : 'Mostrar'}
      </button>
    </div>
  )
}