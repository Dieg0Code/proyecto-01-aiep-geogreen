import 'leaflet/dist/leaflet.css'
import { AttributionControl, MapContainer, Marker, TileLayer } from 'react-leaflet'
import type { ContenedorConLectura } from '@/lib/types'
import { estaOffline } from '@/lib/status'
import { OSORNO_CENTER } from '@/lib/telemetry'
import { makePin } from './pin'

interface MapViewProps {
  contenedores: ContenedorConLectura[]
  selectedId?: string
  onSelect: (id: string) => void
  now: number
  children?: React.ReactNode
}

export function MapView({ contenedores, selectedId, onSelect, now, children }: MapViewProps) {
  return (
    <MapContainer
      center={OSORNO_CENTER}
      zoom={14}
      minZoom={11}
      zoomControl={false}
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        subdomains="abc"
        maxZoom={19}
        keepBuffer={1}
        updateWhenIdle
        className="gg-basemap"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <AttributionControl position="bottomright" prefix={false} />
      {contenedores.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lon]}
          icon={makePin(c.llenado, estaOffline(c, now), c.id === selectedId)}
          eventHandlers={{ click: () => onSelect(c.id) }}
        />
      ))}
      {children}
    </MapContainer>
  )
}
