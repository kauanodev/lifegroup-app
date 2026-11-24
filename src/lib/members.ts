export function displayName(m: { nickname: string | null; name: string }) {
  return m.nickname ?? m.name
}

// Guarda só dígitos, com DDI do Brasil: 85999999999 -> 5585999999999
export function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, '')
  if (!digits) return null
  return digits.length <= 11 ? `55${digits}` : digits
}