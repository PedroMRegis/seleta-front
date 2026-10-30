/** Data local de hoje + `days`, em YYYY-MM-DD (formato do <input type="date">). */
export function isoDayFromToday(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

/** "2026-11-03" → "03/11/2026", sem passar por fuso horário. */
export function formatIsoDay(isoDay: string): string {
  const [y, m, d] = isoDay.split('-')
  return `${d}/${m}/${y}`
}

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

/** Data/hora ISO completa → "03/11/2026". */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso))
}
