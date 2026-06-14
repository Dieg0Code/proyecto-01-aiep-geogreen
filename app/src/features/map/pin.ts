import L from 'leaflet'
import { ESTADO_META, estadoLlenado, HIGH_LIMIT } from '@/lib/status'

/** Construye el icono (gota) del contenedor según estado/conexión/selección. */
export function makePin(llenado: number, offline: boolean, selected: boolean) {
  const hex = offline ? '#96A3B2' : ESTADO_META[estadoLlenado(llenado)].hex
  const alerta = !offline && llenado >= HIGH_LIMIT
  const cls = [
    'gg-pin',
    selected && 'gg-pin--selected',
    offline && 'gg-pin--offline',
    alerta && 'gg-pin--alerta',
  ]
    .filter(Boolean)
    .join(' ')

  return L.divIcon({
    className: 'gg-pin-wrap',
    html: `<div class="${cls}" style="--c:${hex};position:relative"><i></i></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  })
}
