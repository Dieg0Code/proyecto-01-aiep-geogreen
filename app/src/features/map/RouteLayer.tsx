import { Fragment } from 'react'
import L from 'leaflet'
import { Marker, Polyline } from 'react-leaflet'
import type { LatLon } from '@/lib/geo'
import { COLORES_CAMION, PUNTO_PARTIDA } from '@/lib/ruta'
import type { RutaCamion } from '@/lib/routing'

function stopIcon(orden: number, color: string) {
  return L.divIcon({
    className: 'gg-stop-wrap',
    html: `<div class="gg-stop" style="background:${color}">${orden}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

const depotIcon = L.divIcon({
  className: 'gg-depot-wrap',
  html: `<div class="gg-depot"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

interface RouteLayerProps {
  rutas: RutaCamion[]
  aproximada: boolean
  inicio?: LatLon
  onSelect: (id: string) => void
}

export function RouteLayer({ rutas, aproximada, inicio = PUNTO_PARTIDA, onSelect }: RouteLayerProps) {
  return (
    <>
      {rutas.map((ruta, ri) => {
        const color = COLORES_CAMION[ruta.vehiculo % COLORES_CAMION.length]
        return (
          <Fragment key={ri}>
            <Polyline
              positions={ruta.geometria}
              pathOptions={{ color: '#FFFFFF', weight: 7, opacity: 0.85, lineCap: 'round', lineJoin: 'round' }}
            />
            <Polyline
              positions={ruta.geometria}
              pathOptions={{
                color,
                weight: 4,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
                ...(aproximada ? { dashArray: '2 9' } : {}),
              }}
            />
            {ruta.paradas.map((p) => (
              <Marker
                key={p.contenedor.id}
                position={[p.contenedor.lat, p.contenedor.lon]}
                icon={stopIcon(p.orden, color)}
                zIndexOffset={1000}
                eventHandlers={{ click: () => onSelect(p.contenedor.id) }}
              />
            ))}
          </Fragment>
        )
      })}
      <Marker position={inicio} icon={depotIcon} />
    </>
  )
}
