export const RELATIONSHIP_START_DATE = '2026-02-22'

export const PARTNERS = ['Addin', 'Risma']

export function daysTogether() {
  const start = new Date(RELATIONSHIP_START_DATE + 'T00:00:00')
  const now = new Date()
  const diffMs = now.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
}