const relativo = new Intl.RelativeTimeFormat('es-CL', { numeric: 'auto', style: 'long' })
const hora = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false })
const fechaHoraFmt = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

/** Distancia temporal breve en español, sin dependencias de formato externas. */
export function tiempoRelativo(iso: string): string {
  const segundos = Math.round((new Date(iso).getTime() - Date.now()) / 1000)
  if (Math.abs(segundos) < 45) return 'ahora'
  const minutos = Math.round(segundos / 60)
  if (Math.abs(minutos) < 60) return relativo.format(minutos, 'minute')
  const horas = Math.round(minutos / 60)
  if (Math.abs(horas) < 24) return relativo.format(horas, 'hour')
  return relativo.format(Math.round(horas / 24), 'day')
}

export function horaCorta(iso: string): string {
  return hora.format(new Date(iso))
}

export function fechaHora(iso: string): string {
  return fechaHoraFmt.format(new Date(iso)).replace('.', '')
}

export function pct(n: number): string {
  return `${Math.round(n)}%`
}
