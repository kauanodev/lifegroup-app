import { describe, it, expect } from 'vitest'
import { drawActivities } from './drawActivities'

const members = ['a', 'b', 'c', 'd']
const activities = ['lanche', 'abertura', 'louvor']

describe('drawActivities', () => {
  it('atribui cada atividade a exatamente um membro', () => {
    const result = drawActivities({ memberIds: members, activityIds: activities, previous: {} })
    expect(result).toHaveLength(3)
    expect(new Set(result.map((r) => r.activityId)).size).toBe(3)
  })

  it('não repete a mesma atividade da semana anterior', () => {
    const previous = { lanche: 'a', abertura: 'b', louvor: 'c' }
    for (let i = 0; i < 200; i++) {
      const result = drawActivities({ memberIds: members, activityIds: activities, previous })
      for (const r of result) expect(previous[r.activityId as keyof typeof previous]).not.toBe(r.memberId)
    }
  })

  it('não dá duas atividades ao mesmo membro quando há membros suficientes', () => {
    const result = drawActivities({ memberIds: members, activityIds: activities, previous: {} })
    expect(new Set(result.map((r) => r.memberId)).size).toBe(result.length)
  })

  it('prioriza quem ficou sem atividade na semana anterior', () => {
    const previous = { lanche: 'a', abertura: 'b', louvor: 'c' }
    for (let i = 0; i < 100; i++) {
      const result = drawActivities({ memberIds: members, activityIds: activities, previous })
      expect(result.some((r) => r.memberId === 'd')).toBe(true)
    }
  })

  it('divide as atividades quando há menos membros que atividades', () => {
    const result = drawActivities({ memberIds: ['a', 'b'], activityIds: activities, previous: {} })
    expect(result).toHaveLength(3)
    const count = (id: string) => result.filter((r) => r.memberId === id).length
    expect(Math.max(count('a'), count('b'))).toBeLessThanOrEqual(2)
  })

  it('lança erro quando as regras tornam o sorteio impossível', () => {
    expect(() =>
      drawActivities({ memberIds: ['a'], activityIds: ['lanche'], previous: { lanche: 'a' } }),
    ).toThrow()
  })
})