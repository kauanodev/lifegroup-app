import { useState } from 'react'

type Props = { pixKey: string | null; qrUrl: string | null }

export default function PixCard({ pixKey, qrUrl }: Props) {
  const [copied, setCopied] = useState(false)

  if (!pixKey && !qrUrl) return null

  async function copy() {
    await navigator.clipboard.writeText(pixKey!)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mt-6 rounded-xl border p-4">
      <h2 className="text-xl font-semibold">Ofertas via Pix</h2>
      {qrUrl && <img src={qrUrl} alt="QR Code do Pix" className="mx-auto mt-3 w-48" />}
      {pixKey && (
        <div className="mt-3">
          <p className="break-all text-sm text-gray-700">{pixKey}</p>
          <button
            onClick={copy}
            className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
          >
            {copied ? 'Copiado!' : 'Copiar chave'}
          </button>
        </div>
      )}
    </section>
  )
}