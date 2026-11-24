export type Assignment = { activityId: string; memberId: string }

export type DrawInput = {
  memberIds: string[]
  activityIds: string[]
  /** atividade -> membro que a fez na semana anterior */
  previous: Record<string, string>
  random?: () => number
}

export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function drawActivities({
  memberIds,
  activityIds,
  previous,
  random = Math.random,
}: DrawInput): Assignment[] {
  if (!memberIds.length || !activityIds.length) return []

  const busyLastWeek = new Set(Object.values(previous))

  // embaralha e põe no começo quem não teve atividade na semana passada
  const members = shuffle(memberIds, random).sort(
    (a, b) => Number(busyLastWeek.has(a)) - Number(busyLastWeek.has(b)),
  )
  const activities = shuffle(activityIds, random)

  const maxPerMember = Math.ceil(activities.length / members.length)
  const load = new Map<string, number>(members.map((id) => [id, 0]))
  const result: Assignment[] = []

  function solve(index: number): boolean {
    if (index === activities.length) return true
    const activityId = activities[index]

    for (const memberId of members) {
      if ((load.get(memberId) ?? 0) >= maxPerMember) continue
      if (previous[activityId] === memberId) continue

      load.set(memberId, (load.get(memberId) ?? 0) + 1)
      result.push({ activityId, memberId })

      if (solve(index + 1)) return true

      result.pop()
      load.set(memberId, (load.get(memberId) ?? 1) - 1)
    }
    return false
  }

  if (!solve(0)) {
    throw new Error('Não foi possível sortear respeitando as regras. Cadastre mais membros.')
  }
  return result
}