import { formatDistanceToNowStrict, format } from 'date-fns'
import { es } from 'date-fns/locale'

/** "hace 3 min", "hace 2 h" — en español. */
export function tiempoRelativo(iso: string): string {
  return `hace ${formatDistanceToNowStrict(new Date(iso), { locale: es })}`
}

/** Hora corta para ejes/etiquetas: "14:30". */
export function horaCorta(iso: string): string {
  return format(new Date(iso), 'HH:mm')
}

export function fechaHora(iso: string): string {
  return format(new Date(iso), "d MMM, HH:mm", { locale: es })
}

export function pct(n: number): string {
  return `${Math.round(n)}%`
}
